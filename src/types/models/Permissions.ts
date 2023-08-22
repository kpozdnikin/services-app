export type Permissions = {
  clients: {
    add: boolean;
    view: boolean;
    modify: boolean;
  };
  profile: {
    view: boolean;
    modify: boolean;
  };
  reports: {
    view: boolean;
  };
  register: {
    view: boolean;
  };
  services: {
    add: boolean;
    view: boolean;
    modify: boolean;
  };
  workHours: {
    add: boolean;
    view: boolean;
    modify: boolean;
  };
  bankAccount: {
    add: boolean;
    view: boolean;
    modify: boolean;
  };
  supplyStore: {
    viewOwnStore: boolean;
    viewMainStore: boolean;
  };
  appointments: {
    book: boolean;
    view: boolean;
    cancel: boolean;
    modify: boolean;
    history: boolean;
    blockTime: boolean;
    // eslint-disable-next-line camelcase
    show_contact_info: boolean;
  };
  cashRegister: {
    view: boolean;
    modify: boolean;
  };
};

export type UserPermissions = {
  canAddServices: boolean;
  canModifyServices: boolean;
  canModifyCategories: boolean;
  canOpenCategories: boolean;
  canOpenServices: boolean;
  canSortServices: boolean;
  canViewServices: boolean;
  canAssignService: boolean;
};

export type MakePath<
  ParentKey extends string | void,
  ChildKey extends string
> = ParentKey extends string ? `${ParentKey & string}.${ChildKey & string}` : ChildKey;

export type MappedToTemplateString<Dict> = {
  [Key in keyof Dict]: `${Key & string}${Key & string}${Key & string}`;
};

export type ReturnPathOrGoDeeper<
  Value,
  PathToRoot extends string | void = void
> = Value extends Record<string, any> ? PathsToLeaves<Value, PathToRoot> : PathToRoot;

export type PathsToLeaves<
  Dict extends Record<string, any>,
  PathToRoot extends string | void = void,
  Keys = keyof Dict
> = Keys extends keyof Dict & string
  ? {
      [K in Keys]: ReturnPathOrGoDeeper<Dict[K], MakePath<PathToRoot, K>>;
    }[Keys]
  : never;
