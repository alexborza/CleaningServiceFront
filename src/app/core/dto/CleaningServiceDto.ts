import { CleaningServiceType } from "src/app/lazy-loaded/cleaning/models/cleaning-service-type";
import { CleaningDateDto } from "./CleaningDateDto";
import { CleaningFrequencyEnum } from "./CleaningFrequencyEnum";
import { ContactInfoDto } from "./ContactInfoDto";
import { LocationDto } from "./LocationDto";
import { PaymentMethodEnum } from "./PaymentMethodEnum";

export class CleaningServiceDto {
    id!: number;
    contactInfo!: ContactInfoDto;
    location!: LocationDto;
    cleaningDetails: any;
    cleaningFrequency!: CleaningFrequencyEnum;
    cleaningDate!: CleaningDateDto;
    paymentMethod!: PaymentMethodEnum;
    total!: number;
    type!: CleaningServiceType;
}