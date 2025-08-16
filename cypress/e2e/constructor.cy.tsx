import {
  INGREDIENT_CARD,
  MODAL
} from '../support/selectors';

describe('Модалка ингредиента в конструкторе бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get(INGREDIENT_CARD).should('exist');
  });

  it('Открывается модалка по клику на ингредиент и показывает его данные', () => {
    cy.fixture('ingredients.json').then((ingredients) => {
      const firstIngredientName = ingredients.data[0].name; // имя из фикстуры

      cy.get(INGREDIENT_CARD).first().click();
      cy.get(MODAL).should('exist');

      cy.get(MODAL).should('contain.text', firstIngredientName);
    });
  });
});
