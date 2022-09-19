import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/form-template.model';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
  providers: [MessageService]
})

export class FormTemplateComponent implements OnInit,OnDestroy {

  isSubmitted = false;
  Type: any = ['Junior', 'Intermediate', 'Senior', 'Expert'];
  registrationForm!:FormGroup;
  sectionRegistrationForm!:FormGroup;
  criterionRegistrationForm!:FormGroup;
  formTemplateList: FormTemplate[]=[];
  formTemplateName = "";
  formTemplateDepartmentId!:Guid;
  formTemplateType="";
  formTemplateId!:Guid;
  //departmentId!:Guid;
  addFormTemplateSubscription!:Subscription;
  updateFormTemplateSubscription!:Subscription;
  deleteFormTemplateSubscription!:Subscription;
  getFormTemplatesSubscription!:Subscription;

  constructor(private fb:FormBuilder,private formTemplateService:FormTemplateService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig) { }
  
  ngOnInit(): void {
    this.refreshFormTemplateList();
    this.registrationForm = this.fb.group({
      name: ['', Validators.required,Validators.minLength(2)],
      type:['', [Validators.required]]
    });
    this.sectionRegistrationForm=this.fb.group({
      name:['',Validators.required,Validators.minLength(2)],
      description:['',[Validators.required]]
    })
    this.criterionRegistrationForm=this.fb.group({
      name:['',Validators.required,Validators.minLength(2)],
      description:['',[Validators.required]]
    })
    this.primengConfig.ripple = true;
  }
  
 ngOnDestroy(): void {
  this.addFormTemplateSubscription?.unsubscribe;
  this.deleteFormTemplateSubscription?.unsubscribe;
  this.updateFormTemplateSubscription?.unsubscribe;
  this.getFormTemplatesSubscription?.unsubscribe;
 }
 onSubmit(form: FormGroup) {
  this.isSubmitted=true;
  console.log('Valid?', form.valid); // true or false
  console.log('Name', form.value.name);
  console.log('Type', form.value.type);
}

changeType(e: any) {
  this.Type?.setValue(e.target.value, {
    onlySelf: true,
  });
}
get getType() {
  return this.registrationForm.get('Type');
}
 addFormTemplate(){
  var temp={
    name:this.formTemplateName,
    type:this.formTemplateType,
    departmentId:this.formTemplateDepartmentId
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
  console.log("s-a sters");
}

showConfirm() {
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure you want to delete?', detail:'Confirm to proceed'});
}


onConfirm() {
  
  //this.deleteFormTemplate(id);
  this.messageService.clear('c');
}

onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}

//  getFormTemplates(departmentId:Guid){
//    this.getFormTemplatesSubscription=this.formTemplateService.getFormTemplates(departmentId)
//                                                              .subscribe((res)=>{this.formTemplateList=res; });
//  }
 getFormTemplates(){
  this.getFormTemplatesSubscription=this.formTemplateService.getFormTemplates()
                                                            .subscribe((res)=>{this.formTemplateList=res; });
}


// refreshFormTemplateList(departmentId:Guid)
// {
//   this.formTemplateService.getFormTemplates(departmentId)
//                           .subscribe(data=>{this.formTemplateList=data;})
// }
refreshFormTemplateList()
{
  this.formTemplateService.getFormTemplates()
                          .subscribe(data=>{this.formTemplateList=data;})
}

getData(formTemplate:FormTemplate)
{
  if(formTemplate.id)
  {
    this.formTemplateId=formTemplate.id;
  }
  this.formTemplateName = formTemplate.name;
  this.formTemplateType = formTemplate.type;
}

}
