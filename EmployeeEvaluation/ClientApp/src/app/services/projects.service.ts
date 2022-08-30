import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiBase: string;
  constructor(private httpClient:HttpClient) {
    this.apiBase = environment.apiBase;
   }
   public getProjects(): Observable<Project[]>
   {
       let apiUrl = `${this.apiBase}projects`;
       return this.httpClient.get<Project[]>(apiUrl);
   }
   public createProject(project:Project): Observable<Project>
   {
     let apiUrl = `${this.apiBase}projects`;
       let newProject  = {
           id: project.id,
           name: project.name,  
       };
       return this.httpClient.post<Project>(apiUrl,newProject);
   }
 
   public getProjectById(id: string): Observable<Project>
   {
     let apiUrl = `${this.apiBase}projects/${id}`;
     return this.httpClient.get<Project>(apiUrl);
   }
 
   public updateProject(project:Project): Observable<Project>
   {
     let apiUrl = `${this.apiBase}projects/${project.id}`;
       let updatedProject  = {
           id: project.id,
           name: project.name,     
       };
       return this.httpClient.put<Project>(apiUrl, updatedProject);
   }
 
   public deleteProject(id: string): Observable<any>
   {
     let apiUrl = `${this.apiBase}projects/${id}`;
     return this.httpClient.delete(apiUrl);
   }
}
