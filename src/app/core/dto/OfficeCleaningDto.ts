import { ContactInfoDto } from "./ContactInfoDto";
import { LocationDto } from "./LocationDto";
import { OfficeCleaningQuoteRequestDto } from "./OfficeCleaningQuoteRequestDto";
import { OfficeCleaningStatusEnum } from "./OfficeCleaningStatusEnum";
import { SpaceDetailsDto } from "./SpaceDetailsDto";
import { SpaceTypeDto } from "./SpaceTypeDto";

export class OfficeCleaningDto {
    id!: number;
    spaceDetails!: SpaceDetailsDto;
    spaceType!: SpaceTypeDto;
    contactInfo!: ContactInfoDto;
    location!: LocationDto;
    status!: OfficeCleaningStatusEnum;
    quoteRequest!: OfficeCleaningQuoteRequestDto;

    constructor(spaceDetails: SpaceDetailsDto, spaceType: SpaceTypeDto, contactInfo: ContactInfoDto, location: LocationDto, status: OfficeCleaningStatusEnum){
        this.spaceDetails = spaceDetails;
        this.spaceType = spaceType;
        this.contactInfo = contactInfo;
        this.location = location;
        this.status = status;
    }
}