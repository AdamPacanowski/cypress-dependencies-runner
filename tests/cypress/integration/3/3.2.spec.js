/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "3.2",
    "require": ["3.1"] 
  }
*/

describe('3.2', () => {
  it('3.2.1', () => {
    cy.pushToServer('3.2.1').then(() => {
      cy.getFromServer().then((response) => {
        expect(response).property('body').to.contains('2.4.1');
        expect(response).property('body').to.contains('3.1.1');
        expect(response).property('body').to.contains('3.2.1');
      });
    });
  });
});
