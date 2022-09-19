import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import { FormSection } from 'src/app/models/form-section.model';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { CriteriaComments } from 'src/app/models/criteria-comments.model';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
})
export class EvaluationFormComponent implements OnInit, OnDestroy {
  constructor(private evaluationFormService: EvaluationFormService) {}

  deleteSubscription!: Subscription;

  evaluationFormList: EvaluationForm[] = [];
  formSectionList: FormSection[] = [];
  formCriteriaList: FormCriteria[] = [];
  criteriaCommentsList: CriteriaComments[] = [];

  evaluationFormName = "";
  evaluationFormType = "";

  ngOnInit(): void {
    this.refreshEvaluationFormList();
    this.refreshFormSectionList();
    this.refreshFormCriteriaList();
    this.refreshCriteriaComments();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

  refreshEvaluationFormList() {
    this.evaluationFormService.getEvaluationForms().subscribe(data => {
      this.evaluationFormList = data;
    })
  }

  refreshFormSectionList() {
    this.evaluationFormService.getFormSections().subscribe(data => {
      this.formSectionList = data;
    })
  }

  refreshFormCriteriaList() {
    this.evaluationFormService.getFormCriterias().subscribe(data => {
      this.formCriteriaList = data;
    })
  }

  refreshCriteriaComments() {
    this.evaluationFormService.getCriteriaComments().subscribe(data => {
      this.criteriaCommentsList = data;
    })
  }

  addEvaluationForm() {
    var temp = {
      name: this.evaluationFormName,
      type: this.evaluationFormType
    };
    this.evaluationFormService.createEvaluationForm(temp).subscribe(() => { this.refreshEvaluationFormList(); });
  }
}
