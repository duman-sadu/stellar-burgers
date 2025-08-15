/// <reference types="cypress" />

// --- Кастомные команды ---
// Добавляет булку в конструктор
Cypress.Commands.add('addBun', () => {
  cy.get('@bun').contains('Добавить').click();
});

// Добавляет основной ингредиент в конструктор
Cypress.Commands.add('addMainIngredient', () => {
  cy.get('@main').contains('Добавить').click();
});

// Закрывает модальное окно
Cypress.Commands.add('closeModal', () => {
  cy.get('@closeModalButton').click();
});

// --- Расширяем интерфейс Cypress ---
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Добавляет булку в конструктор
       */
      addBun(): Chainable<void>;

      /**
       * Добавляет основной ингредиент в конструктор
       */
      addMainIngredient(): Chainable<void>;

      /**
       * Закрывает модальное окно
       */
      closeModal(): Chainable<void>;
    }
  }
}
