import 'cypress-localstorage-commands';
import type { UserName } from '../../types';
import ServicesList from '../../pages/servicesList';

beforeEach(() => {
  localStorage.setItem('services@list', 'false');
});

describe('Service list test. Brand with FULL permissions.', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BRAND_RENTAL_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    servicesList.brandVisitServicesPage();
  });

  it('Brand can visit services list page', () => {
    servicesList.canViewServices();
    servicesList.canSeeListOfServices();
  });

  it('Brand can open service', () => {
    servicesList.canOpenService();
  });

  it('Brand can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Brand can open services categories', () => {
    servicesList.canOpenCategories();
    servicesList.brandVisitServicesPage();
  });

  it('Brand can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Brand can add service', () => {
    servicesList.canAddService();
  });

  it('Brand can modify services', () => {
    servicesList.canModifyService();
  });

  it('Brand can delete services', () => {
    servicesList.canDeleteService();
  });

  it('Brand can open assignments', () => {
    servicesList.canSeeListOfServices();
    servicesList.canOpenAssignments();
  });
});

describe('Service list test. Brand with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BRAND_RENTAL_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    servicesList.brandVisitServicesPage();
  });

  it('Brand can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Brand can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Brand can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Brand can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Brand can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Brand can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Brand can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Brand with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BRAND_RENTAL_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.brandVisitCanNotVisitServicesPage();
  });

  it('Brand can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Brand can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Brand can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Brand can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Brand can not add service', () => {
    servicesList.canNotAddService();
  });
});

describe('Service list test. Shop Rental with FULL permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_RENTAL_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopVisitServicesPage();
  });

  it('Shop can visit services list page', () => {
    servicesList.canViewServices();

    servicesList.canSeeListOfServices();
  });

  it('Shop can open service', () => {
    servicesList.canOpenService();
  });

  it('Shop can reorder services', () => {
    servicesList.canSeeListOfServices();

    servicesList.canReorderListOfServices();
  });

  it('Shop can open services categories', () => {
    servicesList.canOpenCategories();
    servicesList.brandVisitServicesPage();
  });

  it('Shop can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Shop can add service', () => {
    servicesList.canAddService();
  });

  it('Shop can modify services', () => {
    servicesList.canModifyService();
  });

  it('Shop can open assignments', () => {
    servicesList.canSeeListOfServices();
    servicesList.canOpenAssignments();
  });
});

describe('Service list test. Shop Rental with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_RENTAL_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopVisitServicesPage();
  });

  it('Shop can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Shop can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Shop can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Shop can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Shop can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Shop can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Shop can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Shop Rental with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_RENTAL_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopCanNotVisitServicesPage();
  });

  it('Shop can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Shop can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Shop can not open services categories', () => {
    servicesList.canNotOpenCategories();
    servicesList.brandVisitCanNotVisitServicesPage();
  });

  it('Shop can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Shop can not add service', () => {
    servicesList.canNotAddService();
  });
});

describe('Service list test. Shop Commission with FULL permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_COMMISSION_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopVisitServicesPage();
  });

  it('Shop can visit services list page', () => {
    servicesList.canViewServices();

    servicesList.canSeeListOfServices();
  });

  it('Shop can open service', () => {
    servicesList.canOpenService();
  });

  it('Shop can reorder services', () => {
    servicesList.canSeeListOfServices();

    servicesList.canReorderListOfServices();
  });

  it('Shop can open services categories', () => {
    servicesList.canOpenCategories();
    servicesList.brandVisitServicesPage();
  });

  it('Shop can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Shop can add service', () => {
    servicesList.canAddService();
  });

  it('Shop can modify services', () => {
    servicesList.canModifyService();
  });

  it('Shop can open assignments', () => {
    servicesList.canSeeListOfServices();
    servicesList.canOpenAssignments();
  });
});

describe('Service list test. Shop Commission with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_COMMISSION_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopVisitServicesPage();
  });

  it('Shop can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Shop can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Shop can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Shop can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Shop can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Shop can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Shop can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Shop Commission with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_COMMISSION_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.shopCanNotVisitServicesPage();
  });

  it('Shop can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Shop can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Shop can not open services categories', () => {
    servicesList.canNotOpenCategories();
    servicesList.brandVisitCanNotVisitServicesPage();
  });

  it('Shop can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Shop can not add service', () => {
    servicesList.canNotAddService();
  });
});

