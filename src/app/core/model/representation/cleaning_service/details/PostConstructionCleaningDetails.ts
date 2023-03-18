import { Property } from "./Property";
import { CleaningDetails } from "./CleaningDetails";

export class PostContructionCleaningDetails extends CleaningDetails {
    property: Property;
    rooms: number;
}