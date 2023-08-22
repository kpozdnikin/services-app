import '../support/commands';
import enJson from '../../static/locales/en.json';

class ServicesList {
  servicesPage = () => {
    return cy.srShadow().find('[data-automation-id=services-page]');
  };

  servicesList = () => {
    return cy.srShadow().find('[data-automation-id=services-list]');
  };

  servicesTableHeaderPage = () => {
    return cy.srShadow().find('[data-automation-id=services-table-header]');
  };

  servicesTableBodyPage = () => {
    return cy.srShadow().find('[data-automation-id=services-table-body]');
  };

  servicesPageExists = () => {
    this.servicesPage().should('exist');
  };

  servicesPageNotExists = () => {
    this.servicesPage().should('not.exist');
  };

  brandVisitServicesPage = () => {
    cy.visit(Cypress.env('BRAND_SERVICES_URL'));

    this.servicesPageExists();
  };

  setBrandCurrency = (currency) => {
    cy.intercept('/v1/user/session*', (req) => {
      req.continue((res) => {
        const modifiedBody = {
          ...res.body,
          brand: {
            ...res.body.brand,
            currency,
          },
        };

        res.send({ body: modifiedBody });
      });
    });
  };

  setShopCurrency = (currency) => {
    cy.intercept('/v1/user/session*', (req) => {
      req.continue((res) => {
        const shops = res.body.shops.map((shopItem) => ({
          ...shopItem,
          currency,
        }));

        const modifiedBody = {
          ...res.body,
          shops,
        };

        res.send({ body: modifiedBody });
      });
    });
  };

  setBarberCurrency = (currency) => {
    cy.intercept('/v1/user/session*', (req) => {
      req.continue((res) => {
        const barbers = res.body.barbers.map((barberItem) => ({
          ...barberItem,
          shop: {
            ...barberItem.shop,
            currency,
          },
        }));

        const modifiedBody = {
          ...res.body,
          barbers,
        };

        res.send({ body: modifiedBody });
      });
    });
  };

  checkServicesListCurrency = (currencySymbol) => {
    cy.getByAutomationId('money-cell').contains(currencySymbol).should('exist');
  };

  checkServicesListCurrencyNotExists = (currencySymbol) => {
    cy.getByAutomationId('money-cell').contains(currencySymbol).should('not.exist');
  };

  checkServicePageCurrency = (currencySymbol) => {
    this.canOpenService();
    cy.getByAutomationId('currency-input').contains(currencySymbol).should('exist');
  };

  checkServicePageNotCurrencyNotExists = (currencySymbol) => {
    this.canOpenService();
    cy.getByAutomationId('currency-input').contains(currencySymbol).should('not.exist');
  };

  brandCheckCurrency = (symbol) => {
    this.brandVisitServicesPage();
    this.checkServicesListCurrency(symbol);
    this.checkServicePageCurrency(symbol);
  };

  brandCheckCurrencyNotExists = (symbol) => {
    this.brandVisitServicesPage();
    this.checkServicesListCurrencyNotExists(symbol);
    this.checkServicePageNotCurrencyNotExists(symbol);
  };

  shopCheckCurrency = (symbol) => {
    this.shopVisitServicesPage();
    this.checkServicesListCurrency(symbol);
    this.checkServicePageCurrency(symbol);
  };

  shopCheckCurrencyNotExists = (symbol) => {
    this.shopVisitServicesPage();
    this.checkServicesListCurrencyNotExists(symbol);
    this.checkServicePageNotCurrencyNotExists(symbol);
  };

  barberCheckCurrency = (symbol: string) => {
    this.barberVisitServicesPage();
    this.checkServicesListCurrency(symbol);
    this.checkServicePageCurrency(symbol);
  };

  barberCheckCurrencyNotExists = (symbol: string) => {
    this.barberVisitServicesPage();
    this.checkServicesListCurrencyNotExists(symbol);
    this.checkServicePageNotCurrencyNotExists(symbol);
  };

  brandVisitCanNotVisitServicesPage = () => {
    cy.visit(Cypress.env('BRAND_SERVICES_URL'));

    this.servicesPageNotExists();
  };

  barberVisitServicesPage = () => {
    cy.visit(Cypress.env('BARBER_SERVICES_URL'));

    this.servicesPageExists();
  };

  barberCanNotVisitServicesPage = () => {
    cy.visit(Cypress.env('BARBER_SERVICES_URL'));

    this.servicesPageNotExists();
  };

  shopVisitServicesPage = () => {
    cy.visit(Cypress.env('SHOP_SERVICES_URL'));

    this.servicesPageExists();
  };

  shopCanNotVisitServicesPage = () => {
    cy.visit(Cypress.env('SHOP_SERVICES_URL'));

    this.servicesPageNotExists();
  };

