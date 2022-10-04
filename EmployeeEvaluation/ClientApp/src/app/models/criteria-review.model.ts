import { Guid } from "guid-typescript";

export class CriteriaReview {
    id?: Guid;
    review: string = "";
    formCriteriaId?: Guid;
}