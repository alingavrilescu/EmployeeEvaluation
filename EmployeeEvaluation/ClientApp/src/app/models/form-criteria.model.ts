import { Guid } from "guid-typescript";
import { CriteriaReview } from "./criteria-review.model";

export class FormCriteria {
    id?:Guid;
    name:string = "";
    isChecked: boolean = false;
    description: string = "";
    review: string = "";
    formSectionId?: Guid;
    criteriaReviews: CriteriaReview[] = [];
}