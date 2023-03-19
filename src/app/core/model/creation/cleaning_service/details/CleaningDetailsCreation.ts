import { CleaningTypeEnum } from "../../../representation/cleaning_service/details/CleaningTypeEnum";
import { HomeAccess } from "../../../representation/cleaning_service/details/HomeAccess";
import { Parking } from "../../../representation/cleaning_service/details/Parking";


export abstract class CleaningDetailsCreation {
    squareMeters: number;
    parking: Parking;
    homeAccess: HomeAccess;
    type: CleaningTypeEnum;

    constructor(squareMeters: number, parking: Parking, homeAccess: HomeAccess, type: CleaningTypeEnum) {
        this.squareMeters = squareMeters;
        this.parking = parking;
        this.homeAccess = homeAccess;
        this.type = type;
    }
}