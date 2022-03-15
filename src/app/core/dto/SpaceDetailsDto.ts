import { DayTimeOfficeCleaningEnum } from "./DayTimeOfficeCleaningEnum";
import { OfficeCleaningFrequencyEnum } from "./OfficeCleaningFrequencyEnum";
import { PrimaryUseOfSpaceEnum } from "./PrimaryUseOfSpaceEnum";

export class SpaceDetailsDto {
    primaryUseOfSpace!: PrimaryUseOfSpaceEnum;
    totalSquareMeters!: string;
    numberOfPersons!: string;
    frequencyOfCleaning!: OfficeCleaningFrequencyEnum;
    dayTime!: DayTimeOfficeCleaningEnum;
}