describe('Модалка ингредиента в конструкторе бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get('[data-cy^="ingredient-card"]').should('exist');
  });

  it('Открывается модалка по клику на ингредиент', () => {
    cy.get('[data-cy^="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
  });

  it('Закрывается модалка по кнопке закрытия', () => {
    cy.get('[data-cy^="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрывается модалка по Esc', () => {
    cy.get('[data-cy^="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрывается модалка по клику на оверлей', () => {
    cy.get('[data-cy^="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
