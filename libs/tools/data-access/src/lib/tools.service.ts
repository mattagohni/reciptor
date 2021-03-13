import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToolsEntity} from '@reciptor/tools/data-access';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  getTool(id: number): Observable<ToolsEntity> {
    return this.httpClient.get<ToolsEntity>(`${this.API_URL}/tools/${id}`)
  }

  getAll(): Observable<ToolsEntity[]> {
    return this.httpClient.get<ToolsEntity[]>(`${this.API_URL}/tools`)
  }
}
