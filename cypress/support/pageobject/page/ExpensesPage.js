class ExpensesPage {
    openAddFuelExpenseModal() {
        cy.get('button').contains('Add fuel expense').click();
    }

    enterExpenseMileage(mileage) {
        cy.get('#addExpenseMileage').clear().type(mileage);
    }

    enterExpenseLiters(liters) {
        cy.get('#addExpenseLiters').clear().type(liters);
    }

    enterExpenseTotalCost(cost) {
        cy.get('#addExpenseTotalCost').clear().type(cost);
    }

    submitAddExpense() {
        cy.get('div.modal-footer').find('button.btn.btn-primary').click();
    }
}

export default ExpensesPage;