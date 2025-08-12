import { selectors } from '../support/selectors';

describe('Конструктор бургера', () => {
    beforeEach(() => {
    cy.visit('/');
    });

    it('должен добавить булку и оформить заказ', () => {
    // Находим первую карточку булки в списке ингредиентов
    cy.get(selectors.ingredientCard)
        .contains('булка')
        .first()
        .click();

    // Проверяем, что булка появилась в конструкторе
    cy.get(selectors.bunTop).should('exist');
    cy.get(selectors.bunBottom).should('exist');

    // Нажимаем кнопку заказа
    cy.get(selectors.makeOrderButton).click();

    // Тут можно добавить проверку открытия модалки или отправки заказа
    });
});
