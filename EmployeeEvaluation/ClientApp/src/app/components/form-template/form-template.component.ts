import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTemplateSection } from 'src/app/models/form-template-section.model';
import { FormTemplateCriteria } from 'src/app/models/form-template-criteria.model';
import { Project } from 'src/app/models/project.model';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
})

export class FormTemplateComponent implements OnInit, OnDestroy {

  currentFormTemplateId!: Guid;
  currentTemplateSectionId!: Guid;
  currentTemplateCriteriaId!: Guid;
  Type: any = ['Junior', 'Intermediate', 'Senior', 'Expert'];
  sectionRegistrationForm!: FormGroup;
  criterionRegistrationForm!: FormGroup;
  formTemplateList: FormTemplate[] = [];
  formTemplate!: FormTemplate;
  formTemplateSectionList: FormTemplateSection[] = [];
  formTemplateSection!: FormTemplateSection;
  formTemplateCriteriaList: FormTemplateCriteria[] = [];
  formTemplateCriteria!: FormTemplateCriteria;
  displayFormTemplateAddModal: boolean = false;
  displayFormTemplateEditModal: boolean = false;
  displayFormTemplateDeleteModal: boolean = false;
  departmentId: any;

  editFormTemplateFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl('', [Validators.required])
  });
  addFormTemplateFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl('', [Validators.required]),
  });
  editSectionFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required])
  });
  addSectionGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
  });
  editCriterionFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required])
  });
  addCriterionFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private formTemplateService: FormTemplateService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getFormTemplates();
    });
  }

  ngOnDestroy(): void {
  }

  // ================FORM TEMPLATES====================

  setCurrentFormTemplateId(id: Guid) {
    this.currentFormTemplateId = id;
    this.formTemplateList.forEach((formTemplate) => {
      if (formTemplate.id === id) {
        this.editFormTemplateFormGroup.controls.nameControl.setValue(formTemplate.name);
        this.editFormTemplateFormGroup.controls.typeControl.setValue(formTemplate.type);
      }
  });
}
  addFormTemplate() {
    var newFormTemplate = new FormTemplate();
    newFormTemplate.name = this.addFormTemplateFormGroup.controls.nameControl.value!;
    newFormTemplate.type = this.addFormTemplateFormGroup.controls.typeControl.value!;
    newFormTemplate.departmentId = this.departmentId;
    this.formTemplateService.postFormTemplate(this.departmentId, newFormTemplate).subscribe({
      next: (formTemplate) => {
        this.getFormTemplates();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  updateFormTemplate() {
    if (this.currentFormTemplateId !== undefined) {
      var formTemplateToEdit = this.formTemplateList[0];
      this.formTemplateList.forEach((formTemplate) => {
        if (formTemplate.id === this.currentFormTemplateId) formTemplateToEdit = formTemplate;
      });
      formTemplateToEdit.name = this.editFormTemplateFormGroup.controls.nameControl.value!;
      formTemplateToEdit.type = this.editFormTemplateFormGroup.controls.typeControl.value!;
      formTemplateToEdit.departmentId = this.departmentId;
      this.formTemplateService.updateFormTemplate(this.departmentId, formTemplateToEdit.id!, formTemplateToEdit).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }
  

  deleteFormTemplate(id?: Guid) {
    if (this.currentFormTemplateId !== undefined) {
      this.formTemplateService.deleteFormTemplate(this.departmentId, this.currentFormTemplateId).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }

  showAddDialog() {
    this.displayFormTemplateAddModal = true;
  }
  hideAddDialog() {
    this.displayFormTemplateAddModal = false;
  }
  showEditDialog() {
    this.displayFormTemplateEditModal = true;
  }
  hideEditDialog() {
    this.displayFormTemplateEditModal = false;
  }
  showDeleteDialog() {
    this.displayFormTemplateDeleteModal = true;
  }
  hideDeleteDialog() {
    this.displayFormTemplateDeleteModal = false;
  }
  getFormTemplates() {
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
  getFormTemplateById(id: Guid) {
    if (id !== undefined) {
      this.formTemplateService.getFormTemplateById(this.departmentId, id).subscribe({
        next: (formTemplate) => {
          this.formTemplate = formTemplate;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
   
  //===================SECTIONS=====================

  showAddDialogSection() {
    this.displayFormTemplateAddModal = true;
  }
  hideAddDialogSection() {
    this.displayFormTemplateAddModal = false;
  }
  showEditDialogSection() {
    this.displayFormTemplateEditModal = true;
  }
  hideEditDialogSection() {
    this.displayFormTemplateEditModal = false;
  }
  showDeleteDialogSection() {
    this.displayFormTemplateDeleteModal = true;
  }
  hideDeleteDialogSection() {
    this.displayFormTemplateDeleteModal = false;
  }

  getTemplateSections() {
    this.formTemplateService.getSections(this.departmentId,this.currentFormTemplateId)
      .subscribe({
        next: (formTemplateSectionList) => {
          this.formTemplateSectionList = formTemplateSectionList;
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  getTemplateSectionById(id: Guid) {
    if (id !== undefined) {
      this.formTemplateService.getTemplateSectionById(this.departmentId,this.currentFormTemplateId ,id).subscribe({
        next: (formTemplateSection) => {
          this.formTemplateSection = formTemplateSection;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteTemplateSectionById(id: Guid) {
    if (this.currentTemplateSectionId !== undefined) {
      this.formTemplateService.deleteSection(this.departmentId, this.currentFormTemplateId, id).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }

  addFormTemplateSection() {
    var newFormTemplateSection = new FormTemplateSection();
    newFormTemplateSection.name = this.addSectionGroup.controls.nameControl.value!;
    newFormTemplateSection.description = this.addSectionGroup.controls.descriptionControl.value!;
    newFormTemplateSection.FormTemplateId = this.currentFormTemplateId;
    this.formTemplateService.postTemplateSection(this.departmentId,this.currentFormTemplateId, newFormTemplateSection).subscribe({
      next: (formTemplateSection) => {
        this.getTemplateSections();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  // ================= FORM CRITERIA =================

  getCriteria()
  {
    this.formTemplateService.getCriteria(this.departmentId,this.currentFormTemplateId,this.currentTemplateSectionId)
    .subscribe({
      next: (formTemplateCriteriaList) => {
        this.formTemplateCriteriaList = formTemplateCriteriaList;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  // deleteCriteria() {
  //   if (this.currentTemplateCriteriaId !== undefined) {
  //     this.formTemplateService.deleteCriteria(this.departmentId,this.currentFormTemplateId,this.currentTemplateSectionId,c).subscribe({
  //       next: (response) => {
  //         this.getFormTemplates();
  //         console.log(response);
  //       },
  //     });
  //   }
  //   this.hideDeleteDialog();
  // }

  setCurrentFormTemplateSectionId(id: Guid) {
    this.currentTemplateSectionId = id;
    this.formTemplateSectionList.forEach((formTemplateSection) => {
      if (formTemplateSection.id === id) {
        this.editSectionFormGroup.controls.nameControl.setValue(formTemplateSection.name);
        this.editSectionFormGroup.controls.descriptionControl.setValue(formTemplateSection.description);
      }
  });
}
}
