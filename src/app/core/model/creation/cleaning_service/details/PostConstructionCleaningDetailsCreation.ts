import { CleaningTypeEnum } from "../../../representation/cleaning_service/details/CleaningTypeEnum";
import { HomeAccess } from "../../../representation/cleaning_service/details/HomeAccess";
import { Parking } from "../../../representation/cleaning_service/details/Parking";
import { Property } from "../../../representation/cleaning_service/details/Property";
import { CleaningDetailsCreation } from "./CleaningDetailsCreation";

export class PostConstructionCleaningDetailsCreation extends CleaningDetailsCreation {
    property: Property;
    rooms: number;

    constructor(squareMeters: number, parking: Parking, homeAccess: HomeAccess, property: Property, rooms: number) {
        super(squareMeters, parking, homeAccess, CleaningTypeEnum.PostConstructionCleaning);
        this.property = property;
        this.rooms = rooms;
    }
}