import { CleaningTypeEnum } from "../../../representation/cleaning_service/details/CleaningTypeEnum";
import { HomeAccess } from "../../../representation/cleaning_service/details/HomeAccess";
import { Parking } from "../../../representation/cleaning_service/details/Parking";
import { CleaningDetailsCreation } from "./CleaningDetailsCreation";

export class StandardCleaningDetailsCreation extends CleaningDetailsCreation {
    bedrooms: number;
    bathrooms: number;
    kitchens: number;

    constructor(
        squareMeters: number, 
        parking: Parking, 
        homeAccess: HomeAccess,
        bedrooms: number, 
        bathrooms: number, 
        kitchens: number) {

        super(squareMeters, parking, homeAccess, CleaningTypeEnum.StandardCleaning);
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.kitchens = kitchens;
    }
}