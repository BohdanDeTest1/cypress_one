import LoginPage from '../../support/pageobject/page/loginPage';

describe('QAuto Registration and Login Tests', () => {
    const loginPage = new LoginPage();
    let testData;


    before(() => {
        cy.fixture('values_for_homework_2').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        loginPage.visitLoginPageWithAuth();
    });

    const openSignUpForm = () => {
        cy.get('button').contains('Sign up').click();
    };

    //Registration form validation checking 
    it('Should validate "Name" field', () => {
        openSignUpForm();
        cy.get('#signupName').focus().blur();
        cy.contains('Name required', { timeout: 10000 }).should('be.visible');
        cy.get('#signupName').type(testData.invalidUser.name).blur();
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
        cy.get('#signupName').clear().type(testData.validUser.name).blur();
        cy.contains('Name is required').should('not.exist');
    });

    it('Should validate "Last Name" field', () => {
        openSignUpForm();
        cy.get('#signupLastName').focus().blur();
        cy.contains('Last name required', { timeout: 10000 }).should('be.visible');
        cy.get('#signupLastName').type(testData.invalidUser.lastName).blur();
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
        cy.get('#signupLastName').clear().type(testData.validUser.lastName).blur();
        cy.contains('Last name is required').should('not.exist');
    });

    it('Should validate "Email" field', () => {
        openSignUpForm();
        cy.get('#signupEmail').focus().blur();
        cy.contains('Email required', { timeout: 10000 }).should('be.visible');
        cy.get('#signupEmail').type(testData.invalidUser.email).blur();
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Email is incorrect').should('be.visible');
        cy.get('#signupEmail').clear().type(testData.validUser.email).blur();
        cy.contains('Email is incorrect').should('not.exist');
    });

    it('Should validate "Password" field', () => {
        openSignUpForm();
        cy.get('#signupPassword').focus().blur();
        cy.contains('Password required', { timeout: 10000 }).should('be.visible');
        cy.get('#signupPassword').type('short').blur();
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small lette').should('be.visible');
        cy.get('#signupPassword').clear().type(testData.validUser.password).blur();
        cy.contains('Password required').should('not.exist');
    });

    it('Should validate password requirements, mismatch and required field with correct border color', () => {
        openSignUpForm();
        cy.get('#signupRepeatPassword').focus().blur();
        cy.contains('Re-enter password required').should('be.visible');
        cy.get('#signupPassword').clear().type(testData.validUser.password).blur();
        cy.get('#signupRepeatPassword').clear().type(testData.invalidUser.password).blur();
        cy.contains('Passwords do not match').should('be.visible');
        cy.get('#signupRepeatPassword').clear().blur();
        cy.contains('Re-enter password required').should('be.visible');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Should ensure "Register" button is disabled when form is invalid or incomplete', () => {
        openSignUpForm();
        cy.get('button').contains('Register').should('be.disabled');
        cy.get('#signupName').clear().blur();
        cy.get('#signupLastName').clear().blur();
        cy.get('#signupEmail').clear().type(testData.invalidUser.email).blur();
        cy.get('#signupPassword').clear().type('short').blur();
        cy.get('#signupRepeatPassword').clear().type('MismatchPass').blur();

        cy.get('button').contains('Register').should('be.disabled');

        cy.get('#signupName').clear().type(testData.validUser.name).blur();
        cy.get('#signupLastName').clear().type(testData.validUser.lastName).blur();
        cy.get('#signupEmail').clear().type(testData.validUser.email).blur();
        cy.get('#signupPassword').clear().type(testData.validUser.password).blur();
        cy.get('#signupRepeatPassword').clear().type(testData.validUser.password).blur();
        cy.get('button').contains('Register').should('not.be.disabled');
        cy.get('body > ngb-modal-window > div > div > app-signup-modal > div.modal-header > button > span').click();
    });

    it('Should display validation error for incorrect login', () => {
        cy.get('button').contains('Sign In').click();
        cy.get('#signinEmail').clear().type(testData.invalidUser.wrongEmail);
        cy.get('#signinPassword').clear().type(testData.invalidUser.wrongPassword, { sensitive: true });
        cy.get('button').contains('Login').click();
        cy.contains('Wrong email or password').should('be.visible');
        cy.contains('Wrong email or password').should('have.css', 'color', 'rgb(114, 28, 36)');
    });

    it('Correct login', () => {
        cy.get('button').contains('Sign In').click();
        cy.get('#signinEmail').clear().type(testData.validUser.email);
        cy.get('#signinPassword').clear().type(testData.validUser.password, { sensitive: true });
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/panel/garage');
    });
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }
    return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://qauto.forstudy.space/');
    cy.get('button').contains('Sign in').click();
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password, { sensitive: true });
    cy.get('button').contains('Login').click();
});
