/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "3.3",
    "require": ["3.2", "2.2"] 
  }
*/

describe('3.3', () => {
  it('3.3.1', () => {
    cy.pushToServer('3.3.1').then(response => {
      expect(response).property('body').to.contains('3.3.1');
    });
  });
});
