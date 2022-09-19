import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormTemplate } from '../models/form-template.model';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { ReturnUrlType } from 'src/api-authorization/api-authorization.constants';
@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  private readonly url="/Department/FormTemplate";

  constructor(private httpClient:HttpClient) { }

  public createFormTemplate(formTemplate:FormTemplate):Observable<FormTemplate>
  {
    return this.httpClient.post<FormTemplate>(`${environment.apiUrl}/${this.url}`,formTemplate);
  }
  public getFormTemplateById(id:Guid):Observable<FormTemplate>
  {
    return this.httpClient.get<FormTemplate>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  // public getFormTemplates(id:Guid):Observable<FormTemplate[]>
  // {
  //   return this.httpClient.get<FormTemplate[]>(`${environment.apiUrl}/${this.url}`);
  // }
  public getFormTemplates():Observable<FormTemplate[]>
  {
    return this.httpClient.get<FormTemplate[]>(`${environment.apiUrl}/${this.url}`);
  }
  public deleteFormTemplate(id:Guid):Observable<FormTemplate>
  {
    return this.httpClient.delete<FormTemplate>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public updateFormTemplate(id:Guid,formTemplate:FormTemplate):Observable<FormTemplate>
  {
    return this.httpClient.put<FormTemplate>(`${environment.apiUrl}/${this.url}/${id}`,formTemplate);
  }
}
