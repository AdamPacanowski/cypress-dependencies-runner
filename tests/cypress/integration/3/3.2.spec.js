/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "3.2",
    "require": ["3.1"] 
  }
*/

describe('3.2', () => {
  it('3.2.1', () => {
    cy.pushToServer('3.2.1').then(response => {
      expect(response).property('body').to.contains('3.2.1');
    });
  });
});
