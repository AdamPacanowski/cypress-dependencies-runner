/// <reference types="cypress" />

describe('1.2', () => {
  it('1.2.1', () => {
    cy.pushToServer('1.2.1')
    .then(() => {
      cy.getFromServer()
        .then(response => {
          expect(response).property('body').to.contains('1.1.1');
          expect(response).property('body').to.contains('1.1.2');
          expect(response).property('body').to.contains('1.2.1');
        });
    });      
  });

  it('1.2.2', () => {
    cy.pushToServer('1.2.2')
    .then(() => {
      cy.getFromServer()
        .then(response => {
          expect(response).property('body').to.contains('1.1.1');
          expect(response).property('body').to.contains('1.1.2');
          expect(response).property('body').to.contains('1.2.1');
          expect(response).property('body').to.contains('1.2.2');
        });
    });
  })
});