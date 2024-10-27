import User1Values from '../../../fixtures/User1Values.json';
import User2Values from '../../../fixtures/User2Values.json';


export default class LoginPageUser {
    constructor() {
        this.loginInput = '#signinEmail';
        this.passwordInput = '#signinPassword';
        this.loginButton = 'button:contains("Login")';
    }

    visitLoginPageWithAuthUserOne() {
        const authUrl = `https://${User1Values.WebPagelogin.login}:${User1Values.WebPagelogin.password}${User1Values.WebPage.PageOne}`;
        cy.visit(authUrl);
        cy.get('button').contains('Sign In').click();
        cy.get('#signinEmail').clear().type(User1Values.User.email);
        cy.get('#signinPassword').clear().type(User1Values.User.password, { sensitive: true });
        cy.get('button').contains('Login').click();
    }
    visitLoginPageWithAuthUserTwo() {
        const authUrl = `https://${User2Values.WebPagelogin.login}:${User2Values.WebPagelogin.password}${User2Values.WebPage.PageOne}`;
        cy.visit(authUrl);
        cy.get('button').contains('Sign In').click();
        cy.get('#signinEmail').clear().type(User2Values.User.email);
        cy.get('#signinPassword').clear().type(User2Values.User.password, { sensitive: true });
        cy.get('button').contains('Login').click();
    }

    login() {
        cy.get(this.loginInput).clear().type(creds.login);
        cy.get(this.passwordInput).clear().type(creds.password);
        cy.get(this.loginButton).click();
    }
}