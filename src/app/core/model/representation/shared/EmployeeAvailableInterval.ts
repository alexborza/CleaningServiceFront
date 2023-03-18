import { TimeSlot } from "../appointment/TimeSlot";

export class EmployeeAvailableInterval {
    employeeId: number;
    availableInterval: TimeSlot;
    includedLunchBreak: boolean;
}