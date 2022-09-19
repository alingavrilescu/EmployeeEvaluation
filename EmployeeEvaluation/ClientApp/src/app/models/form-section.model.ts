import { Guid } from "guid-typescript";

export class FormSection {
    id?:Guid;
    name:string = "";
    description: string = "";
    evaluationFormId?: Guid;
}