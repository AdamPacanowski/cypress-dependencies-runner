/// <reference types="cypress" />

describe('Example', () => {
  before(() => {
    cy.request('DELETE', 'http://localhost:3000/');
  })

  it('1', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: '1'
    })
      .then(() => {
        cy.request('http://localhost:3000/')
          .then(response => {
            expect(response).property('body').to.contains('1');
          });
      });
  });
});