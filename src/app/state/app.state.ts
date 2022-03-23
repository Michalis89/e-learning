import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsAfterBootstrap } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  GetListItems,
  SortListItems,
  SetFilterChipStatus,
  GetFilterCategoriesType,
  GetFiltersCategoriesName,
  DeleteAllFilters,
  SetResultList,
  SetSelectedFilters,
} from './app.actions';
import { AppService } from '../app.service';
import { ListItems } from '../models/listItems.model';

export interface AppStateModel {
  initialListItems: ListItems[];
  listItems: ListItems[];
  totalItems: number;
  filterCategoriesType: any;
  licenseCategoryName: any;
  deploymentCategoryName: any;
  industryCategoryName: any;
  nameSortItems: any;
  selectedFilteredItems: any;
  showFilterChips: boolean;
  deletedFilter: boolean;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    initialListItems: [],
    listItems: [],
    totalItems: 0,
    filterCategoriesType: [],
    licenseCategoryName: [],
    deploymentCategoryName: [],
    industryCategoryName: [],
    nameSortItems: [],
    selectedFilteredItems: [],
    showFilterChips: false,
    deletedFilter: false,
  },
})
@Injectable()
export class AppState implements NgxsAfterBootstrap {
  constructor(private appService: AppService) {}

  @Selector()
  static listItems(state: AppStateModel): ListItems[] {
    return state.listItems;
  }

  static totalItems(state: AppStateModel) {
    return state.totalItems;
  }

  @Selector()
  static filterCategoriesType(state: AppStateModel) {
    return state.filterCategoriesType;
  }

  @Selector()
  static licenseCategoryName(state: AppStateModel) {
    return state.licenseCategoryName;
  }

  @Selector()
  static deploymentCategoryName(state: AppStateModel) {
    return state.deploymentCategoryName;
  }

  @Selector()
  static industryCategoryName(state: AppStateModel) {
    return state.industryCategoryName;
  }

  @Selector()
  static selectedFilteredItems(state: AppStateModel) {
    return state.selectedFilteredItems;
  }

  @Selector()
  static showFilterChips(state: AppStateModel) {
    return state.showFilterChips;
  }
  @Selector()
  static deletedFilter(state: AppStateModel) {
    return state.deletedFilter;
  }

  @Action(GetListItems)
  getListItems(ctx: StateContext<AppStateModel>, action: GetListItems) {
    return this.appService.getData().pipe(
      tap((response) => {
        const state = ctx.getState();

        ctx.patchState({
          ...state,
          initialListItems: response.data,
          listItems: response.data,
          totalItems: response['total'],
        });
      })
    );
  }

  @Action(GetFilterCategoriesType)
  getFilterCategoriesType(ctx: StateContext<AppStateModel>, action: GetFilterCategoriesType) {
    return this.appService.getData().pipe(
      tap((response) => {
        const filterCategoriesType: any = [];
        response.data.forEach((filter) => {
          filter['filters'].forEach((filterType: any) => {
            filterCategoriesType.push(filterType.type);
          });
          const uniquefilterCategoriesType = [...new Set(filterCategoriesType)].reverse();
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            filterCategoriesType: uniquefilterCategoriesType,
          });
        });
      })
    );
  }

  @Action(GetFiltersCategoriesName)
  getFiltersCategoriesName(ctx: StateContext<AppStateModel>, action: GetFiltersCategoriesName) {
    return this.appService.getData().pipe(
      tap((response) => {
        const licenseCategoryName: any = [];
        const deploymentSubeCategories: any = [];
        const industryCategoryName: any = [];
        response.data.forEach((filter) => {
          filter['filters'].forEach((filterType: any) => {
            if (filterType.type === 'license') {
              licenseCategoryName.push(filterType.name);
            }
            if (filterType.type === 'deployment') {
              deploymentSubeCategories.push(filterType.name);
            }
            if (filterType.type === 'industry') {
              industryCategoryName.push(filterType.name);
            }
          });
          const uniquelicenseCategoryName = [...new Set(licenseCategoryName)];
          const uniqueDeploymentSubeCategories = [...new Set(deploymentSubeCategories)];
          const uniqueindustryCategoryName = [...new Set(industryCategoryName)];
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            licenseCategoryName: uniquelicenseCategoryName,
            deploymentCategoryName: uniqueDeploymentSubeCategories,
            industryCategoryName: uniqueindustryCategoryName,
          });
        });
      })
    );
  }

  @Action(SortListItems)
  sortListItems(ctx: StateContext<AppStateModel>, action: SortListItems) {
    const state = ctx.getState();
    if (action.sortType == 'name') {
      const sortByName = state.listItems;
      console.log(sortByName);

      ctx.patchState({
        ...state,
        listItems: sortByName
          .slice()
          .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
      });
    }
    if (action.sortType == 'reviews') {
      const sortByReview = state.listItems;
      ctx.patchState({
        ...state,
        listItems: sortByReview.slice().sort((a, b) => b.no_of_reviews - a.no_of_reviews),
      });
    }
  }

  @Action(SetSelectedFilters)
  setSelectedFilters(ctx: StateContext<AppStateModel>, { filterSelected }: SetSelectedFilters) {
    const state = ctx.getState();

    ctx.patchState({
      ...state,
      selectedFilteredItems: filterSelected,
      showFilterChips: true,
    });

    ctx.dispatch(new SetResultList());
  }

  @Action(SetResultList)
  setResultList(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    const { initialListItems, selectedFilteredItems } = state;

    const filteredListItems = this.filterList(initialListItems, selectedFilteredItems);

    ctx.patchState({
      ...state,
      listItems: filteredListItems,
      totalItems: filteredListItems.length,
    });
  }

  @Action(SetFilterChipStatus)
  setFilterChipStatus(ctx: StateContext<AppStateModel>, { showFilterChips }: SetFilterChipStatus) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      showFilterChips,
    });
  }

  @Action(DeleteAllFilters)
  deleteAllFilters(ctx: StateContext<AppStateModel>, action: DeleteAllFilters) {
    const state = ctx.getState();

    ctx.patchState({
      ...state,
      selectedFilteredItems: [],
      showFilterChips: false,
    });
  }

  ngxsAfterBootstrap(ctx: StateContext<AppStateModel>) {
    console.log('The application has been fully rendered');
    ctx.dispatch(new GetListItems());
    ctx.dispatch(new GetFilterCategoriesType());
    ctx.dispatch(new GetFiltersCategoriesName());
  }

  private filterList(items: any, filters: any): ListItems[] {
    const filteredResults = items.filter((item: any) => {
      let itemFilters = item.filters.map((item: any) => item.name);

      if (filters.every((filter: any) => itemFilters.includes(filter))) {
        return item;
      }
    });

    return filteredResults;
  }
}
