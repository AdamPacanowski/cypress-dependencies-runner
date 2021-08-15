/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "2.4",
    "require": [] 
  }
*/

describe('2.4', () => {
  it('2.4.1', () => {
    cy.pushToServer('2.4.1').then(response => {
      expect(response).property('body').to.contains('2.4.1');
    });
  });
});
