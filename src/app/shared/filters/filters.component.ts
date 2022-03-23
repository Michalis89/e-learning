import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import {
  SetFilterChipStatus,
  GetListItems,
  SetSelectedFilters,
  SortListItems,
  DeleteAllFilters,
} from 'src/app/state/app.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Select(AppState.totalItems) totalItems$: Observable<number>;
  @Select(AppState.filterCategoriesType) filterCategoriesType$: Observable<any>;
  @Select(AppState.licenseCategoryName) licenseCategoryName$: Observable<any>;
  @Select(AppState.deploymentCategoryName) deploymentCategoryName$: Observable<any>;
  @Select(AppState.industryCategoryName) industryCategoryName$: Observable<any>;
  @Select(AppState.selectedFilteredItems) selectedFilteredItems$: Observable<any>;
  @Select(AppState.showFilterChips) showFilterChips$: Observable<boolean>;
  sortedBy = 'Feature';
  sortedOption = ['name', 'reviews'];
  selectedFilters: any = [];
  Object = Object;
  selectedFilteredItems: any;
  updatedFilterList: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedFilteredItems$.subscribe((filters) => {
      this.selectedFilteredItems = filters;
    });
  }

  selectFilter(selected: string) {
    this.selectedFilters.push(selected);
    this.store.dispatch(new SetSelectedFilters([...new Set(this.selectedFilters)]));
  }

  changeSorting(sortType: string) {
    this.sortedBy = sortType;
    this.store.dispatch(new SortListItems(sortType));
  }

  removeFilter(filter: string) {
    const index = this.selectedFilteredItems.indexOf(filter);
    this.updatedFilterList = [...this.selectedFilteredItems];
    this.updatedFilterList.splice(index, 1);
    this.store.dispatch(new SetSelectedFilters(this.updatedFilterList));
    if (this.selectedFilteredItems.length === 0) {
      this.clearFilters();
    }
  }

  clearFilters() {
    this.selectedFilters = [];
    this.sortedBy = 'Feature';
    this.store.dispatch(new DeleteAllFilters());
    this.store.dispatch(new GetListItems());
  }
}
