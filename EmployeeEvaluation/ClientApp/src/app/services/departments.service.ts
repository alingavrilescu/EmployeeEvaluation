import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  apiBase: string;
  constructor(private httpClient: HttpClient) {
    this.apiBase = environment.apiBase;
  }
  public getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.apiBase + 'api/Departments');
  }
  public deleteDepartment(id: string): Observable<Department> {
    return this.httpClient.delete<Department>(
      this.apiBase + 'api/Departments/' + id
    );
  }
  public addDepartment(newDepartment: Department): Observable<Department> {
    return this.httpClient.post<Department>(
      this.apiBase + 'api/Departments',
      newDepartment
    );
  }
  public editDepartment(
    id: string,
    newDepartment: Department
  ): Observable<Department> {
    return this.httpClient.put<Department>(
      this.apiBase + 'api/Departments' + id,
      newDepartment
    );
  }
}
