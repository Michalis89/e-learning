import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListItemsDTO } from './models/listItemsDTO.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData(sortType?: string): Observable<ListItemsDTO> {
    return this.http.get<ListItemsDTO>(`${environment.baseURL}`);
  }
}
