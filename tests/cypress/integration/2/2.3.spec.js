/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "2.3",
    "require": [] 
  }
*/

describe('2.3', () => {
  it('2.3.1', () => {
    cy.pushToServer('2.3.1').then(() => {
      cy.getFromServer().then((response) => {
        expect(response).property('body').to.contains('2.3.1');
      });
    });
  });
});
