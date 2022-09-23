import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTemplateSection } from 'src/app/models/form-template-section.model';
import { FormTemplateCriteria } from 'src/app/models/form-template-criteria.model';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
})

export class FormTemplateComponent implements OnInit,OnDestroy {

  currentFormTemplateId!:Guid;
  currentTemplateSectionId!:Guid;
  currentTemplateCriteriaId!:Guid;
  Type: any = ['Junior', 'Intermediate', 'Senior', 'Expert'];
  sectionRegistrationForm!:FormGroup;
  criterionRegistrationForm!:FormGroup;
  formTemplateList: FormTemplate[]=[];
  formTemplate!:FormTemplate;
  formTemplateSectionList:FormTemplateSection[]=[];
  formTemplateSection!:FormTemplateSection;
  formTemplateCriteriaList:FormTemplateCriteria[]=[];
  formTemplateCriteria!:FormTemplateCriteria;
  displayFormTemplateAddModal: boolean = false;
  displayFormTemplateEditModal: boolean = false;
  displayFormTemplateDeleteModal: boolean = false;
  departmentId:any;

  editFormTemplateFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl('', [Validators.required])
  });
  addFormTemplateFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl('', [Validators.required]),
  });
  // editSectionFormGroup = new FormGroup({
  //   nameControl: new FormControl('', [Validators.required]),
  //   descriptionControl: new FormControl('', [Validators.required])
  // });
  // addSectionGroup = new FormGroup({
  //   nameControl: new FormControl('', [Validators.required]),
  //   descriptionControl: new FormControl('', [Validators.required]),
  // });
  // editCriterionFormGroup = new FormGroup({
  //   nameControl: new FormControl('', [Validators.required]),
  //   descriptionControl: new FormControl('', [Validators.required])
  // });
  // addCriterionFormGroup = new FormGroup({
  //   nameControl: new FormControl('', [Validators.required]),
  //   descriptionControl: new FormControl('', [Validators.required]),
  // });

  constructor(private fb:FormBuilder,private formTemplateService:FormTemplateService,private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getFormTemplates();
    });
  }
  
 ngOnDestroy(): void {
 }

setCurrentFormTemplateId(id: Guid) {
  this.currentFormTemplateId = id;
}
 addFormTemplate(){
  var newFormTemplate = new FormTemplate();
  newFormTemplate.name = this.addFormTemplateFormGroup.controls.nameControl.value!;
  newFormTemplate.type = this.addFormTemplateFormGroup.controls.typeControl.value!;
  newFormTemplate.departmentId=this.departmentId;
  this.formTemplateService.postFormTemplate(this.departmentId,newFormTemplate).subscribe({
    next: (formTemplate) => {
      this.getFormTemplates();
    },
    error: (response) => {
      console.log(response);
    },
  });
}

updateFormTemplate(id:Guid,formTemplate:FormTemplate)
{
  if (this.currentFormTemplateId !== undefined) {
    var formTemplateToEdit = this.formTemplateList[0];
    this.formTemplateList.forEach((formTemplate) => {
      if (formTemplate.id === this.currentFormTemplateId) formTemplateToEdit = formTemplate;
    });
    formTemplateToEdit.name = this.editFormTemplateFormGroup.controls.nameControl.value!;
    formTemplateToEdit.type = this.editFormTemplateFormGroup.controls.typeControl.value!;
    this.formTemplateService.updateFormTemplate(this.departmentId,formTemplateToEdit.id!, formTemplateToEdit).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}

deleteFormTemplate(id?: Guid)
{
  if (this.currentFormTemplateId !== undefined) {
    for (let i = 0; i < this.formTemplateList.length; i++) {
      if (this.formTemplateList[i].id == this.currentFormTemplateId) this.formTemplateList.splice(i, 1);
    }
    this.formTemplateService.deleteFormTemplate(this.departmentId,this.currentFormTemplateId).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}

showAddDialog() {
  this.displayFormTemplateAddModal = !this.displayFormTemplateAddModal;
}
showEditDialog() {
  this.displayFormTemplateEditModal = !this.displayFormTemplateEditModal;
  this.editFormTemplateFormGroup.controls.typeControl.setValue(this.formTemplate.type);
  this.editFormTemplateFormGroup.controls.nameControl.setValue(this.formTemplate.name);
}
showDeleteDialog() {
  this.displayFormTemplateDeleteModal = !this.displayFormTemplateDeleteModal;
}
 getFormTemplates(){
  this.formTemplateService.getFormTemplates(this.departmentId)
  .subscribe({
    next: (formTemplateList) => {
      this.formTemplateList = formTemplateList;
    },
    error: (response) => {
      console.log(response);
    },
  });
}
getFormTemplateById(id:Guid)
{
  if (id !== undefined) {
    this.formTemplateService.getFormTemplateById(this.departmentId,id).subscribe({
      next: (formTemplate) => {
        this.formTemplate = formTemplate;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
 }
 

}
