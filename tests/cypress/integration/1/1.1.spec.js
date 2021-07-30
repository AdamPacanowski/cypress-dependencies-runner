/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "1.1"
  }
*/

describe('1.1', () => {
  before(() => {
    cy.clearServer();
  });

  it('1.1.1', () => {
    cy.pushToServer('1.1.1')
    .then(() => {
      cy.getFromServer()
        .then(response => {
          expect(response).property('body').to.contains('1.1.1');
        });
    });      
  });

  it('1.1.2', () => {
    cy.pushToServer('1.1.2')
    .then(() => {
      cy.getFromServer()
        .then(response => {
          expect(response).property('body').to.contains('1.1.2');
        });
    });
  })
});