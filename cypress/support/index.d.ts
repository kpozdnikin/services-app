declare namespace Cypress {
  interface Chainable {
    sr(): Chainable<Element>;
    dateTimeFormat<E extends Node = HTMLElement>(
      dateTime: string,
      dateTimeFormat: string,
    ): Chainable<JQuery<E>>;
    getByAutomationId<E extends Node = HTMLElement>(id: string): Chainable<JQuery<E>>;
    getInputByLabel<E extends Node = HTMLElement>(label: string): Chainable<JQuery<E>>;
    getSelectByLabel<E extends Node = HTMLElement>(label: string): Chainable<JQuery<E>>;
    addToken<E extends Node = HTMLElement>(tokenName: string): Chainable<JQuery<E>>;
    isServicesTableExists<E extends Node = HTMLElement>(): Chainable<JQuery<E>>;
    srShadow<E extends Node = HTMLElement>(): Chainable<JQuery<E>>;
    AddCategoryInterceptor<E extends Node = HTMLElement>(body: any): Chainable<JQuery<E>>;
    loginUser<E>(userName: E, password: string): Chainable;
    AddCategoryInterceptorMock<E extends Node = HTMLElement>(): Chainable<JQuery<E>>;
    AddServiceInterceptor<E extends Node = HTMLElement>(body: any): Chainable<JQuery<E>>;
    AddServiceInterceptorMock<E extends Node = HTMLElement>(): Chainable<JQuery<E>>;
  }
}
