import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormTemplate } from '../models/form-template.model';
import { FormTemplateSection } from '../models/form-template-section.model';
import { FormTemplateCriteria } from '../models/form-template-criteria.model';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { ReturnUrlType } from 'src/api-authorization/api-authorization.constants';
@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  private readonly url="/Department/FormTemplate";
  private readonly urlFormSection = "Departament/FormTemplate/FormTemplateSection";
  private readonly urlFormCriteria = "Departament/FormTemplate/FormTemplateSection/FormTemplateCriteria";

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
  //for section
  public GetTemplateSectionById(id:Guid):Observable<FormTemplateSection>
  {
    return this.httpClient.get<FormTemplateSection>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public PostTemplateSection(formTemplateSection:FormTemplateSection):Observable<FormTemplateSection>
  {
    return this.httpClient.post<FormTemplateSection>(`${environment.apiUrl}/${this.url}`, formTemplateSection);
  }
  public PutTemplateSection(id:Guid,formTemplateSection:FormTemplateSection):Observable<FormTemplate>
  {
    return this.httpClient.put<FormTemplate>(`${environment.apiUrl}/${this.url}`,formTemplateSection);
  }
  public DeleteSection(id:Guid):Observable<FormTemplateSection>
  {
    return this.httpClient.delete<FormTemplateSection>(`${environment.apiUrl}/${this.url}/${id}`);
  }

//for criteria
public GetCriteriaById(id:Guid):Observable<FormTemplateCriteria>
{
  return this.httpClient.get<FormTemplateCriteria>(`${environment.apiUrl}/${this.url}/${id}`);
}
public PostFormTemplate(formTemplateCriteria:FormTemplateCriteria):Observable<FormTemplateCriteria>
{
  return this.httpClient.post<FormTemplateCriteria>(`${environment.apiUrl}/${this.url}`, formTemplateCriteria);
}
public PutFormTemplate(id:Guid,formTemplateCriteria:FormTemplateCriteria):Observable<FormTemplateCriteria>
{
  return this.httpClient.put<FormTemplateCriteria>(`${environment.apiUrl}/${this.url}`,formTemplateCriteria);
}
public DeleteCriteria(id:Guid):Observable<FormTemplateCriteria>
{
  return this.httpClient.delete<FormTemplateCriteria>(`${environment.apiUrl}/${this.url}/${id}`);
}
}