import { Guid } from "guid-typescript";
import { FormTemplateCriteria } from "./form-template-criteria.model";

export class FormTemplateSection {
    id?:Guid;
    name:string = "";
    description: string = "";
    FormTemplateId!: Guid;
    formTemplateCriteria:FormTemplateCriteria[]=[];
}