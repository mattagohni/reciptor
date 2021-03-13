import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tool} from '@reciptor/tools/data-access';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  getTool(id: number): Observable<Tool> {
    return this.httpClient.get<Tool>(`${this.API_URL}/tools/${id}`)
  }

  getAll(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.API_URL}/tools`)
  }
}
