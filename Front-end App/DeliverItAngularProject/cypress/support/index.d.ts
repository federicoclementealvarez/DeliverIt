declare namespace Cypress {
  interface Chainable {
    /**
     * Comando personalizado para iniciar sesión como cliente.
     * @example cy.loginCustomer('correo@ejemplo.com', 'password123')
     */
    loginCustomer(): Chainable<void>;
  }
}
