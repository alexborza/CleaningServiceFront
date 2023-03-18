import { AppointmentStatus } from "./AppointmentStatus";
import { TimeSlot } from "./TimeSlot";

export class Appointment {
    id: number;
    cleaningServiceId: number;
    employeeId: number;
    cleaningDate: string;
    timeSlot: TimeSlot;
    status: AppointmentStatus;
}