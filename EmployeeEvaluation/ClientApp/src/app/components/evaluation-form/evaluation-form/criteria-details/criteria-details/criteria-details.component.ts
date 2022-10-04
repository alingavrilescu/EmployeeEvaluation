import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Subscribable, Subscription } from 'rxjs';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-criteria-details',
  templateUrl: './criteria-details.component.html',
  styleUrls: ['./criteria-details.component.css']
})
export class CriteriaDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formEvalService: EvaluationFormService) { }

  ngOnInit(): void {
  }

}
