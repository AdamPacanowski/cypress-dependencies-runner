/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "3.1",
    "require": ["2.4"] 
  }
***/

describe('3.1', () => {
  it('3.1.1', () => {
    cy.pushToServer('3.1.1').then(() => {
      cy.getFromServer().then((response) => {
        expect(response).property('body').to.contains('2.4.1');
        expect(response).property('body').to.contains('3.1.1');
      });
    });
  });
});
