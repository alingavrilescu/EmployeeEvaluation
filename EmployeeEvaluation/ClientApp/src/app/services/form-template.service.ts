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

  private readonly url = "FormTemplate";
  private readonly urlFormSection = "FormTemplate/FormTemplateSection";
  private readonly urlFormCriteria = "FormTemplate/FormTemplateSection/FormTemplateCriteria";

  constructor(private httpClient: HttpClient) { }

  public getFormTemplateById(departmentId:Guid,id: Guid): Observable<FormTemplate> {
    return this.httpClient.get<FormTemplate>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${id}`);
  }
  public getFormTemplates(departmentId: Guid): Observable<FormTemplate[]> {
    return this.httpClient.get<FormTemplate[]>(`${environment.apiUrl}/Department/${departmentId}/${this.url}`);
  }
  public postFormTemplate(departmentId:Guid,formTemplate:FormTemplate){
    return this.httpClient.post<FormTemplate[]>(`${environment.apiUrl}/Department/${departmentId}/${this.url}`,formTemplate);
  } 
  public deleteFormTemplate(departmentId:Guid,id: Guid): Observable<FormTemplate> {
    return this.httpClient.delete<FormTemplate>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${id}`);
  }
  public updateFormTemplate(departmentId: Guid, id: Guid, formTemplate: FormTemplate): Observable<FormTemplate> {
    return this.httpClient.put<FormTemplate>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${id}`, formTemplate);
  }


  public getTemplateSectionById(departmentId: Guid, formTemplateId: Guid, id: Guid): Observable<FormTemplateSection> {
    return this.httpClient.get<FormTemplateSection>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${formTemplateId}/FormTemplateSection/${id}`);
  }
  public getSections(departmentId:Guid, formTemplateId:Guid):Observable<FormTemplateSection[]>
  {
    return this.httpClient.get<FormTemplateSection[]>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${formTemplateId}/FormTemplateSection`);
  }
  public postTemplateSection(departmentId: Guid, formTemplateId: Guid, formTemplateSection: FormTemplateSection): Observable<FormTemplateSection> {
    return this.httpClient.post<FormTemplateSection>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${formTemplateId}/FormTemplateSection`, formTemplateSection);
  }
  public putTemplateSection(departmentId: Guid, formTemplateId: Guid,id: Guid, formTemplateSection: FormTemplateSection): Observable<FormTemplate> {
    return this.httpClient.put<FormTemplate>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${formTemplateId}/FormTemplateSection/${id}`, formTemplateSection);
  }
  public deleteSection(departmentId: Guid, formTemplateId: Guid,id: Guid): Observable<FormTemplateSection> {
    return this.httpClient.delete<FormTemplateSection>(`${environment.apiUrl}/Department/${departmentId}/${this.url}/${formTemplateId}/FormTemplateSection/${id}`);
  }


  public getCriteriaById(departmentId: Guid, formTemplateId:Guid,formSectionId:Guid,id: Guid): Observable<FormTemplateCriteria> {
    return this.httpClient.get<FormTemplateCriteria>(`${environment.apiUrl}/Department/${departmentId}/${formTemplateId}/FormTemplateSection/${formSectionId}/FormTemplateCriteria/${this.url}/${id}`);
  }
  public getCriteria(departmentId: Guid, formTemplateId:Guid,formSectionId:Guid): Observable<FormTemplateCriteria[]> {
    return this.httpClient.get<FormTemplateCriteria[]>(`${environment.apiUrl}/Department/${departmentId}/${formTemplateId}/FormTemplateSection/${formSectionId}/FormTemplateCriteria/${this.url}`);
  }
  public postFormTemplateSection(departmentId: Guid, formTemplateId:Guid,formSectionId:Guid,formTemplateCriteria: FormTemplateCriteria): Observable<FormTemplateCriteria> {
    return this.httpClient.post<FormTemplateCriteria>(`${environment.apiUrl}/Department/${departmentId}/${formTemplateId}/FormTemplateSection/${formSectionId}/FormTemplateCriteria/${this.url}`, formTemplateCriteria);
  }
  public putFormTemplateSection(departmentId: Guid, formTemplateId:Guid,formSectionId:Guid,id: Guid, formTemplateCriteria: FormTemplateCriteria): Observable<FormTemplateCriteria> {
    return this.httpClient.put<FormTemplateCriteria>(`${environment.apiUrl}/Department/${departmentId}/${formTemplateId}/FormTemplateSection/${formSectionId}/FormTemplateCriteria/${this.url}/${id}`, formTemplateCriteria);
  }
  public deleteCriteria(departmentId:Guid, formTemplateId:Guid, formSectionId:Guid,id: Guid): Observable<FormTemplateCriteria> {
    return this.httpClient.delete<FormTemplateCriteria>(`${environment.apiUrl}/Department/${departmentId}/${formTemplateId}/FormTemplateSection/${formSectionId}/FormTemplateCriteria/${this.url}/${id}`);
  }
}