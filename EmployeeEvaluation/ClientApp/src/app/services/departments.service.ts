import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private readonly url = "Department";

  constructor(private httpClient: HttpClient) {
  }
  public getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${environment.apiUrl}/${this.url}`);
  }
  
  public getDepartmentById(id: Guid): Observable<Department>
  {
    return this.httpClient.get<Department>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addDepartment(newDepartment: Department): Observable<Department> {
    return this.httpClient.post<Department>(`${environment.apiUrl}/${this.url}`, newDepartment);
  }
  public editDepartment(id: string, newDepartment: Department): Observable<Department> {
    return this.httpClient.put<Department>(`${environment.apiUrl}/${this.url}/${id}`,newDepartment
    );
  }
  public deleteDepartment(id: string): Observable<Department> {
    return this.httpClient.delete<Department>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
