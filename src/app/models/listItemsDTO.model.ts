import { ListItems, Filters } from './listItems.model';

interface PaginationDTO {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ListItemsDTO {
  pagination: PaginationDTO;
  data: ListItems[];
  filters: Filters[];
}
