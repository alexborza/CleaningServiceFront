import { ContactInfoDto } from "./ContactInfoDto";
import { LocationDto } from "./LocationDto";
import { SpaceDetailsDto } from "./SpaceDetailsDto";
import { SpaceTypeDto } from "./SpaceTypeDto";

export class OfficeCleaningDto {
    id!: number;
    spaceDetails!: SpaceDetailsDto;
    spaceType!: SpaceTypeDto;
    contactInfo!: ContactInfoDto;
    location!: LocationDto;

    constructor(spaceDetails: SpaceDetailsDto, spaceType: SpaceTypeDto, contactInfo: ContactInfoDto, location: LocationDto){
        this.spaceDetails = spaceDetails;
        this.spaceType = spaceType;
        this.contactInfo = contactInfo;
        this.location = location;
    }
}