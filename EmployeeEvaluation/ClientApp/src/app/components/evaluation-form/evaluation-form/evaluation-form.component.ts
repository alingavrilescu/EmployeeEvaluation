import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
})
export class EvaluationFormComponent implements OnInit, OnDestroy {
  constructor(private evaluationFormService: EvaluationFormService) {}

  deleteSubscription!: Subscription;

  evaluationFormList: EvaluationForm[] = [];
  evaluationFormName = '';
  evaluationFormType = '';

  ngOnInit(): void {
    this.refreshEvaluationFormList();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

  refreshEvaluationFormList() {
    this.evaluationFormService.getEvaluationForms().subscribe((data) => {
      this.evaluationFormList = data;
    });
  }

  addEvaluationForm() {
    var temp = {
      name: this.evaluationFormName,
      type: this.evaluationFormType,
    };
    this.evaluationFormService.createEvaluationForm(temp).subscribe(() => {
      this.refreshEvaluationFormList();
    });
  }
}
