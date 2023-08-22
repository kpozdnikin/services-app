/* eslint-disable no-undef */
Cypress.Commands.add('sessionInterceptor', () => {
  cy.intercept('GET', '/v1/user/session/*').as('getUserSession');

  cy.wait('@getUserSession').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('loginInterceptor', () => {
  // /v1/login?include=shops.photos,shops.address,shops.logo,shops.barbers,shops.barbers.photos,barbers.shop,barbers.shop.address,brand,permissions
  cy.intercept('GET', '/v1/user/session/*').as('getUserSession');
});

Cypress.Commands.add('addServiceInterceptor', (body) => {
  cy.intercept('POST', `/v2/brand/*/service`, {
    body,
  }).as('AddCategoryInterceptor');
});

Cypress.Commands.add('addServiceInterceptorMock', () => {
  cy.intercept('POST', `/v2/brand/*/service`, {
    fixture: 'service/addService.json',
  }).as('AddCategoryInterceptor');
});

Cypress.Commands.add('brandServicesInterceptor', () => {
  cy.intercept('GET', '**/v2/brand/*/service**').as('getServices');

  cy.wait('@getServices').its('response.statusCode').should('eq', 200);
});
