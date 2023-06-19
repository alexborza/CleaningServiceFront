import { HomeAccess } from "./HomeAccess";
import { Parking } from "./Parking";

export class CleaningDetails {
    id: number;
    squareMeters: number;
    parking: Parking;
    homeAccess: HomeAccess;
}