import { Guid } from "guid-typescript";
export class FormTemplate {
    id?:Guid;
    name:string="";
    departmentId?:Guid;
    type:string="";
}
