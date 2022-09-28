import { Guid } from "guid-typescript";
import { FormSection } from "./form-section.model";

export class EvaluationForm {
    id?: Guid;
    name: string = "";
    type: string = "";
    userId?: Guid;
    formSections: FormSection[] = [];
}