declare global {
    namespace Cypress {
    interface Chainable {
        mockIngredients(): Chainable<void>;
        mockUser(): Chainable<void>;
        mockOrder(): Chainable<void>;
        mockAll(): Chainable<void>;
    }
    }
}

// Мокаем ингредиенты
Cypress.Commands.add('mockIngredients', () => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
});

// Мокаем пользователя
Cypress.Commands.add('mockUser', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
});

// Мокаем заказ
Cypress.Commands.add('mockOrder', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');
});

// Мокаем всё разом
Cypress.Commands.add('mockAll', () => {
    cy.mockIngredients();
    cy.mockUser();
    cy.mockOrder();
});

export {};
