import { DayTimeOfficeCleaningEnum } from "./DayTimeOfficeCleaningEnum";
import { OfficeCleaningFrequencyEnum } from "./OfficeCleaningFrequencyEnum";

export class SpaceDetailsDto {
    totalSquareMeters!: number;
    numberOfPersons!: string;
    frequencyOfCleaning!: OfficeCleaningFrequencyEnum;
    dayTime!: DayTimeOfficeCleaningEnum;
}