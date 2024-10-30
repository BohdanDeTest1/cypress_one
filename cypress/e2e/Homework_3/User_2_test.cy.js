import LoginPageUser from '../../support/pageobject/page/loginPageUser';
import GaragePage from '../../support/pageobject/page/GaragePage';
import ExpensesPage from '../../support/pageobject/page/ExpensesPage';

describe('QAuto Registration and Login Tests', () => {
    const loginPageUser = new LoginPageUser();
    const garagePage = new GaragePage();
    const expensesPage = new ExpensesPage();

    beforeEach(() => {
        loginPageUser.visitLoginPageWithAuthUserOne();
    });

    it('Should add a new car to the garage', () => {
        garagePage.openAddCarModal();
        garagePage.selectCarBrand('Ford');
        garagePage.selectCarModel('Focus');
        garagePage.enterMileage('10');
        garagePage.submitAddCar();
    });

    it('Add fuel expense', () => {
        expensesPage.openAddFuelExpenseModal();
        expensesPage.enterExpenseMileage('11');
        expensesPage.enterExpenseLiters('10');
        expensesPage.enterExpenseTotalCost('10');
        expensesPage.submitAddExpense();
    });

    it('Remove the car', () => {
        garagePage.openEditCarModal();
        garagePage.removeCar();
    });
});


