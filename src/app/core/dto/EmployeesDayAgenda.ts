import { AvailableInterval } from "./AvailableInterval";

export class EmployeesDayAgenda {
    employeeId!: number;
    availableIntervals!: AvailableInterval[];
    availableIntervalsForOverlapping: AvailableInterval[];
}