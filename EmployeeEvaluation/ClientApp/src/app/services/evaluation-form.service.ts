import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EvaluationForm } from '../models/evaluation-form.model';
import { FormSection } from 'src/app/models/form-section.model';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { Guid } from 'guid-typescript';
import { CriteriaComments } from '../models/criteria-comments.model';



@Injectable({
  providedIn: 'root'
})
export class EvaluationFormService {
  private readonly url = "Users/EvaluationForm";
  private readonly urlFormSection = "Users/EvaluationForm/FormSection";
  private readonly urlFormCriteria = "Users/EvaluationForm/FormSection/FormCriteria";
  private readonly urlCriteriaComments = "Users/EvaluationForm/FormSection/FormCriteria/CriteriaComments";

  constructor(private httpClient: HttpClient) { }

  public getEvaluationForms(id: Guid): Observable<EvaluationForm> {
    return this.httpClient.get<EvaluationForm>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public createEvaluationForm(evaluationForm: EvaluationForm): Observable<EvaluationForm> {
    return this.httpClient.post<EvaluationForm>(`${environment.apiUrl}/${this.url}`, evaluationForm);
  }

  public getFormSections(): Observable<FormSection[]> {
    return this.httpClient.get<FormSection[]>(`${environment.apiUrl}/${this.urlFormSection}`);
  }

  public getFormCriterias(): Observable<FormCriteria[]> {
    return this.httpClient.get<FormCriteria[]>(`${environment.apiUrl}/${this.urlFormCriteria}`);
  }
  public getCriteriaComments(): Observable<CriteriaComments[]> {
    return this.httpClient.get<CriteriaComments[]>(`${environment.apiUrl}/${this.urlCriteriaComments}`);
  }
}
