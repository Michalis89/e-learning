import { Component, Input } from '@angular/core';
import { ListItems } from 'src/app/models/listItems.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent {
  @Input() listItems: ListItems;
  isIconHovered = false;

  constructor() {}
  mouseEnter() {
    this.isIconHovered = true;
  }
  mouseLeave() {
    this.isIconHovered = false;
  }
}
