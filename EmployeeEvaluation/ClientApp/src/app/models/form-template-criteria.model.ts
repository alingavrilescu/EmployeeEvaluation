import { Guid } from "guid-typescript";

export class FormTemplateCriteria {
    //id?:Guid;
    //name:string = "";
    description: string = "";
    FormTemplateSectionId!: Guid;
}