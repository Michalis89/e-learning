export class GetListItems {
  static readonly type = '[App] GetListItems';
  constructor() {}
}

export class GetFiltersCategories {
  static readonly type = '[App] GetFiltersCategories';
  constructor() {}
}

export class GetFiltersSubCategories {
  static readonly type = '[App] GetFiltersSubCategories';
  constructor() {}
}

export class SortListItems {
  static readonly type = '[App] SortListItems';
  constructor(public sortType: string) {}
}
