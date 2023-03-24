import { TimeSlot } from "../../representation/appointment/TimeSlot";

export class AppointmentCreation {
    employeeId: number;
    cleaningDate: string;
    timeSlot: TimeSlot;

    constructor(employeeId: number, cleaningDate: string, timeSlot: TimeSlot) {
        this.employeeId = employeeId;
        this.cleaningDate = cleaningDate;
        this.timeSlot = timeSlot;
    }
}