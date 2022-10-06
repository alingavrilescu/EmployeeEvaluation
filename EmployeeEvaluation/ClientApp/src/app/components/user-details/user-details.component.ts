import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Department } from 'src/app/models/department.model';
import { EvaluationForm } from 'src/app/models/evaluation-form.model';
import { FormTemplate } from 'src/app/models/form-template.model';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EvaluationFormService } from 'src/app/services/evaluation-form.service';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: any;
  user!: UserDTO;
  project!: Project;
  department!: Department;
  templates!: FormTemplate[];
  displayAddEvalModal: boolean = false;
  addEvalFormGroup = new FormGroup({
    templateControl: new FormControl('', [Validators.required]),
  });
  sections: string[] = ['C#', 'JavaScript', 'Python'];
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute,
    private templateService: FormTemplateService,
    private evaluationFormService: EvaluationFormService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.usersService.getUserById(this.userId).subscribe((res) => {
        this.user = res;
        if (this.user.departmentId) {
          this.departmentsService
            .getDepartmentById(this.user.departmentId)
            .subscribe((res) => {
              this.department = res;
            });
        }
        if (this.user.projectId) {
          this.projectsService
            .getProjectById(this.user.projectId)
            .subscribe((res) => {
              this.project = res;
            });
        }
        this.templateService
          .getFormTemplates(this.user.departmentId!)
          .subscribe((res) => {
            this.templates = res;
          });
      });
    });
  }
  showModal() {
    this.displayAddEvalModal = true;
  }
  hideModal() {
    this.displayAddEvalModal = false;
  }
  addEvalForm() {
    var formTemplateId: any =
      this.addEvalFormGroup.controls.templateControl.value!;
    console.log(formTemplateId);
    this.evaluationFormService
      .createEvaluationForm(this.userId, formTemplateId)
      .subscribe();
    this.hideModal();
  }
}
