import { CleaningType } from "src/app/core/model/representation/cleaning_service/CleaningType";
import { Appointment } from "../appointment/Appointment";
import { CleaningDateDto } from "../../CleaningDateDto";
import { Frequency } from "./Frequency";
import { CleaningStatusEnum } from "../../CleaningStatusEnum";
import { ContactInfo } from "./ContactInfo";
import { CleaningDetails } from "./details/CleaningDetails";
import { Location } from "./Location";
import { Message } from "./Message";
import { Payment } from "./Payment";

export class CleaningService {
    id: number;
    contactInfo: ContactInfo;
    location: Location;
    cleaningDetails: CleaningDetails;
    frequency: Frequency;
    payment: Payment;
    total: number;
    timeEstimation: number;
    type: CleaningType;
    messages: Message[];
    appointments: Appointment[];
}