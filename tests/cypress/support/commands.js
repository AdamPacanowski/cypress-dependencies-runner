// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('pushToServer', (id) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: id.toString()
  });
});

Cypress.Commands.add('getFromServer', () => {
  return cy.request('http://localhost:3000');
});

Cypress.Commands.add('clearServer', () => {
  return cy.request('DELETE', 'http://localhost:3000');
});
