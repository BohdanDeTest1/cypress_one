/// <reference types="cypress" />

import creds from '../../../fixtures/creds.json';

export default class LoginPage {
    constructor() {
        this.baseUrl = 'https://qauto.forstudy.space/';
        this.loginInput = '#signinEmail';
        this.passwordInput = '#signinPassword';
        this.loginButton = 'button:contains("Login")';
    }


    visitLoginPageWithAuth() {
        const authUrl = `https://${creds.login}:${creds.password}@qauto.forstudy.space/`;
        cy.visit(authUrl);
    }


    login() {
        cy.get(this.loginInput).clear().type(creds.login);
        cy.get(this.passwordInput).clear().type(creds.password);
        cy.get(this.loginButton).click();
    }
}