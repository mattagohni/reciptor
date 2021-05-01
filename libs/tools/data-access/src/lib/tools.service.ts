import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tool} from '@reciptor/tools/data-access';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {
  }

  getTool(id: number | string): Observable<Tool> {
    return this.httpClient.get<Tool>(`${this.API_URL}/tools/${id}`)
  }

  getAll(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.API_URL}/tools`)
  }

  deleteTool(id: number | string) {
    return this.httpClient.delete(`${this.API_URL}/tools/${id}`)
  }

  updateTool(tool: Tool) {
    return this.httpClient.put(`${this.API_URL}/tools/${tool.id}`, tool);
  }

  saveTool(tool: Tool) {
    return this.httpClient.post(`${this.API_URL}/tools`, tool);
  }
}
