import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';

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
   public getProjectById(id: string): Observable<Project>
   {
     return this.httpClient.get<Project>(`${environment.apiUrl}/${this.url}/${id}`);
   }
   public createProject(project:Project): Observable<Project>
   {
      let newProject  = {
          id: project.id,
          name: project.name,  
          description: project.description
      };
      return this.httpClient.post<Project>(`${environment.apiUrl}/${this.url}`,newProject);
   }
 
 
   public updateProject(project:Project, id: string): Observable<Project>
   {
       let updatedProject  = {
           id: project.id,
           name: project.name,   
           description: project.description 
       };
       return this.httpClient.put<Project>(`${environment.apiUrl}/${this.url}/${id}`, updatedProject);
   }
 
   public deleteProject(id: string): Observable<any>
   {
     return this.httpClient.delete(`${environment.apiUrl}/${this.url}/${id}`);
   }
}
