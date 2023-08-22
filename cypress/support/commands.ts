import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';
import moment from 'moment-timezone';
import './servicesList';

/* eslint-disable no-undef */

Cypress.Commands.add('srShadow', () => {
  return cy.get(`#${Cypress.env('APP_ROOT_ID')} > div`).shadow();
});

Cypress.Commands.add('sr', () => {
  return cy.get(`#${Cypress.env('APP_ROOT_ID')} > div`).first();
});

Cypress.Commands.add('dateTimeFormat', (dateTime, dateTimeFormat) => {
  return moment(dateTime).format(dateTimeFormat);
});

Cypress.Commands.add('getInputByLabel', { prevSubject: false }, (label) => {
  cy.log(`Search input with label ${label}`);

  return cy.sr().contains(label).find('input');
});

Cypress.Commands.add('getSelectByLabel', { prevSubject: false }, (label) => {
  cy.log(`Search select with label ${label}`);

  return cy.sr().contains(label).find('select');
});

Cypress.Commands.add('getByAutomationId', (selector, ...args) =>
  cy.srShadow().find(`[data-automation-id=${selector}]`, ...args),
);

Cypress.Commands.add('getByAutomationIdLike', (selector, ...args) =>
  cy.get(`[data-automation-id*=${selector}]`, ...args),
);

Cypress.Commands.add('addToken', (tokenType) =>
  localStorage.setItem('token', Cypress.env(tokenType)),
);

Cypress.Commands.add('loginUser', (userName, password) => {
  cy.request('POST', `${Cypress.env('PUBLIC_API_URL')}${Cypress.env('LOGIN_URL')}`, {
    password: Cypress.env(password),
    username: Cypress.env(userName),
  }).then((response) => {
    expect(response.body).to.have.property('token');

    localStorage.setItem('token', response.body.token);
    cy.saveLocalStorage();

    expect(localStorage.getItem('token')).to.eq(response.body.token);
  });
});
