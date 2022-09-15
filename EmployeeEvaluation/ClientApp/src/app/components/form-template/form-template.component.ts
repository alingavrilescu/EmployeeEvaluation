import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})

export class FormTemplateComponent implements OnInit,OnDestroy {

  formTemplateList: FormTemplate[]=[];
  formTemplateName = "";
  formTemplateDescription = "";
  formTemplateDepartmentId!:Guid;
  formTemplateType="";
  departmentId!:Guid;
  addFormTemplateSubscription!:Subscription;
  updateFormTemplateSubscription!:Subscription;
  deleteFormTemplateSubscription!:Subscription;
  getFormTemplatesSubscription!:Subscription;

  constructor(private formTemplateService:FormTemplateService,private departmentService:DepartmentsService) { }
  
  ngOnInit(): void {
    this.refreshFormTemplateList(this.departmentId);
  }
  
 ngOnDestroy(): void {
  this.addFormTemplateSubscription?.unsubscribe;
  this.deleteFormTemplateSubscription?.unsubscribe;
  this.updateFormTemplateSubscription?.unsubscribe;
  this.getFormTemplatesSubscription?.unsubscribe;
 }

 addFormTemplate(){
  var temp={
    name:this.formTemplateName,
    departmentId:this.formTemplateDepartmentId,
    type:this.formTemplateType
  };
  this.addFormTemplateSubscription=this.formTemplateService.createFormTemplate(temp)
                                                           .subscribe(()=>{this.refreshFormTemplateList(this.departmentId);});
}

updateFormTemplate(formTemplate:FormTemplate, id: Guid)
{
  this.updateFormTemplateSubscription=this.formTemplateService.updateFormTemplate(id, formTemplate)
                                                              .subscribe(res => {alert(res.toString());});
  this.refreshFormTemplateList(this.departmentId);
}

deleteFormTemplate(id?: Guid)
{
  if(id!==undefined) 
  {
    this.deleteFormTemplateSubscription=this.formTemplateService.deleteFormTemplate(id)
                                                                .subscribe(()=>{this.refreshFormTemplateList(this.departmentId);});
  }
}

 getFormTemplates(departmentId:Guid){
   this.getFormTemplatesSubscription=this.formTemplateService.getFormTemplates(departmentId)
                                                             .subscribe((res)=>{this.formTemplateList=res; });
 }

refreshFormTemplateList(departmentId:Guid)
{
  this.formTemplateService.getFormTemplates(departmentId)
                          .subscribe(data=>{this.formTemplateList=data;})
}

}
