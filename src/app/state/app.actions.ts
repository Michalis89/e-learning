export class GetListItems {
  static readonly type = '[App] GetListItems';
  constructor() {}
}

export class GetFilterCategoriesType {
  static readonly type = '[App] GetFilterCategoriesType';
  constructor() {}
}

export class GetFiltersCategoriesName {
  static readonly type = '[App] GetFiltersSubCategories';
  constructor() {}
}

export class SortListItems {
  static readonly type = '[App] SortListItems';
  constructor(public sortType: string) {}
}

export class SetSelectedFilters {
  static readonly type = '[App] SetSelectedFilters';
  constructor(public filterSelected: Array<any>) {}
}

export class SetFilterChipStatus {
  static readonly type = '[App] FilterStatus';
  constructor(public showFilterChips: boolean) {}
}
export class SetResultList {
  static readonly type = '[App] SetResultList';
  constructor() {}
}
export class DeleteAllFilters {
  static readonly type = '[App] DeleteAllFilters';
  constructor() {}
}
