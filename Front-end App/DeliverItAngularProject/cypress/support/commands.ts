/// <reference types="cypress" />

// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginCustomer', () => {
  cy.visit('login');
  cy.get('[data-cy="email"]').type('mauro@a.com');
  cy.get('[data-cy="password"]').type('blabla123');
  cy.get('[data-cy="submit"]').click();
  cy.url().should('contain', '/home-customer');
});
