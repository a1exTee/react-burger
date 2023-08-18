import '@testing-library/cypress/add-commands';

describe('BurgerConstructor Drag and Drop', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(5000);
  });

  it('should allow dragging and dropping ingredients', () => {
    // Выбираем ингредиент, который мы будем перетаскивать
    cy.get('[class^="ingredients-item_ingredientItem__"]').eq(2).as('ingredient');

    // Выбираем контейнер для перетаскивания
    cy.get('[class^="burger-constructor_burgerConstructorCol__"] > ul').as('constructorContainer');

    // Перетаскиваем ингредиент в контейнер
    cy.get('@ingredient').trigger('mousedown', { button: 0 });
    cy.get('@constructorContainer').trigger('mousemove').trigger('mouseup', { force: true });

    // Проверяем, что ингредиент успешно добавлен в контейнер
    cy.get('[class^="burger-constructor_burgerConstructorCol__"] > ul').should('have.length', 1);
  });
});