  canViewServices = () => {
    this.servicesPage().should('exist');
    this.servicesTableBodyPage().should('exist');
    cy.isServicesTableExists();
  };

  canNotViewServices = () => {
    this.servicesList().should('not.exist');
  };

  canModifyService = () => {
    this.canOpenService();

    cy.srShadow().find('button[type="submit"]').should('exist').should('not.be.disabled');
  };

  canDeleteService = () => {
    this.canOpenService();

    cy.getByAutomationId('delete-service-button')
      .should('exist')
      .should('not.be.disabled');
  };

  canNotDeleteService = () => {
    this.servicesTableBodyPage()
      .find('[data-automation-id=service-list-item]')
      .first()
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('delete-service-button').should('not.exist');
  };

  canOpenAssignments = () => {
    this.canOpenService();

    cy.srShadow().find('button[type="submit"]').should('exist').click({ force: true });

    cy.getByAutomationId('edit-service-assignments-page').should('exist');
  };

  canNotModifyService = () => {
    this.servicesTableBodyPage()
      .find('[data-automation-id=service-list-item]')
      .first()
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('service-details-form').should('not.exist');
  };

  canSeeListOfServices = () => {
    cy.isServicesTableExists();

    this.servicesTableBodyPage().find('div').first().should('exist');
  };

  canNotSeeListOfServices = () => {
    this.servicesList().should('not.exist');

    this.servicesTableBodyPage().should('not.exist');
  };

  canReorderListOfServices = () => {
    this.servicesList()
      .find('.c-table-card__head .c-table-card__cell')
      .should('exist')
      .contains(enJson.pages.services.list.columns.sort)
      .should('exist');
  };

  canNotReorderListOfServices = () => {
    this.servicesTableHeaderPage()
      .find('.c-table-card__cell')
      .contains(enJson.pages.services.list.columns.sort)
      .should('not.exist');
  };

  canOpenCategories = () => {
    cy.getByAutomationId('categories-button')
      .contains(enJson.pages.services.buttons.categories)
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('categories-page').should('exist');
  };

  canNotOpenCategories = () => {
    cy.getByAutomationId('categories-button').should('not.exist');
  };

  canExportToCsv = () => {
    cy.getByAutomationId('export-to-csv-button')
      .contains(enJson.pages.services.buttons.exportToCsv)
      .should('exist')
      .should('not.be.disabled')
      .click({ force: true });
  };

  canNotExportToCsv = () => {
    cy.getByAutomationId('export-to-csv-button').should('not.exist');
    cy.srShadow()
      .get('button')
      .contains(enJson.pages.services.buttons.exportToCsv)
      .should('not.exist');
  };

  canAddService = () => {
    cy.getByAutomationId('add-service-button')
      .contains(enJson.pages.services.buttons.addService)
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('service-details-form').should('exist');

    cy.getByAutomationId('service-details-form')
      .find('input[name="name"]')
      .should('exist')
      .should('not.be.disabled')
      .type('test service name', { force: true });

    cy.getByAutomationId('service-details-form')
      .find('textarea[name="desc"]')
      .should('exist')
      .should('not.be.disabled')
      .type('test service description', { force: true });

    cy.getByAutomationId('currency-input')
      .find('input')
      .should('exist')
      .should('not.be.disabled')
      .type('11', { force: true });

    cy.srShadow().find('button[type="submit"]').should('exist');
  };

  canNotAddService = () => {
    cy.getByAutomationId('add-service-button').should('not.exist');
    cy.get('button')
      .contains(enJson.pages.services.buttons.addService)
      .should('not.exist');
  };

  brandCanNotAddService = () => {
    cy.getByAutomationId('add-service-button').should('exist').click();
    cy.getByAutomationId('service-details-form').should('exist');

    cy.getByAutomationId('service-details-form')
      .find('input[name="name"]')
      .should('exist')
      .type('Test service');

    cy.getByAutomationId('service-details-form')
      .find('textarea[name="desc"]')
      .should('exist')
      .type('Test service description');

    cy.getByAutomationId('service-details-form')
      .find('input[name="cost"]')
      .should('exist')
      .type('100111');

    cy.AddServiceInterceptorMock().as('@addService');

    cy.srShadow().get('[data-automation-id=service-details-form]').submit();

    cy.wait('@addService').its('response.statusCode').should('not.eq', 403);
  };

  canOpenService = () => {
    this.servicesTableBodyPage()
      .find('div')
      .first()
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('service-details-form').should('exist');
  };

  canNotOpenService = () => {
    this.servicesTableBodyPage()
      .find('div')
      .first()
      .should('exist')
      .click({ force: true });

    cy.getByAutomationId('service-details-form').should('not.exist');
  };
}

export default ServicesList;
