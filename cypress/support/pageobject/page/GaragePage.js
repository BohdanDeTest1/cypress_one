
class GaragePage {
    openAddCarModal() {
        cy.get('button').contains('Add car').click();
    }

    selectCarBrand(brand) {
        cy.get('#addCarBrand').select(brand);
    }

    selectCarModel(model) {
        cy.get('#addCarModel').select(model);
    }

    enterMileage(mileage) {
        cy.get('#addCarMileage').clear().type(mileage);
    }

    submitAddCar() {
        cy.get('div.modal-footer').find('button.btn.btn-primary').click();
    }

    openEditCarModal() {
        cy.get('.car-item').first().find('button.car_edit.btn.btn-edit').click();
    }

    removeCar() {
        cy.get('.modal-content').find('button.btn.btn-outline-danger').click();
        cy.get('.modal-content').find('button.btn.btn-danger').click();
    }
}

export default GaragePage;