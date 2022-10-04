import { Guid } from "guid-typescript";
import { CriteriaReview } from "./criteria-review.model";

export class FormCriteria {
    id?: Guid;
    name: string = "";
    choice: string = "";
    description: string = "";
    comment: string = "";
    attachment: string = "";
    formSectionId?: Guid;
    criteriaReviews?: CriteriaReview[];
}