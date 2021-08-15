/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "2.2",
    "require": ["2.4"] 
  }
*/

describe('2.2', () => {
  it('2.2.1', () => {
    cy.pushToServer('2.2.1').then(response => {
      expect(response).property('body').to.contains('2.2.1');
    });
  });
});
