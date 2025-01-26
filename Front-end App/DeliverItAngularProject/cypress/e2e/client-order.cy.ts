describe('client logs in', () => {
  it('shows the landing page correctly', () => {
    cy.visit('');
    cy.contains('Bienvenido!');
    cy.contains('INICIAR SESIÓN');
  });

  it('goes to the login page', () => {
    cy.visit('');
    cy.get('[data-cy="login"]').click();
    cy.url().should('contain', '/login');
  });

  it('logs in with user credentials', () => {
    cy.loginCustomer();
  });
});

describe('client makes an order', () => {
  beforeEach(() => {
    cy.loginCustomer();
  });

  it('navigate to the shop page', () => {
    //navigate to the shop page
    cy.visit('/home-customer');
    cy.contains('Mongo hamburgueseria').click();
    cy.url().should('contain', '/shop-customer');

    //Test add and remove product without variations
    cy.get('[prod-name="American Healthy"]').contains('Agregar').click();
    cy.get('[prod-name="American Healthy"]').contains('+').click();
    cy.get('[prod-name="American Healthy"]').contains('-').click();

    //Test add and remove product with variations
    cy.get('[prod-name="ChetoBurguer"]').contains('Agregar').click();
    // Retrieve the maxVar value from the HTML attribute
    let flavours = [];

    cy.get('h1.title')
      .invoke('attr', 'max-var')
      .then((text) => {
        const maxVar = Number(text.trim());

        cy.get('[data-cy="add-remove-flavour"]').each(($el, index) => {
          if (index < maxVar) {
            cy.wrap($el)
              .find('.card-title')
              .invoke('text')
              .then((productName) => {
                flavours.push(productName.trim()); // Agrega el nombre al array
              });

            cy.wrap($el).contains('+').click();
          }
        });
      });

    cy.contains('Listo').click();

    cy.get('#amount-text').contains(2);

    cy.get('*[class^="buttons-order-container"]').contains('SIGUIENTE').click();

    for (let flavour of flavours) {
      cy.contains(flavour);
    }

    cy.get('select#paymentType').select('Efectivo');

    cy.contains('CONFIRMAR').click();

    cy.contains('VOLVER AL INICIO').click();

    cy.url().should('contain', '/home-customer');
  });

  it('show the current order', () => {
    cy.loginCustomer();
    cy.get('[data-cy="side-menu-icon"]').click();
    cy.contains('Ver pedidos pendientes').click();
    cy.get('app-shop-card').get('[data-cy="expand-more-icon"]').first().click();
    cy.contains('American Healthy');
    cy.contains('ChetoBurguer');
    cy.contains('Total'); // hay que ver esto
    cy.contains('Efectivo');
    cy.contains('En camino');
  });
});
