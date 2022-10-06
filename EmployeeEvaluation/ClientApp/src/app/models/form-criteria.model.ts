import { Guid } from "guid-typescript";
import { CriteriaReview } from "./criteria-review.model";

export class FormCriteria {
    id!: string;
    name: string = "";
    choice?: string | null;
    description: string = "";
    comment?: string;
    attachment?: string;
    formSectionId?: Guid;
    criteriaReviews?: CriteriaReview[];
}