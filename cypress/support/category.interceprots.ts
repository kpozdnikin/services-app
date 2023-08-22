// https://api-staging-1.getsquire.com/v2/brand/5edc9b0b-7bff-4dcd-92b5-869e8d0e72ce/service-category
// Метод запроса: POST
/* eslint-disable no-undef */

Cypress.Commands.add('AddCategoryInterceptor', (body) => {
  // /v1/login?include=shops.photos,shops.address,shops.logo,shops.barbers,shops.barbers.photos,barbers.shop,barbers.shop.address,brand,permissions
  cy.intercept('POST', `/v2/brand/*/service-category`, {
    body,
  }).as('AddCategoryInterceptor');
});

Cypress.Commands.add('AddCategoryInterceptorMock', () => {
  // /v1/login?include=shops.photos,shops.address,shops.logo,shops.barbers,shops.barbers.photos,barbers.shop,barbers.shop.address,brand,permissions
  cy.intercept('POST', `/v2/brand/*/service-category`, {
    fixture: 'service/addCategory.json',
  }).as('AddCategoryInterceptorMock');
});
