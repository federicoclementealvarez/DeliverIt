/// <reference types="cypress" />

// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginCustomer', () => {
  cy.visit('login');
  cy.get('[data-cy="email"]').type('client@deliverit.com');
  cy.get('[data-cy="password"]').type('12345678');
  cy.get('[data-cy="submit"]').click();
  cy.url().should('contain', '/home-customer');
});
