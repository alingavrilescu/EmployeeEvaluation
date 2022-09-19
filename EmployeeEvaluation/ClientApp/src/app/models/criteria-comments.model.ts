import { Guid } from "guid-typescript";

export class CriteriaComments {
    id?:Guid;
    comment:string = "";
    attachment: string = "";
}