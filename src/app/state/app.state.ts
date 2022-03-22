import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsAfterBootstrap } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  FilterStatus,
  GetFilteredList,
  GetFiltersCategories,
  GetFiltersSubCategories,
  GetListItems,
  SortListItems,
} from './app.actions';
import { AppService } from '../app.service';
import { ListItems } from '../models/listItems.model';

export interface AppStateModel {
  listItems: ListItems[];
  totalItems: number;
  filterCategories: any;
  licenseSubCategories: any;
  deploymentSubCategories: any;
  industrySubCategories: any;
  nameSortItems: any;
  selectedFilters: any;
  filterStatus: boolean;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    listItems: [],
    totalItems: 0,
    filterCategories: [],
    licenseSubCategories: [],
    deploymentSubCategories: [],
    industrySubCategories: [],
    nameSortItems: [],
    selectedFilters: [],
    filterStatus: false,
  },
})
@Injectable()
export class AppState implements NgxsAfterBootstrap {
  constructor(private appService: AppService) {}

  @Selector()
  static listItems(state: AppStateModel): ListItems[] {
    return state.listItems;
  }

  @Selector()
  static totalItems(state: AppStateModel) {
    return state.totalItems;
  }

  @Selector()
  static filterCategories(state: AppStateModel) {
    return state.filterCategories;
  }

  @Selector()
  static licenseSubCategories(state: AppStateModel) {
    return state.licenseSubCategories;
  }
  @Selector()
  static deploymentSubCategories(state: AppStateModel) {
    return state.deploymentSubCategories;
  }
  @Selector()
  static industrySubCategories(state: AppStateModel) {
    return state.industrySubCategories;
  }
  @Selector()
  static selectedFilters(state: AppStateModel) {
    return state.selectedFilters;
  }
  @Selector()
  static filterStatus(state: AppStateModel) {
    return state.filterStatus;
  }

  @Action(GetListItems)
  getListItems(ctx: StateContext<AppStateModel>, action: GetListItems) {
    return this.appService.getData().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          listItems: response.data,
          totalItems: response['total'],
        });
      })
    );
  }

  @Action(GetFiltersCategories)
  getFiltersCategories(ctx: StateContext<AppStateModel>, action: GetFiltersCategories) {
    return this.appService.getData().pipe(
      tap((response) => {
        const filterTypeCategories: any = [];
        response.data.forEach((filter) => {
          filter['filters'].forEach((filterType: any) => {
            filterTypeCategories.push(filterType.type);
          });
          const uniquefilterTypeCategories = [...new Set(filterTypeCategories)].reverse();
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            filterCategories: uniquefilterTypeCategories,
          });
        });
      })
    );
  }

  @Action(GetFiltersSubCategories)
  getFiltersSubCategories(ctx: StateContext<AppStateModel>, action: GetFiltersSubCategories) {
    return this.appService.getData().pipe(
      tap((response) => {
        const licenseSubCategories: any = [];
        const deploymentSubeCategories: any = [];
        const industrySubCategories: any = [];
        response.data.forEach((filter) => {
          filter['filters'].forEach((filterType: any) => {
            if (filterType.type === 'license') {
              licenseSubCategories.push(filterType.name);
            }
            if (filterType.type === 'deployment') {
              deploymentSubeCategories.push(filterType.name);
            }
            if (filterType.type === 'industry') {
              industrySubCategories.push(filterType.name);
            }
          });
          const uniqueLicenseSubCategories = [...new Set(licenseSubCategories)];
          const uniqueDeploymentSubeCategories = [...new Set(deploymentSubeCategories)];
          const uniqueIndustrySubCategories = [...new Set(industrySubCategories)];
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            licenseSubCategories: uniqueLicenseSubCategories,
            deploymentSubCategories: uniqueDeploymentSubeCategories,
            industrySubCategories: uniqueIndustrySubCategories,
          });
        });
      })
    );
  }

  @Action(SortListItems)
  sortListItems(ctx: StateContext<AppStateModel>, action: SortListItems) {
    if (action.sortType == 'name') {
      const state = ctx.getState();
      const sortByName = state.listItems;
      ctx.patchState({
        ...state,
        listItems: sortByName.slice().sort((a, b) => (a.name > b.name ? 1 : -1)),
      });
    }
    if (action.sortType == 'reviews') {
      const state = ctx.getState();
      const sortByReview = state.listItems;
      ctx.patchState({
        ...state,
        listItems: sortByReview.slice().sort((a, b) => b.no_of_reviews - a.no_of_reviews),
      });
    }
  }

  @Action(GetFilteredList)
  getFIlteredList(ctx: StateContext<AppStateModel>, action: GetFilteredList) {
    const state = ctx.getState();
    let selectedFilters = [];
    selectedFilters.push(action.filterSelected);
    let newSelectedFilters = selectedFilters.map((item) => {
      return Object.assign({}, item);
    });
    ctx.patchState({
      ...state,
      selectedFilters: newSelectedFilters,
      filterStatus: true,
    });
  }

  @Action(FilterStatus)
  filterStatus(ctx: StateContext<AppStateModel>, action: FilterStatus) {
    const filterStatus = ctx.getState().filterStatus;
    ctx.patchState({
      filterStatus: !filterStatus,
    });
  }

  ngxsAfterBootstrap(ctx: StateContext<AppStateModel>) {
    console.log('The application has been fully rendered');
    ctx.dispatch(new GetListItems());
    ctx.dispatch(new GetFiltersCategories());
    ctx.dispatch(new GetFiltersSubCategories());
  }
}
