import { CleaningTypeEnum } from "./CleaningTypeEnum";
import { HomeAccessEnum } from "./HomeAccessEnum";
import { ParkingEnum } from "./ParkingEnum";

export class StandardCleaningDetailsDto {
    type!: CleaningTypeEnum;
    bedrooms!: number;
    bathrooms!: number;
    kitchens!: number;
    squareMeters!: number;
    parking!: ParkingEnum;
    homeAccess!: HomeAccessEnum;
}