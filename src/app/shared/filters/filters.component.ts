import { Select, Store } from '@ngxs/store';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import {
  SetFilterStatus,
  GetListItems,
  SetFilteredList,
  SortListItems,
} from 'src/app/state/app.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Select(AppState.totalItems) totalItems$: Observable<number>;
  @Select(AppState.filterCategories) filterCategories$: Observable<any>;
  @Select(AppState.licenseSubCategories) licenseSubCategories$: Observable<any>;
  @Select(AppState.deploymentSubCategories) deploymentSubCategories$: Observable<any>;
  @Select(AppState.industrySubCategories) industrySubCategories$: Observable<any>;
  @Select(AppState.selectedFilters) selectedFilters$: Observable<any>;
  @Select(AppState.filterStatus) filterStatus$: Observable<boolean>;
  sortedBy = 'Default';
  sortedOption = ['default', 'name', 'reviews'];
  selected: any = [];
  uniqueSelectedArray: any = [];
  Object = Object;

  constructor(private store: Store) {}

  selectFilter(selected: string) {
    this.store.dispatch(new SetFilteredList(selected));
  }

  changeSorting(sortType: string) {
    this.sortedBy = sortType;
    this.store.dispatch(new SortListItems(sortType));
    if (this.sortedBy === 'default') {
      this.store.dispatch(new GetListItems());
    }
  }

  removeFilter(chipFilterValue: any) {
    const index = this.uniqueSelectedArray.indexOf(chipFilterValue);
    if (index > -1) {
      this.uniqueSelectedArray.splice(index, 1);
      this.selected.splice(index, 1);
    }
    if (this.uniqueSelectedArray.length === 0) {
      this.store.dispatch(new SetFilterStatus(false));
      this.store.dispatch(new GetListItems());
    }
  }

  clearFilters() {
    this.selected = [];
    this.uniqueSelectedArray = [];
    this.store.dispatch(new SetFilterStatus(false));
    this.store.dispatch(new GetListItems());
  }
}
