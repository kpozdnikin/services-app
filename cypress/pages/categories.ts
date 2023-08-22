import enJson from '../../static/locales/en.json';

class Categories {
  canAddCategory = () => {
    cy.AddCategoryInterceptorMock().as('addCategoryMock');

    cy.wait('@addCategoryMock').its('response.statusCode').should('eq', 200);
  };

  canNotAddCategory = () => {
    cy.AddCategoryInterceptorMock().as('addCategoryMock');

    cy.wait('@addCategoryMock').its('response.statusCode').should('not.eq', 200);
  };

  brandCanVisitButCanNotAddCategories = () => {
    cy.visit('/brand/services/categories');

    cy.getByAutomationId('to-services')
      .contains(enJson.pages.categories.buttons.services)
      .should('have.attr', 'href', '/brand/services');

    cy.getByAutomationId('add-service-category')
      .contains(enJson.pages.categories.buttons.addCategory)
      .should('have.attr', 'href', '/brand/services/categories/add')
      .click();

    cy.getByAutomationId('services-categories-form').should('exist');

    cy.getByAutomationId('services-categories-form')
      .find('input[name="name"]')
      .should('exist')
      .type('Test category');

    cy.AddCategoryInterceptor({ name: 'Test category' }).as('@addCategory');

    cy.getByAutomationId('services-categories-form').submit();

    cy.wait('@addCategory').its('response.statusCode').should('not.eq', 200);
  };
}

export default Categories;
