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
        cy.request({
            method: 'POST',
            url: '/api/auth/signin',
            body: {
                email: User1Values.User.email,
                password: User1Values.User.password
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            Cypress.env('authToken', response.body.token);
        });
    }

    visitLoginPageWithAuthUserTwo() {
        const authUrl = `https://${User2Values.WebPagelogin.login}:${User2Values.WebPagelogin.password}${User2Values.WebPage.PageOne}`;
        cy.visit(authUrl);
        cy.get('button').contains('Sign In').click();
        cy.get(this.loginInput).clear().type(User2Values.User.email);
        cy.get(this.passwordInput).clear().type(User2Values.User.password, { sensitive: true });
        cy.get(this.loginButton).click();

        cy.request({
            method: 'POST',
            url: '/api/auth/signin',
            body: {
                email: User2Values.User.email,
                password: User2Values.User.password
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            Cypress.env('authToken', response.body.token);
        });
    }
}