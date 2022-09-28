import { Guid } from "guid-typescript";
import { Department } from "./department.model";

export class Project {
    id?:Guid;
    name:string = "";
    description: string = "";
    departmentId?: Guid;
    department?:Department;
    projectManagerId?:string;
    teamLeadId?:string;
}
