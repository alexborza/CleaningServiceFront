import { TimeSlot } from "../appointment/TimeSlot";
import { CleaningType } from "./CleaningType";

export class CleaningServiceMinimal {
    id: number;
    cleaningType: CleaningType;
    total: number;
    timeEstimation: number;
    nextCleaningDate: string;
    timeSlotRepresentation: TimeSlot;
    hourInterval: string;
}