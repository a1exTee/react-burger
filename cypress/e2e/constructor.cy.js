import '@testing-library/cypress/add-commands';

const testUrl = "http://localhost:3000";

describe('BurgerConstructor', function() {

  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(5000);
  })

  it('Open modal', () => {
    cy.get('[data-test="Краторная булка N-200i"]').click();
    cy.contains('Детали ингредиента').should('exist');
  });

  it('Close modal on button', () => {
    cy.get('[data-test="Краторная булка N-200i"]').click();
    cy.get('[data-test="close-icon"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })

  it('Modal close on overlay', () => {
    cy.get('[data-test="Краторная булка N-200i"]').click();
    cy.get('[data-test="modal-overlay"]').click(1, 1);
    cy.contains('Детали ингредиента').should('not.exist');
  })

  it('DND', () => {
    cy.get('[data-test="bun-top"]').should('not.exist');
    cy.get('[data-test="bun-bottom"]').should('not.exist');
    cy.get('[data-test="Краторная булка N-200i"]').trigger("dragstart");
    cy.get('[data-test="drop-container"]').trigger('drop');
    cy.get('[data-test="bun-top"]').should('exist');
    cy.get('[data-test="bun-bottom"]').should('exist');
  })

});