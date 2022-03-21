import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListItems } from 'src/app/models/listItems.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  @Select(AppState.listItems) listItems$: Observable<ListItems[]>;
  data: ListItems[] = [];

  constructor() {}
}
