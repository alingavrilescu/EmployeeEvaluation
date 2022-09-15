import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';

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
  addFormTemplateSubscription!:Subscription;
  updateFormTemplateSubscription!:Subscription;
  deleteFormTemplateSubscription!:Subscription;
  getFormTemplatesSubscription!:Subscription;

  constructor(private formTemplateService:FormTemplateService) { }
  
  ngOnInit(): void {
    this.refreshFormTemplateList();
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
                                                           .subscribe(()=>{this.refreshFormTemplateList();});
}

updateFormTemplate(formTemplate:FormTemplate, id: Guid)
{
  this.updateFormTemplateSubscription=this.formTemplateService.updateFormTemplate(id, formTemplate)
                                                              .subscribe(res => {alert(res.toString());});
  this.refreshFormTemplateList();
}

deleteFormTemplate(id?: Guid)
{
  if(id!==undefined) 
  {
    this.deleteFormTemplateSubscription=this.formTemplateService.deleteFormTemplate(id)
                                                                .subscribe(()=>{this.refreshFormTemplateList();});
  }
}

 getFormTemplates(){
   this.getFormTemplatesSubscription=this.formTemplateService.getFormTemplates()
                                                             .subscribe((res)=>{this.formTemplateList=res; });
 }

refreshFormTemplateList()
{
  this.formTemplateService.getFormTemplates()
                          .subscribe(data=>{this.formTemplateList=data;})
}

}
