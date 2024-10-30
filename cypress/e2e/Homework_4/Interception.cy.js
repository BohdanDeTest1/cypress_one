import LoginPageUser from '../../support/pageobject/page/loginPageUser2';
import GaragePage from '../../support/pageobject/page/GaragePage';

describe('QAuto Car Creation with Interception', () => {
    const loginPageUser = new LoginPageUser();
    const garagePage = new GaragePage();
    let carId;

    before(() => {
        cy.loginAndSaveToken();
        loginPageUser.visitLoginPageWithAuthUserOne();
    });

    it('Should create a car and intercept the response', () => {
        cy.intercept('POST', '/api/cars').as('createCar');

        garagePage.openAddCarModal();
        garagePage.selectCarBrand('Ford');
        garagePage.selectCarModel('Focus');
        garagePage.enterMileage('10');
        garagePage.submitAddCar();


        cy.wait('@createCar').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            carId = interception.response.body.id;
            cy.log(`Created car ID: ${carId}`);
        });
    });

    it('Should validate created car via API', () => {

        const token = Cypress.env('authToken');

        if (!token) {
            throw new Error('Token not found');
        }

        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            const createdCar = response.body.cars.find(car => car.id === carId);
            expect(createdCar).to.exist;
            expect(createdCar.brand).to.equal('Ford');
            expect(createdCar.model).to.equal('Focus');
            expect(createdCar.mileage).to.equal(10);
        });
    });

    it('Should create an expense via API', () => {
        cy.createExpense(carId, 11, 10, 10).then(expenseId => {
            cy.wrap(expenseId).as('createdExpenseId');
        });
    });

    it('Should validate created expense via UI', function () {

        cy.get('.car-item', { timeout: 10000 }).first().find('button.car_edit.btn.btn-edit').click();
        cy.contains('Mileage: 11', { timeout: 10000 }).should('be.visible');
        cy.contains('Liters: 10', { timeout: 10000 }).should('be.visible');
        cy.contains('Total cost: 10', { timeout: 10000 }).should('be.visible');
    });
});
