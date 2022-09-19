import { Guid } from "guid-typescript";

export class FormCriteria {
    id?:Guid;
    name:string = "";
    isChecked: boolean = false;
    description: string = "";
    formSectionId?: Guid;
}