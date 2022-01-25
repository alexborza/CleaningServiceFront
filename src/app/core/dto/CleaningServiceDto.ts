import { CleaningDateDto } from "./CleaningDateDto";
import { CleaningFrequencyEnum } from "./CleaningFrequencyEnum";
import { ContactInfoDto } from "./ContactInfoDto";
import { LocationDto } from "./LocationDto";
import { PaymentMethodEnum } from "./PaymentMethodEnum";

export class CleaningServiceDto {
    contactInfo!: ContactInfoDto;
    location!: LocationDto;
    cleaningDetails: any;
    cleaningFrequency!: CleaningFrequencyEnum;
    cleaningDate!: CleaningDateDto;
    paymentMethod!: PaymentMethodEnum;
    total!: number;
}