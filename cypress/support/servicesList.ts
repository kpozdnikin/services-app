/* eslint-disable no-undef */
// [TODO: BL-794] add localization to tests
Cypress.Commands.add('isServicesTableExists', () => {
  cy.getByAutomationId('services-list')
    .find('div')
    .contains('Service name')
    .should('exist');

  cy.getByAutomationId('services-table-header')
    .find('div')
    .contains('Duration')
    .should('exist');

  cy.getByAutomationId('services-table-header')
    .find('div')
    .contains('Price')
    .should('exist');

  cy.getByAutomationId('services-table-header')
    .find('div')
    .contains('Tax')
    .should('exist');

  cy.getByAutomationId('services-table-header')
    .find('div')
    .contains('Category')
    .should('exist');

  cy.getByAutomationId('services-table-header')
    .find('div')
    .contains('Status')
    .should('exist');
});
