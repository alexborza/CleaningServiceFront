import { Property } from "../../../representation/cleaning_service/details/Property";
import { CleaningDetailsCreation } from "./CleaningDetailsCreation";

export class PostConstructionCleaningDetailsCreation extends CleaningDetailsCreation {
    property: Property;
    rooms: number;
}