import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EvaluationForm } from '../models/evaluation-form.model';
import { FormSection } from 'src/app/models/form-section.model';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { Guid } from 'guid-typescript';
import {CriteriaReview } from '../models/criteria-review.model';



@Injectable({
  providedIn: 'root'
})
export class EvaluationFormService {
  private readonly url = "Users/EvaluationForm";

  constructor(private httpClient: HttpClient) { }

  public getEvaluationForms(id: Guid): Observable<EvaluationForm> {
    return this.httpClient.get<EvaluationForm>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public createEvaluationForm(id: Guid, evaluationForm: EvaluationForm): Observable<EvaluationForm> {
    return this.httpClient.post<EvaluationForm>(`${environment.apiUrl}/${this.url}/${id}`, evaluationForm);
  }

  public createCriteriaReview(id: Guid, criteriaReview: CriteriaReview): Observable<EvaluationForm> {
    return this.httpClient.post<EvaluationForm>(`${environment.apiUrl}/${this.url}/${id}/CriteriaReview`, criteriaReview);
  }
}
