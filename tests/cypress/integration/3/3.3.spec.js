/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "Last test",
    "require": ["3.2", "2.2"] 
  }
***/

describe('3.3', () => {
  it('3.3.1', () => {
    cy.pushToServer('3.3.1').then(() => {
      cy.getFromServer().then((response) => {
        expect(response).property('body').to.contains('2.4.1');
        expect(response).property('body').to.contains('2.2.1');
        expect(response).property('body').to.contains('3.2.1');
        expect(response).property('body').to.contains('3.1.1');
        expect(response).property('body').to.contains('3.3.1');
      });
    });
  });
});
