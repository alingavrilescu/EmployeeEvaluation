import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import { ActivatedRoute } from '@angular/router';
import { FormCriteria } from 'src/app/models/form-criteria.model';
import { CriteriaComments } from 'src/app/models/criteria-comments.model';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
})
export class EvaluationFormComponent implements OnInit, OnDestroy {

  addCommForm = new FormGroup({
    criteriaComment: new FormControl('', Validators.required),
    criteriaAttachment: new FormControl('')
  });

  constructor(private evaluationFormService: EvaluationFormService, private activatedRoute: ActivatedRoute) { }


  displayAddCommModal: boolean = false;

  deleteSubscription!: Subscription;

  evaluationForm!: EvaluationForm;
  userId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.refreshEvaluationFormList();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

  addComm(){
    var newComment = new CriteriaComments();
    newComment.comment = this.addCommForm.controls.criteriaComment.value!;
    newComment.attachment = this.addCommForm.controls.criteriaAttachment.value!;
  }

  refreshEvaluationFormList() {
    this.evaluationFormService.getEvaluationForms(this.userId).subscribe(data => {
      this.evaluationForm = data;
      console.log(this.evaluationForm.formSections)
    })

    //NOT FINISHED YET
  }

  showAddCommDialog(){
    this.displayAddCommModal = true;
  }

  hideAddCommDialog(){
    this.displayAddCommModal = false;
  }
}
