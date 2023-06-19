import { CleaningTypeEnum } from "../../../representation/cleaning_service/details/CleaningTypeEnum";
import { HomeAccess } from "../../../representation/cleaning_service/details/HomeAccess";
import { Parking } from "../../../representation/cleaning_service/details/Parking";
import { Property } from "../../../representation/cleaning_service/details/Property";
import { CleaningDetailsCreation } from "./CleaningDetailsCreation";

export class DisinfectionCleaningDetailsCreation extends CleaningDetailsCreation {
    property: Property;

    constructor(squareMeters: number, parking: Parking, homeAccess: HomeAccess, property: Property) {
        super(squareMeters, parking, homeAccess, CleaningTypeEnum.DisinfectionCleaning);
        this.property = property;
    }
}