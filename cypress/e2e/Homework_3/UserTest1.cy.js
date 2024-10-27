describe('QAuto Tests', () => {
    const { login, password } = Cypress.env('users');

    it('Login Test', () => {
        cy.visit('/');
        cy.get('button').contains('Sign In').click();
        cy.get('#signinEmail').type(login);
        cy.get('#signinPassword').type(password, { sensitive: true });
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/panel/garage');
    });
});