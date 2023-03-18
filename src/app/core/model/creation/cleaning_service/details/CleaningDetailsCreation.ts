import { HomeAccess } from "../../../representation/cleaning_service/details/HomeAccess";
import { Parking } from "../../../representation/cleaning_service/details/Parking";

export abstract class CleaningDetailsCreation {
    squareMeters: number;
    parking: Parking;
    homeAccess: HomeAccess;
}