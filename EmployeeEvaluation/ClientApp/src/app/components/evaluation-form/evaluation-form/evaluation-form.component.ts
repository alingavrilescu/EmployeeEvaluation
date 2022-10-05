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

  addRevForm = new FormGroup({
    review: new FormControl('', Validators.required)
  })

  constructor(private evaluationFormService: EvaluationFormService, private activatedRoute: ActivatedRoute) { }


  
  displayAddRevModal: boolean = false;
  deleteSubscription!: Subscription;
  evaluationForm!: Observable<EvaluationForm>;
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
