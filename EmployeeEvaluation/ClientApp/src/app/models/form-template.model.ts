import { Guid } from "guid-typescript";
export class FormTemplate {
    id?:Guid;
    name:string="";
    description:string="";
    departmentId?:Guid;
}
