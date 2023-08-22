import ServicesList from '../../pages/servicesList';
import { UserName } from '../../types';
import { Currency } from '../../support/constants';

describe('Currency test. Brand user', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BRAND_RENTAL_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Brand user see USD currency', () => {
    servicesList.setBrandCurrency(Currency.USD.currency);
    servicesList.brandCheckCurrency(Currency.USD.symbol);
  });

  it('Brand user see GBP currency', () => {
    servicesList.setBrandCurrency(Currency.GBP.currency);
    servicesList.brandCheckCurrency(Currency.GBP.symbol);
  });

  it('Brand user see CAD currency', () => {
    servicesList.setBrandCurrency(Currency.CAD.currency);
    servicesList.brandCheckCurrency(Currency.CAD.symbol);
  });

  it('Brand user see AUD currency', () => {
    servicesList.setBrandCurrency(Currency.AUD.currency);
    servicesList.brandCheckCurrency(Currency.AUD.symbol);
  });

  it('Brand user see EUR currency', () => {
    servicesList.setBrandCurrency(Currency.EUR.currency);
    servicesList.brandCheckCurrency(Currency.EUR.symbol);
  });

  it('Brand user does`t see USD currency', () => {
    servicesList.setBrandCurrency(Currency.EUR.currency);
    servicesList.brandCheckCurrencyNotExists(Currency.USD.symbol);
  });
});

describe('Currency test. Shop user', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('SHOP_RENTAL_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Shop user see USD currency', () => {
    servicesList.setShopCurrency(Currency.USD.currency);
    servicesList.shopCheckCurrency(Currency.USD.symbol);
  });

  it('Shop user see GBP currency', () => {
    servicesList.setShopCurrency(Currency.GBP.currency);
    servicesList.shopCheckCurrency(Currency.GBP.symbol);
  });

  it('Shop user see CAD currency', () => {
    servicesList.setShopCurrency(Currency.CAD.currency);
    servicesList.shopCheckCurrency(Currency.CAD.symbol);
  });

  it('Shop user see AUD currency', () => {
    servicesList.setShopCurrency(Currency.AUD.currency);
    servicesList.shopCheckCurrency(Currency.AUD.symbol);
  });

  it('Shop user see EUR currency', () => {
    servicesList.setShopCurrency(Currency.EUR.currency);
    servicesList.shopCheckCurrency(Currency.EUR.symbol);
  });

  it('Shop does`t see USD currency', () => {
    servicesList.setShopCurrency(Currency.EUR.currency);
    servicesList.shopCheckCurrencyNotExists(Currency.USD.symbol);
  });
});

describe('Currency test. Barber user', () => {
  const servicesList = new ServicesList();

  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginUser<UserName>('BARBER_COMMISSION_FULL_PERM_USERNAME', 'PASSWORD');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Barber user see USD currency', () => {
    servicesList.setBarberCurrency(Currency.USD.currency);
    servicesList.barberCheckCurrency(Currency.USD.symbol);
  });

  it('Barber user see GBP currency', () => {
    servicesList.setBarberCurrency(Currency.GBP.currency);
    servicesList.barberCheckCurrency(Currency.GBP.symbol);
  });

  it('Barber user see CAD currency', () => {
    servicesList.setBarberCurrency(Currency.CAD.currency);
    servicesList.barberCheckCurrency(Currency.CAD.symbol);
  });

  it('Barber user see AUD currency', () => {
    servicesList.setBarberCurrency(Currency.AUD.currency);
    servicesList.barberCheckCurrency(Currency.AUD.symbol);
  });

  it('Barber user see EUR currency', () => {
    servicesList.setBarberCurrency(Currency.EUR.currency);
    servicesList.barberCheckCurrency(Currency.EUR.symbol);
  });

  it('Barber user does`t see USD currency', () => {
    servicesList.setBarberCurrency(Currency.EUR.currency);
    servicesList.barberCheckCurrencyNotExists(Currency.USD.symbol);
  });
});
