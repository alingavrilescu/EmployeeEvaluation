import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = 'Users';
  constructor(private httpClient: HttpClient) {}
  public getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getUserById(id: Guid): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }

  public getUsersOfDepartment(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}`);
  }

  public getUsersOfProject(proId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/project/${proId}`);
  }

  public getUsersWithoutDepartment(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/without-department`);
  }

  public getUsersWithoutProject(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/without-project/department/${depId}`);
  }

  public getDevsOfDep(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/developers`);
  }

  public getProjectManagersOfDep(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/project-managers`);
  }

  public getTeamLeadsOfDep(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/team-leads`);
  }

  public getPMWithoutProj(depId: Guid, proId:Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/${proId}/project-managers/without-project`);
  }

  public getTLForEdit(depId: Guid, proId:Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/${proId}/team-leads/without-project`);
  }

  public getTLWithoutProj(depId: Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/department/${depId}/team-leads/without-project`);
  }

  public getHODepWithoutDep(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/head-of-dep`);
  }

  public getHODep(depId:Guid): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}/${depId}/head-of-dep`);
  }

  public addUser(newUser: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${environment.apiUrl}/${this.url}`,newUser);
  }
  public editUser(id: Guid, userToEdit: UserDTO): Observable<UserDTO> {
    return this.httpClient.put<UserDTO>(
      `${environment.apiUrl}/${this.url}/${id}`,
      userToEdit
    );
  }
  public deleteUser(id: Guid): Observable<UserDTO> {
    return this.httpClient.delete<UserDTO>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }

  
}
