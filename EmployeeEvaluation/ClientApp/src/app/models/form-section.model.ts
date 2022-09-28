import { Guid } from "guid-typescript";
import { FormCriteria } from "./form-criteria.model";

export class FormSection {
    id?:Guid;
    name:string = "";
    description: string = "";
    evaluationFormId?: Guid;
    formCriteria: FormCriteria[] = [];
}