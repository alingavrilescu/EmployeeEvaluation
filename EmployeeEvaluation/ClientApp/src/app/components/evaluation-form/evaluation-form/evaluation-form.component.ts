import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import { ActivatedRoute } from '@angular/router';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { CriteriaReview } from 'src/app/models/criteria-review.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
})
export class EvaluationFormComponent implements OnInit, OnDestroy {

  addCommForm = new FormGroup({
    name: new FormControl(''),
    choice: new FormControl(''),
    description: new FormControl(''),
    criteriaComment: new FormControl(''),
    criteriaAttachment: new FormControl('')
  });

  addRevForm = new FormGroup({
    review: new FormControl('', Validators.required)
  })

  constructor(private evaluationFormService: EvaluationFormService, private activatedRoute: ActivatedRoute) { }


  displayAddCommModal: boolean = false;
  displayAddRevModal: boolean = false;
  deleteSubscription!: Subscription;
  evaluationForm!: Observable<EvaluationForm>;
  formCriteria!: FormCriteria;
  formCriteriaSubscription!: Subscription;
  userId: any;
  criteriaId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.refreshEvaluationFormList();
    });

  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

  // DE MODIFICAT / NU MERGE
  addComm() {
    var existingFormCriteria = {
      name: this.addCommForm.controls.name.value!,
      choice: this.addCommForm.controls.choice.value!,
      description: this.addCommForm.controls.description.value!,
      criteriaComment: this.addCommForm.controls.criteriaComment.value!,
      criteriaAttachment: this.addCommForm.controls.criteriaAttachment.value!
    }
    this.formCriteriaSubscription = this.evaluationFormService.createCriteriaComment(this.criteriaId, existingFormCriteria).subscribe(()=>{
      this.refreshEvaluationFormList();
    })

    

    
    
  }

  addReview() {
    var newReview = new CriteriaReview();
    newReview.review = this.addRevForm.controls.review.value!;
    newReview.formCriteriaId = this.criteriaId;
    this.evaluationFormService.createCriteriaReview(this.criteriaId, newReview).subscribe(() => {
      this.refreshEvaluationFormList();
    });
    this.hideAddRevDialog();
  }


  refreshEvaluationFormList() {
    this.evaluationForm = this.evaluationFormService.getEvaluationForms(this.userId);
  }

  showAddCommDialog(formCriteria: FormCriteria) {
    this.displayAddCommModal = true;
    if (formCriteria.id) {
      this.criteriaId = formCriteria.id
    }
  }
  hideAddCommDialog() {
    this.displayAddCommModal = false;
  }

  showAddRevDialog(id: Guid) {
    this.criteriaId = id;
    this.displayAddRevModal = true;
  }

  hideAddRevDialog() {
    this.displayAddRevModal = false;
  }

  onCriteriaChange(event: any): void {
    console.log("Updated criteria with id: " + event.target.name + "; selected value: " + event.target.value);
  }
}
