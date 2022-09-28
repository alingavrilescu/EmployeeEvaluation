import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
})
export class EvaluationFormComponent implements OnInit, OnDestroy {
  constructor(private evaluationFormService: EvaluationFormService, private activatedRoute: ActivatedRoute) { }

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

  refreshEvaluationFormList() {
    this.evaluationFormService.getEvaluationForms(this.userId).subscribe(data => {
      this.evaluationForm = data;
      console.log(this.evaluationForm.formSections)
    })
  }
}
