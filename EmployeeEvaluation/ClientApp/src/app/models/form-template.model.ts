import { Guid } from "guid-typescript";
import { FormTemplateSection } from "./form-template-section.model";
export class FormTemplate {
    id!:Guid;
    name:string="";
    departmentId!:Guid;
    type:string="";
    templateSections:FormTemplateSection[]=[];
}
