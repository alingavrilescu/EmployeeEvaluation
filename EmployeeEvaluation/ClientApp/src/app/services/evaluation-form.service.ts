import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EvaluationForm } from '../models/evaluation-form.model';
import { Guid } from 'guid-typescript';


@Injectable({
  providedIn: 'root'
})
export class EvaluationFormService {
  private readonly url = "Users/EvaluationForm";

  constructor(private httpClient: HttpClient) { }

  public getEvaluationForms(): Observable<EvaluationForm[]>
   {
       return this.httpClient.get<EvaluationForm[]>(`${environment.apiUrl}/${this.url}`);
   }

  public createEvaluationForm(evaluationForm:EvaluationForm): Observable<EvaluationForm>
   {
      return this.httpClient.post<EvaluationForm>(`${environment.apiUrl}/${this.url}`,evaluationForm);
   }
}
