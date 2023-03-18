import { CleaningType } from "../../representation/cleaning_service/CleaningType";
import { Frequency } from "../../representation/cleaning_service/Frequency";
import { Payment } from "../../representation/cleaning_service/Payment";
import { AppointmentCreation } from "../appointment/AppointmentCreation";
import { ContactInfoCreation } from "./ContactInfoCreation";
import { CleaningDetailsCreation } from "./details/CleaningDetailsCreation";
import { LocationCreation } from "./LocationCreation";

export class CleaningServiceCreation {
    contactInfo: ContactInfoCreation;
    location: LocationCreation;
    cleaningDetails: CleaningDetailsCreation;
    frequency: Frequency;
    payment: Payment;
    total: number;
    timeEstimation: number;
    type: CleaningType;
    appointments: AppointmentCreation[];
}