import { DayTimeOfficeCleaningEnum } from "./DayTimeOfficeCleaningEnum";
import { OfficeCleaningFrequencyEnum } from "./OfficeCleaningFrequencyEnum";
import { PrimaryUseOfSpaceEnum } from "./PrimaryUseOfSpaceEnum";

export class SpaceDetailsDto {
    primaryUseOfSpace!: PrimaryUseOfSpaceEnum;
    totalSquareMeters!: number;
    numberOfPersons!: string;
    frequencyOfCleaning!: OfficeCleaningFrequencyEnum;
    dayTime!: DayTimeOfficeCleaningEnum;
}