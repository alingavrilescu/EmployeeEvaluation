import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTemplateSection } from 'src/app/models/form-template-section.model';
import { FormTemplateCriteria } from 'src/app/models/form-template-criteria.model';
import { SoftwareDeveloperType } from 'src/app/software-developer-type';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
})

export class FormTemplateComponent implements OnInit, OnDestroy {

  
  selectedFormTemplate!: FormTemplate;
  selectedFormTemplateCriterion!: FormTemplateCriteria;
  currentFormTemplateId: Guid = Guid.parse(Guid.EMPTY);
  currentTemplateSectionId: Guid =Guid.parse(Guid.EMPTY);
  currentTemplateCriteriaId: Guid =Guid.parse(Guid.EMPTY);
  Type = SoftwareDeveloperType.AllTypes;
  formTemplateListObs!:Observable<FormTemplate[]>;
  formTemplateList: FormTemplate[] = [];
  formTemplate!: FormTemplate;
  formTemplateSectionList: FormTemplateSection[] = [];
  formTemplateSection!: FormTemplateSection;
  formTemplateCriteriaList: FormTemplateCriteria[] = [];
  formTemplateCriteria!: FormTemplateCriteria;
  displayFormTemplateAddModal: boolean = false;
  displayFormTemplateEditModal: boolean = false;
  displayFormTemplateDeleteModal: boolean = false;
  displaySectionAddModal: boolean = false;
  displaySectionEditModal: boolean = false;
  displaySectionDeleteModal: boolean = false;
  displayCriterionAddModal: boolean = false;
  displayCriterionEditModal: boolean = false;
  displayCriterionDeleteModal: boolean = false;
  departmentId: any;
  selectedSection!: FormTemplateSection;

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
    });
    this.refreshFormTemplate();

  }

  ngOnDestroy(): void {
  }

  // ================FORM TEMPLATES====================


  setCurrentFormTemplateId(id: Guid) {
    let selectedFormTemplate = this.formTemplateList.find(formTemplate => formTemplate.id === id);
    if (selectedFormTemplate) {
      this.currentFormTemplateId = id;
      this.editFormTemplateFormGroup.controls.nameControl.setValue(selectedFormTemplate.name);
      this.editFormTemplateFormGroup.controls.typeControl.setValue(selectedFormTemplate.type);
    }
  }
  setSelectedFormTemplate(formTemplateToSet: FormTemplate) {

    this.selectedFormTemplate = formTemplateToSet;
    if (this.selectedFormTemplate && this.selectedFormTemplate.id) {
      this.currentFormTemplateId = this.selectedFormTemplate.id;
      this.editFormTemplateFormGroup.controls.nameControl.setValue(this.selectedFormTemplate.name);
      this.editFormTemplateFormGroup.controls.typeControl.setValue(this.selectedFormTemplate.type);
    }
  }
  addFormTemplate() {
    var newFormTemplate = new FormTemplate();
    newFormTemplate.name = this.addFormTemplateFormGroup.controls.nameControl.value!;
    newFormTemplate.type = this.addFormTemplateFormGroup.controls.typeControl.value!;
    newFormTemplate.departmentId = this.departmentId;
    this.formTemplateService.postFormTemplate(this.departmentId, newFormTemplate).subscribe({
      next: (formTemplate) => {
        this.refreshFormTemplate();
      },
      error: (response) => {
        console.log(response);
      },
    });
    this.hideAddDialog();
  }

  updateFormTemplate() {
    this.selectedFormTemplate.name = this.editFormTemplateFormGroup.controls.nameControl.value!;
    this.selectedFormTemplate.type = this.editFormTemplateFormGroup.controls.typeControl.value!;
    this.selectedFormTemplate.departmentId = this.departmentId;
    this.formTemplateService.updateFormTemplate(this.departmentId, this.selectedFormTemplate.id!, this.selectedFormTemplate).subscribe({
      next: (response) => {
        this.refreshFormTemplate();
        console.log(response);
      },
    });
    this.hideEditDialog();
  }


  deleteFormTemplate() {
    if (this.currentFormTemplateId !== undefined) {
      this.formTemplateService.deleteFormTemplate(this.departmentId, this.currentFormTemplateId).subscribe({
        next: (response) => {
          this.refreshFormTemplate();
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
  showEditDialog(formTemplate: FormTemplate) {
    this.setSelectedFormTemplate(formTemplate);
    this.displayFormTemplateEditModal = true;
  }
  hideEditDialog() {
    this.displayFormTemplateEditModal = false;
  }
  showDeleteDialog(formTemplate: FormTemplate) {
    this.setSelectedFormTemplate(formTemplate);
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
          console.log(formTemplateList)
        },
        error: (response) => {
          console.log(response);
        },
      });
  }
  refreshFormTemplate() {
    this.formTemplateService.getFormTemplates(this.departmentId).subscribe(data => {
      this.formTemplateList = data;
      console.log(this.formTemplateList)
    });

    this.formTemplateListObs=this.formTemplateService.getFormTemplates(this.departmentId);
  }
  
  //===================SECTIONS=====================

  setCurrentSectionId(id: Guid) {
    let selectedSection = this.selectedFormTemplate.templateSections.find(formTemplateSection => formTemplateSection.id === id)
    if (selectedSection) {
      this.currentTemplateSectionId = id;
      this.editSectionFormGroup.controls.nameControl.setValue(this.selectedSection.name);
      this.editSectionFormGroup.controls.descriptionControl.setValue(this.selectedSection.description);
    }
  }
  setSelectedSection(sectionToSet: FormTemplateSection) {
    this.selectedSection = sectionToSet;
    if (this.selectedSection && this.selectedSection.id) {
      this.currentTemplateSectionId = this.selectedSection.id;
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
  showEditDialogSection(formTemplate: FormTemplate, formTemplateSection: FormTemplateSection) {
    this.setSelectedFormTemplate(formTemplate);
    this.setSelectedSection(formTemplateSection);
    this.displaySectionEditModal = true;

  }
  hideEditDialogSection() {
    this.displaySectionEditModal = false;
  }
  showDeleteDialogSection(formTemplate: FormTemplate, formTemplateSection: FormTemplateSection) {
    this.setSelectedFormTemplate(formTemplate);
    this.setSelectedSection(formTemplateSection);
    this.displaySectionDeleteModal = true;
  }
  hideDeleteDialogSection() {
    this.displaySectionDeleteModal = false;
  }

  updateTemplateSection() {
    this.selectedSection.name = this.editSectionFormGroup.controls.nameControl.value!;
    this.selectedSection.description = this.editSectionFormGroup.controls.descriptionControl.value!;
    this.selectedSection.formTemplateId = this.currentFormTemplateId;
    this.formTemplateService.putTemplateSection(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId, this.selectedSection).subscribe({
      next: (response) => {
        this.refreshFormTemplate();
        console.log(response);
      },
    });
    this.hideEditDialogSection();
  }

  deleteSection() {
    if (this.currentTemplateSectionId !== undefined) {
      this.formTemplateService.deleteSection(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId).subscribe({
        next: (response) => {
          this.refreshFormTemplate();
          console.log(response);
        },
      });
    }
    this.hideDeleteDialogSection();
  }

  addFormTemplateSection() {
    var newFormTemplateSection = new FormTemplateSection();
    newFormTemplateSection.name = this.addSectionGroup.controls.nameControl.value!;
    newFormTemplateSection.description = this.addSectionGroup.controls.descriptionControl.value!;
    newFormTemplateSection.formTemplateId = this.currentFormTemplateId;
    this.formTemplateService.postTemplateSection(this.departmentId, this.currentFormTemplateId, newFormTemplateSection).subscribe({
      next: (formTemplateSection) => {
        this.refreshFormTemplate();
      },
      error: (response) => {
        console.log(response);
      },
    });
    this.hideAddDialogSection();
  }
  // ================= FORM CRITERIA =================

  setCurrentCriterionId(id: Guid) {
    let selectedCriterion = this.selectedSection.templateCriteria.find(formTemplate => formTemplate.id === id);
    if (selectedCriterion) {
      this.currentFormTemplateId = id;
      this.editFormTemplateFormGroup.controls.nameControl.setValue(selectedCriterion.name);
      this.editFormTemplateFormGroup.controls.typeControl.setValue(selectedCriterion.description);
    }
  }
  setSelectedCriterion(formTemplateCriterionToSet: FormTemplateCriteria) {
    this.selectedFormTemplateCriterion = formTemplateCriterionToSet;
    if (this.selectedFormTemplateCriterion&&this.selectedFormTemplateCriterion.id) {
      this.currentTemplateCriteriaId = this.selectedFormTemplateCriterion.id;
      this.editCriterionFormGroup.controls.nameControl.setValue(this.selectedFormTemplateCriterion.name);
      this.editCriterionFormGroup.controls.descriptionControl.setValue(this.selectedFormTemplateCriterion.description);
    }
  }

  updateCriterion() {
    this.selectedFormTemplateCriterion.name = this.editCriterionFormGroup.controls.nameControl.value!;
    this.selectedFormTemplateCriterion.description = this.editCriterionFormGroup.controls.descriptionControl.value!;
    this.selectedFormTemplateCriterion.FormTemplateSectionId = this.currentTemplateSectionId;
    this.formTemplateService.putFormTemplateCriterion(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId, this.currentTemplateCriteriaId, this.selectedFormTemplateCriterion).subscribe({
      next: (response) => {
        this.refreshFormTemplate();
        console.log(response);
      },
    });
    this.hideEditDialogCriterion();
  }

  addCriterion() {
    var newCriterion = new FormTemplateCriteria();
    newCriterion.name = this.addCriterionFormGroup.controls.nameControl.value!;
    newCriterion.description = this.addCriterionFormGroup.controls.descriptionControl.value!;
    this.formTemplateService.postFormTemplateCriterion(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId, newCriterion).subscribe({
      next: (response) => {
        this.refreshFormTemplate();
      },
      error: (response) => {
        console.log(response);
      },
    });
    this.hideAddDialogCriterion();
  }


  deleteCriterion() {
    if (this.currentTemplateCriteriaId !== undefined) {
      this.formTemplateService.deleteCriterion(this.departmentId, this.currentFormTemplateId, this.currentTemplateSectionId, this.currentTemplateCriteriaId).subscribe({
        next: (response) => {
          this.refreshFormTemplate();
          console.log(response);
        },
      });
    }
    this.hideDeleteDialogCriterion();
  }

  showAddDialogCriterion(formTemplate:FormTemplate,section:FormTemplateSection) {
    this.displayCriterionAddModal = true;
    this.setSelectedFormTemplate(formTemplate);
    this.setSelectedSection(section);
  }
  hideAddDialogCriterion() {
    this.displayCriterionAddModal = false;
  }
  showEditDialogCriterion(formTemplateSection: FormTemplateSection, formTemplateCriterion: FormTemplateCriteria) {
    this.setSelectedSection(formTemplateSection);
    this.setSelectedCriterion(formTemplateCriterion);
    this.displayCriterionEditModal = true;
  }
  hideEditDialogCriterion() {
    this.displayCriterionEditModal = false;
  }
  showDeleteDialogCriterion(formTemplateSection: FormTemplateSection, formTemplateCriterion: FormTemplateCriteria) {
    this.setSelectedSection(formTemplateSection);
    this.setSelectedCriterion(formTemplateCriterion);
    this.displayCriterionDeleteModal = true;
  }
  hideDeleteDialogCriterion() {
    this.displayCriterionDeleteModal = false;
  }
}
