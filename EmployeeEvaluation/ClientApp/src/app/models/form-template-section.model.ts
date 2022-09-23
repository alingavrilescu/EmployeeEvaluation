import { Guid } from "guid-typescript";

export class FormTemplateSection {
    id?:Guid;
    name:string = "";
    description: string = "";
    FormTemplateId!: Guid;
}