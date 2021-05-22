/// <reference types="cypress" />

describe('Example', () => {
  before(() => {
    cy.clearServer();
  })

  it('1', () => {
    cy.pushToServer('1')
      .then(() => {
        cy.getFromServer()
          .then(response => {
            expect(response).property('body').to.contains('1');
          });
      });
  });
});