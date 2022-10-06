import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EvaluationForm } from '../models/evaluation-form.model';
import { FormSection } from 'src/app/models/form-section.model';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { Guid } from 'guid-typescript';
import { CriteriaReview } from '../models/criteria-review.model';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EvaluationFormService {
  private readonly url = 'Users/EvaluationForm';

  constructor(private httpClient: HttpClient) {}

  public getEvaluationForms(id: Guid): Observable<EvaluationForm> {
    return this.httpClient.get<EvaluationForm>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }
  public getFormCriteriaById(id: Guid, criteriaId: Guid): Observable<FormCriteria> {
    return this.httpClient.get<FormCriteria>(`${environment.apiUrl}/${this.url}/${id}/criteria-details/${criteriaId}`)
  }

  public createEvaluationForm(
    id: Guid,
    templateId: Guid
  ): Observable<EvaluationForm> {
    return this.httpClient.post<EvaluationForm>(
      `${environment.apiUrl}/${this.url}/${id}`,
      templateId
    );
  }

  public createCriteriaReview(
    id: Guid,
    criteriaReview: CriteriaReview
  ): Observable<EvaluationForm> {
    return this.httpClient.post<EvaluationForm>(
      `${environment.apiUrl}/${this.url}/${id}/CriteriaReview`,
      criteriaReview
    );
  }
  public updateFormCriteria(
    id: Guid,
    formCriteria: FormCriteria
  ): Observable<EvaluationForm> {
    return this.httpClient.put<EvaluationForm>(
      `${environment.apiUrl}/${this.url}/${id}/FormCriteria`,
      formCriteria
    );
  }
}
