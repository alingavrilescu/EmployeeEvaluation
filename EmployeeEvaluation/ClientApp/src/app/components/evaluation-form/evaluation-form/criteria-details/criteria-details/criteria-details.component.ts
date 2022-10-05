import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { UserDTO } from '../../../../../models/users.model';
import { DefaultRoles } from 'src/api-authorization/role-defines';
import { FormCriteria } from 'src/app/models/form-criteria.model';

@Component({
  selector: 'app-criteria-details',
  templateUrl: './criteria-details.component.html',
  styleUrls: ['./criteria-details.component.css']
})
export class CriteriaDetailsComponent implements OnInit {

  addCommForm = new FormGroup({
    name: new FormControl(''),
    choice: new FormControl(''),
    description: new FormControl(''),
    criteriaComment: new FormControl(''),
    criteriaAttachment: new FormControl('')
  });

  constructor(private activatedRoute: ActivatedRoute, private formEvalService: EvaluationFormService) { }
  formCriteria!: Observable<FormCriteria>;
  formCriteriaId: any;
  evaluationFormId: any;

  constructor(private activatedRoute: ActivatedRoute, private formEvalService: EvaluationFormService)
   { 
    this.activatedRoute.paramMap.subscribe((params) => {
      this.evaluationFormId = params.get('formId');
      this.formCriteriaId = params.get('id');
    });
   }

  roles = DefaultRoles.AllRoles;
  displayAddCommModal: boolean = false;

  ngOnInit(): void {
    this.getFormCriteriaById();
  }

  getFormCriteriaById() {
    this.formCriteria = this.formEvalService.getFormCriteriaById(this.evaluationFormId, this.formCriteriaId);
  }
}
