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
  evalFormId: any;
  userId!: any;
  criteriaId: any;
  formCriteriaSubscription!: Subscription;
  formCriteria!: FormCriteria;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.evalFormId = params.get('id');
      this.refreshEvaluationForm();
    });

  }

  ngOnDestroy(): void {
    this.formCriteriaSubscription?.unsubscribe();
  }

  refreshEvaluationForm() {
    this.evaluationForm = this.evaluationFormService.getEvaluationFormById(this.evalFormId);
  }


  showAddRevDialog(id: string) {
    this.criteriaId = id;
    this.displayAddRevModal = true;
  }

  hideAddRevDialog() {
    this.displayAddRevModal = false;
  }

  onCriteriaChange(event: any): void {
    console.log("Updated criteria with id: " + event.target.name + "; selected value: " + event.target.value);
    let updatedCriteria = new FormCriteria();
    updatedCriteria.choice = event.target.value;
    updatedCriteria.id = event.target.name;
    this.formCriteriaSubscription?.unsubscribe();
    this.formCriteriaSubscription = this.evaluationFormService.updateFormCriteria(Guid.parse(updatedCriteria.id), updatedCriteria).subscribe(()=>{
    })
  }
}
