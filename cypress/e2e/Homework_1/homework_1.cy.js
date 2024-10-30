describe('QAuto Header and Footer Button and Link Tests', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    it('Find and log each header button', () => {
        cy.get('header .btn').each(($button) => {
            const buttonText = $button.text();
            cy.log(`Header Button: ${buttonText}`);
            cy.wrap($button)
                .should('be.visible')
                .and('not.be.disabled');
        });
    });

    it('Find and log each footer button and link', () => {
        cy.get('footer .btn, footer a').each(($element) => {
            const elementText = $element.text();
            cy.log(`Footer Element: ${elementText}`);
            cy.wrap($element)
                .should('be.visible')
                .and('not.be.disabled');
        });
    });
});