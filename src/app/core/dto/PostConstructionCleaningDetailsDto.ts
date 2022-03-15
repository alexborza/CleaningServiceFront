import { CleaningTypeEnum } from "./CleaningTypeEnum";
import { HomeAccessEnum } from "./HomeAccessEnum";
import { ParkingEnum } from "./ParkingEnum";
import { PropertyEnum } from "./PropertyEnum";

export class PostConstructionCleaningDetailsDto {
    type!: CleaningTypeEnum;
    property!: PropertyEnum;
    rooms!: number;
    squareMeters!: string;
    parking!: ParkingEnum;
    homeAccess!: HomeAccessEnum;
}