/// <reference types="cypress" />

/***CypressRunner
  {
    "id": "2.1",
    "require": ["1.1", "2.2", "2.3"] 
  }
*/

describe('2.1', () => {
  it('2.1.1', () => {
    cy.pushToServer('2.1.1').then(response => {
      expect(response).property('body').to.contains('1.1.1');
      expect(response).property('body').to.contains('2.2.1');
      expect(response).property('body').to.contains('2.3.1');
      expect(response).property('body').to.contains('2.1.1');
    });
  });
});
