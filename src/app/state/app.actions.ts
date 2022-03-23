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

export class SetFilteredList {
  static readonly type = '[App] SetFilteredList';
  constructor(public filterSelected: string) {}
}

export class SetFilterStatus {
  static readonly type = '[App] FilterStatus';
  constructor(public filterStatus: boolean) {}
}
