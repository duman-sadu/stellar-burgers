const testUrl = 'http://localhost:4000';

describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    // Мокаем API
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('mockIngredients');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('mockOrder');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('mockUser');

    // Авторизация
    cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');

    cy.visit(testUrl);

    // Привязываем alias к элементам
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('[data-cy="bun"]').as('bun');
    cy.get('[data-cy="main"]').as('main');
    cy.get('[data-cy="burgerConstructor"]').as('burgerConstructor');
    cy.get('[data-cy="closeModalButton"]').as('closeModalButton');
    cy.get('[data-cy="modalOverlay"]').as('modalOverlay');
    cy.get('[data-cy="orderButton"]').as('orderButton');
    cy.get('[data-cy="orderNumber"]').as('orderNumber');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов', () => {
    beforeEach(() => {
      cy.wait('@mockIngredients');
    });

    it('Добавление булки', () => {
      cy.addBun();
      cy.get('@burgerConstructor').should('contain', 'Краторная булка N-200i');
    });

    it('Добавление начинки', () => {
      cy.addMainIngredient();
      cy.get('@burgerConstructor').should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    beforeEach(() => {
      cy.get('@bun').first().click();
      cy.get('@modal').should('be.visible');
    });

    it('Закрытие по кнопке', () => {
      cy.closeModal();
      cy.get('@modal').should('not.exist');
    });

    it('Закрытие по оверлею', () => {
      cy.get('@modalOverlay').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Оформление заказа и проверка', () => {
      cy.addBun();
      cy.addMainIngredient();
      cy.get('@orderButton').click();
      cy.get('@modal').should('be.visible');
      cy.get('@orderNumber').should('contain', '101');
      cy.closeModal();
      cy.get('@modal').should('not.exist');
      cy.get('@burgerConstructor').should('contain', 'Выберите булки');
    });
  });
});
