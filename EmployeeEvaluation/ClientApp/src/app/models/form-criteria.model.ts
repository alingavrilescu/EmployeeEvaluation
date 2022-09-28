import { Guid } from "guid-typescript";
import { CriteriaComments } from "./criteria-comments.model";

export class FormCriteria {
    id?:Guid;
    name:string = "";
    isChecked: boolean = false;
    description: string = "";
    formSectionId?: Guid;
    criteriaComments: CriteriaComments[] = [];
}