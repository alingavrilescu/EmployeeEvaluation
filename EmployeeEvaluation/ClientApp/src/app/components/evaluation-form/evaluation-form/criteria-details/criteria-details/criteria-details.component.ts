import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { EvaluationFormService } from '../../../../../services/evaluation-form.service';
import { FormCriteria } from '../../../../../models/form-criteria.model';


@Component({
  selector: 'app-criteria-details',
  templateUrl: './criteria-details.component.html',
  styleUrls: ['./criteria-details.component.css']
})
export class CriteriaDetailsComponent implements OnInit {

  formCriteria!: Observable<FormCriteria>;
  formCriteriaId: any;
  formCriteriaSubscription!: Subscription;
  evaluationFormId: any;
  displayAddCommModal: boolean = false;

  addCommForm = new FormGroup({
    name: new FormControl(''),
    choice: new FormControl(''),
    description: new FormControl(''),
    criteriaComment: new FormControl(''),
    criteriaAttachment: new FormControl('')
  });

  constructor(private activatedRoute: ActivatedRoute, private formEvalService: EvaluationFormService)
   { 
    this.activatedRoute.paramMap.subscribe((params) => {
      this.evaluationFormId = params.get('formId');
      this.formCriteriaId = params.get('id');
    });
   }

  ngOnInit(): void {
    this.getFormCriteriaById();
  }

  addComm() {
    var existingFormCriteria = {
      name: this.addCommForm.controls.name.value!,
      choice: this.addCommForm.controls.choice.value!,
      description: this.addCommForm.controls.description.value!,
      criteriaComment: this.addCommForm.controls.criteriaComment.value!,
      criteriaAttachment: this.addCommForm.controls.criteriaAttachment.value!
    }
    this.formCriteriaSubscription = this.formEvalService.updateFormCriteria(this.formCriteriaId, existingFormCriteria).subscribe(()=>{
    })
  }

  getFormCriteriaById() {
    this.formCriteria = this.formEvalService.getFormCriteriaById(this.evaluationFormId, this.formCriteriaId);
  }

  showAddCommDialog(formCriteria: FormCriteria) {
    this.displayAddCommModal = true;
    if (formCriteria.id) {
      this.formCriteriaId = formCriteria.id
    }
  }

  hideAddCommDialog() {
    this.displayAddCommModal = false;
  }
}