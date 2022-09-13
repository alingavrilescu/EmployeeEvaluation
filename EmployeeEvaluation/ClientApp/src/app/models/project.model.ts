import { Guid } from "guid-typescript";

export class Project {
    id?:Guid;
    name:string = "";
    description: string = "";
    departmentId?: Guid;
}
