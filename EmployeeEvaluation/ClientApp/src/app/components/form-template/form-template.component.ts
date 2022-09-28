import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTemplateSection } from 'src/app/models/form-template-section.model';
import { FormTemplateCriteria } from 'src/app/models/form-template-criteria.model';


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
  formTemplateList: FormTemplate[] = [];
  formTemplate!: FormTemplate;
  formTemplateSectionList: FormTemplateSection[] = [];
  formTemplateSection!: FormTemplateSection;
  formTemplateCriteriaList: FormTemplateCriteria[] = [];
  formTemplateCriteria!: FormTemplateCriteria;
  displayFormTemplateAddModal: boolean = false;
  displayFormTemplateEditModal: boolean = false;
  displayFormTemplateDeleteModal: boolean = false;
  displaySectionAddModal:boolean =false;
  displaySectionEditModal:boolean=false;
  displaySectionDeleteModal:boolean=false;
  displayCriterionAddModal: boolean = false;
  displayCriterionEditModal: boolean = false;
  displayCriterionDeleteModal: boolean = false;
  departmentId: any;
  selectedSection!:FormTemplateSection;


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
    this.hideAddDialog();
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
          this.getFormTemplates();
          console.log(response);
        },
      });
    }
    this.hideEditDialog();
  }
  

  deleteFormTemplate(id?: Guid) {
    if (this.currentFormTemplateId !== undefined) {
      this.formTemplateService.deleteFormTemplate(this.departmentId, this.currentFormTemplateId).subscribe({
        next: (response) => {
          this.getFormTemplates();
          console.log(response);
        },
      });
    }
    this.hideDeleteDialog();
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

  setCurrentSectionId(id: Guid) {
    let selectedSection=this.formTemplateSectionList.find(formTemplateSection=>formTemplateSection.id===id)
      if (selectedSection) {
        this.currentTemplateSectionId = id;
        this.editSectionFormGroup.controls.nameControl.setValue(FormTemplateSection.name);
        this.editSectionFormGroup.controls.descriptionControl.setValue(FormTemplateSection.description);
      }
}
setSelectedSection(sectionToSet: FormTemplateSection)
  {
    this.selectedSection = sectionToSet;
    if (this.selectedSection)sectionToSet
    {
      this.currentTemplateSectionId != this.selectedSection.id;
      this.editSectionFormGroup.controls.nameControl.setValue(this.selectedSection.name);
      this.editSectionFormGroup.controls.descriptionControl.setValue(this.selectedSection.description);

    }  
  }
  showAddDialogSection() {
    this.displaySectionAddModal = true;
  }
  hideAddDialogSection() {
    this.displaySectionAddModal = false;
  }
  showEditDialogSection(formTemplateSection:FormTemplateSection) {
    this.setSelectedSection(formTemplateSection);
    this.displaySectionEditModal= true;

  }
  hideEditDialogSection() {
    this.displaySectionEditModal = false;
  }
  showDeleteDialogSection(formTemplateSection:FormTemplateSection) {
    this.setSelectedSection(formTemplateSection);
    this.displaySectionDeleteModal= true;
  }
  hideDeleteDialogSection() {
    this.displaySectionDeleteModal = false;
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

  updateTemplateSection() {
      this.selectedSection.name = this.editCriterionFormGroup.controls.nameControl.value!;
      this.selectedSection.description = this.editCriterionFormGroup.controls.descriptionControl.value!;
      this.selectedSection.FormTemplateId = this.currentFormTemplateId;
      this.formTemplateService.putTemplateSection(this.departmentId,this.currentFormTemplateId,this.currentTemplateSectionId,this.selectedSection).subscribe({
        next: (response) => {
          this.getTemplateSections();
          console.log(response);
        },
      });
    this.hideEditDialogSection();
  }

  deleteSection() {
    if (this.currentTemplateSectionId !== undefined) {
      this.formTemplateService.deleteSection(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId).subscribe({
        next: (response) => {
          this.getTemplateSections();
          console.log(response);
        },
      });
    }
    this.hideEditDialogSection();
  }

  addFormTemplateSection() {
    var newFormTemplateSection = new FormTemplateSection();
    newFormTemplateSection.name = this.addSectionGroup.controls.nameControl.value!;
    newFormTemplateSection.description = this.addSectionGroup.controls.descriptionControl.value!;
    newFormTemplateSection.FormTemplateId = this.currentFormTemplateId;
    this.formTemplateService.postTemplateSection(this.departmentId,this.currentFormTemplateId, newFormTemplateSection).subscribe({
      next: (formTemplateSection) => {
        this.getFormTemplateById(this.currentFormTemplateId);
        this.formTemplate.formTemplateSections.push(newFormTemplateSection);
        this.getFormTemplates();
      },
      error: (response) => {
        console.log(response);
      },
    });
    this.hideAddDialogSection();
  }
  // ================= FORM CRITERIA =================

  setCurrentCriterionId(id: Guid) {
    this.currentTemplateCriteriaId = id;
    this.formTemplateCriteriaList.forEach((criterion) => {
      if (criterion.id === id) {
        this.editCriterionFormGroup.controls.nameControl.setValue(criterion.name);
        this.editCriterionFormGroup.controls.descriptionControl.setValue(criterion.description);
      }
  });
}

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

  updateCriterion()
  {
    if (this.currentTemplateCriteriaId !== undefined) {
      var criterionToEdit = this.formTemplateCriteriaList[0];
      this.formTemplateCriteriaList.forEach((criterion) => {
        if (criterion.id === this.currentTemplateCriteriaId) criterionToEdit = criterion;
      });
      criterionToEdit.name = this.editCriterionFormGroup.controls.nameControl.value!;
      criterionToEdit.description = this.editCriterionFormGroup.controls.descriptionControl.value!;
      criterionToEdit.FormTemplateSectionId = this.currentTemplateSectionId;
      this.formTemplateService.putTemplateSection(this.departmentId,this.currentFormTemplateId,this.currentTemplateSectionId,this.formTemplateSection).subscribe({
        next: (response) => {
          this.getTemplateSections();
          console.log(response);
        },
      });
    }
    this.hideEditDialogCriterion();
  }

  addCriterion() {
    var newCriterion = new FormTemplateCriteria();
    newCriterion.name = this.addCriterionFormGroup.controls.nameControl.value!;
    newCriterion.description = this.addCriterionFormGroup.controls.descriptionControl.value!;
    this.formTemplateService.postFormTemplateCriterion(this.departmentId, this.currentFormTemplateId,this.currentTemplateSectionId, newCriterion).subscribe({
      next: (formTemplateCriterion) => {
        this.getFormTemplates();
      },
      error: (response) => {
        console.log(response);
      },
    });
    this.hideAddDialogCriterion();
  }


  deleteCriterion() {
    if (this.currentTemplateCriteriaId !== undefined) {
      this.formTemplateService.deleteCriterion(this.departmentId,this.currentFormTemplateId,this.currentTemplateSectionId,this.currentTemplateCriteriaId).subscribe({
        next: (response) => {
          this.getFormTemplates();
          console.log(response);
        },
      });
    }
    this.hideDeleteDialogCriterion();
  }

  showAddDialogCriterion() {
   this.displayCriterionAddModal=true;
  }
  hideAddDialogCriterion() {
  this.displayCriterionAddModal=false;
  }
  showEditDialogCriterion() {
   this.displayCriterionEditModal=true;
  }
  hideEditDialogCriterion() {
    this.displayCriterionEditModal=false;
  }
  showDeleteDialogCriterion() {
  this.displayCriterionDeleteModal=true;
  }
  hideDeleteDialogCriterion() {
    this.displayCriterionDeleteModal=false;
  }
}
