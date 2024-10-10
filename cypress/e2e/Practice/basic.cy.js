/// <reference types="cypress" />

describe('QAuto Header and Footer Button and Link Tests', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    it('Find and log each header button', () => {
        cy.get('header .btn').each(($button) => {
            const buttonText = $button.text(); // Отримати текст кнопки
            cy.log(`Header Button: ${buttonText}`); // Вивести текст у консоль
            cy.wrap($button)
                .should('be.visible') // Перевірити, що кнопка видима
                .and('not.be.disabled'); // Перевірити, що кнопка не заблокована
        });
    });

    it('Find and log each footer button and link', () => {
        cy.get('footer .btn, footer a').each(($element) => {
            const elementText = $element.text(); // Отримати текст кнопки або посилання
            cy.log(`Footer Element: ${elementText}`); // Вивести текст у консоль
            cy.wrap($element)
                .should('be.visible') // Перевірити, що кнопка або посилання видиме
                .and('not.be.disabled'); // Перевірити, що кнопка не заблокована
        });
    });
});