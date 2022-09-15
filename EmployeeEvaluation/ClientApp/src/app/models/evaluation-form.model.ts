import { Guid } from "guid-typescript";

export class EvaluationForm {
    id?:Guid;
    name:string = "";
    type: string = "";
    userId?: Guid;
}