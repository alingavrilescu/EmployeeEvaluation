import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { EvaluationFormService } from '../../../../../services/evaluation-form.service';
import { FormCriteria } from '../../../../../models/form-criteria.model';
import { subscribeOn, tap } from 'rxjs/operators';
import { CriteriaReview } from 'src/app/models/criteria-review.model';
import { FormSection } from 'src/app/models/form-section.model';


@Component({
  selector: 'app-criteria-details',
  templateUrl: './criteria-details.component.html',
  styleUrls: ['./criteria-details.component.css']
})
export class CriteriaDetailsComponent implements OnInit, OnDestroy {

  formCriteria!: Observable<FormCriteria>;
  formCriteriaId: any;
  formCriteriaSubscription!: Subscription;
  userId: any;
  displayAddCommModal: boolean = false;
  displayAddRevModal: boolean = false;
  formSection!: Observable<FormSection>;

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

  constructor(private activatedRoute: ActivatedRoute, private formEvalService: EvaluationFormService)
   { 
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.formCriteriaId = params.get('criteriaId');
    });
   }

  ngOnInit(): void {
    this.getFormCriteriaById();
  }

  ngOnDestroy(): void {
    this.formCriteriaSubscription?.unsubscribe();
  }

  refresh(){
    window.location.reload();
  }

  addComm() {
    var existingFormCriteria = {
      id: this.formCriteriaId,
      name: this.addCommForm.controls.name.value!,
      choice: this.addCommForm.controls.choice.value!,
      description: this.addCommForm.controls.description.value!,
      comment: this.addCommForm.controls.criteriaComment.value!,
      attachment: this.addCommForm.controls.criteriaAttachment.value!
    }
    this.formCriteriaSubscription = this.formEvalService.updateFormCriteria(this.formCriteriaId, existingFormCriteria).subscribe(()=>{
    })
    this.hideAddCommDialog();
    this.refresh();
  }

  addReview() {
    var newReview = new CriteriaReview();
    newReview.review = this.addRevForm.controls.review.value!;
    newReview.formCriteriaId = this.formCriteriaId;
    this.formEvalService.createCriteriaReview(this.formCriteriaId, newReview).subscribe(() => {
    });
    this.hideAddRevDialog();
    this.refresh();
  }

  getFormCriteriaById() {
    this.formCriteria = this.formEvalService.getFormCriteriaById(this.userId, this.formCriteriaId).pipe(tap((fc)=>{
      if(fc.comment)
        this.addCommForm.controls.criteriaComment.setValue(fc.comment);
    }));
  }

  showAddCommDialog(formCriteria: FormCriteria) {
    this.displayAddCommModal = true;
    if (formCriteria.id) {
      this.formCriteriaId = formCriteria.id
    }
    this.addCommForm.controls.name.setValue(formCriteria.name);
    this.addCommForm.controls.choice.setValue(formCriteria.choice as string | null);
    this.addCommForm.controls.description.setValue(formCriteria.description);
  }

  hideAddCommDialog() {
    this.displayAddCommModal = false;
  }
  showAddRevDialog() {

    this.displayAddRevModal = true;
  }

  hideAddRevDialog() {
    this.displayAddRevModal = false;
  }
}