describe('Service list test. Barber Rental with FULL permissions.', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_RENTAL_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Rental can visit services list page', () => {
    servicesList.canViewServices();
    servicesList.canSeeListOfServices();
  });

  it('Barber Rental can open service', () => {
    servicesList.canOpenService();
  });

  it('Barber Rental can reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canReorderListOfServices();
  });

  it('Barber Rental can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Rental can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Rental can add service', () => {
    servicesList.canAddService();
  });

  it('Barber Rental can modify services', () => {
    servicesList.canModifyService();
  });
});

describe('Service list test. Barber Rental with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_RENTAL_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Rental can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Barber Rental can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Barber Rental can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Barber Rental can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Rental can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Rental can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Barber Rental can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Barber Rental with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_RENTAL_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberCanNotVisitServicesPage();
  });

  it('Barber Rental can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Rental can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Rental can not open services categories', () => {
    servicesList.canNotOpenCategories();
    servicesList.brandVisitCanNotVisitServicesPage();
  });

  it('Barber Rental can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Barber Rental can not add service', () => {
    servicesList.canNotAddService();
  });
});

describe('Service list test. Barber Commission with FULL permissions.', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_COMMISSION_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Commission can visit services list page', () => {
    servicesList.canViewServices();
    servicesList.canSeeListOfServices();
  });

  it('Barber Commission can open service', () => {
    servicesList.canOpenService();
  });

  it('Barber Commission can reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canReorderListOfServices();
  });

  it('Barber Commission can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Commission can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Commission can add service', () => {
    servicesList.canAddService();
  });

  it('Barber Commission can modify services', () => {
    servicesList.canModifyService();
  });
});

describe('Service list test. Barber Commission with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_COMMISSION_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Commission can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Barber Commission can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Barber Commission can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Barber Commission can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Commission can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Commission can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Barber Commission can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Barber Commission with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_COMMISSION_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberCanNotVisitServicesPage();
  });

  it('Barber Commission can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Commission can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Commission can not open services categories', () => {
    servicesList.canNotOpenCategories();
    servicesList.brandVisitCanNotVisitServicesPage();
  });

  it('Barber Commission can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Barber Commission can not add service', () => {
    servicesList.canNotAddService();
  });
});

describe('Service list test. Barber Indy with FULL permissions.', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_INDY_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Indy can visit services list page', () => {
    servicesList.canViewServices();
    servicesList.canSeeListOfServices();
  });

  it('Barber Indy can open service', () => {
    servicesList.canOpenService();
  });

  it('Barber Indy can reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canReorderListOfServices();
  });

  it('Barber Indy can open not services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Indy can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Indy can add service', () => {
    servicesList.canAddService();
  });

  it('Barber Indy can modify services', () => {
    servicesList.canModifyService();
  });
});

describe('Service list test. Barber Indy with VIEW permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_INDY_VIEW_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberVisitServicesPage();
  });

  it('Barber Indy can visit services list page', () => {
    servicesList.canViewServices();
  });

  it('Barber Indy can not open service', () => {
    servicesList.canNotOpenService();
  });

  it('Barber Indy can not reorder services', () => {
    servicesList.canSeeListOfServices();
    servicesList.canNotReorderListOfServices();
  });

  it('Barber Indy can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Indy can export services to csv', () => {
    servicesList.canExportToCsv();
  });

  it('Barber Indy can not add service', () => {
    servicesList.canNotAddService();
  });

  it('Barber Indy can not modify service', () => {
    servicesList.canNotModifyService();
  });
});

describe('Service list test. Barber Indy with NO permissions', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_INDY_NO_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    servicesList.barberCanNotVisitServicesPage();
  });

  it('Barber Indy can not visit services list page', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Indy can not reorder services', () => {
    servicesList.canNotViewServices();
  });

  it('Barber Indy can not open services categories', () => {
    servicesList.canNotOpenCategories();
  });

  it('Barber Indy can not export services to csv', () => {
    servicesList.canNotExportToCsv();
  });

  it('Barber Indy can not add service', () => {
    servicesList.canNotAddService();
  });
});
