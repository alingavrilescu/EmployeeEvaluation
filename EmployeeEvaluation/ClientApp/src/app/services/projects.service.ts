import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly url = "Project";

  constructor(private httpClient:HttpClient) { }
   public getProjects(): Observable<Project[]>
   {
      return this.httpClient.get<Project[]>(`${environment.apiUrl}/${this.url}`);
   }

   public getProjectsFromDep(depId:Guid): Observable<Project[]>
   {
      return this.httpClient.get<Project[]>(`${environment.apiUrl}/${this.url}/department/${depId}`);
   }

   public getProjectById(id: Guid): Observable<Project>
   {
      return this.httpClient.get<Project>(`${environment.apiUrl}/${this.url}/${id}`);
   }

   public addUsersToProject(id:Guid, usersIds:Guid[]): Observable<Project>
   {
      return this.httpClient.post<Project>(`${environment.apiUrl}/${this.url}/${id}/add-users`, usersIds);
   }

   public removeUserFromProject(id:Guid, userId:Guid): Observable<Project>
  {
    return  this.httpClient.delete<Project>(`${environment.apiUrl}/${this.url}/${id}/${userId}`);
  }

   public createProject(project:Project): Observable<Project>
   {
      return this.httpClient.post<Project>(`${environment.apiUrl}/${this.url}`,project);
   }
 
   public updateProject(id: Guid,project:Project): Observable<Project>
   {
       return this.httpClient.put<Project>(`${environment.apiUrl}/${this.url}/${id}`, project);
   }
 
   public deleteProject(id: Guid): Observable<Project>
   {
     return this.httpClient.delete<Project>(`${environment.apiUrl}/${this.url}/${id}`);
   }
}
