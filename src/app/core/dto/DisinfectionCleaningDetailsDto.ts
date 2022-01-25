import { CleaningTypeEnum } from "./CleaningTypeEnum";
import { HomeAccessEnum } from "./HomeAccessEnum";
import { ParkingEnum } from "./ParkingEnum";
import { PropertyEnum } from "./PropertyEnum";

export class DisinfectionCleaningDetailsDto {
    type!: CleaningTypeEnum;
    property!: PropertyEnum;
    squareMeters!: number;
    parking!: ParkingEnum;
    homeAccess!: HomeAccessEnum;
}