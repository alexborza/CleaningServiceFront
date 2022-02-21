import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContactInfoDto } from 'src/app/core/dto/ContactInfoDto';
import { LocationDto } from 'src/app/core/dto/LocationDto';
import { OfficeCleaningDto } from 'src/app/core/dto/OfficeCleaningDto';
import { OfficeCleaningStatusEnum } from 'src/app/core/dto/OfficeCleaningStatusEnum';
import { SpaceDetailsDto } from 'src/app/core/dto/SpaceDetailsDto';
import { SpaceTypeDto } from 'src/app/core/dto/SpaceTypeDto';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { OfficeCleaningApiService } from 'src/app/core/services/office-cleaning-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CleaningServiceType } from '../models/cleaning-service-type';

@Component({
  selector: 'app-office-cleaning',
  templateUrl: './office-cleaning.component.html',
  styleUrls: ['./office-cleaning.component.scss']
})
export class OfficeCleaningComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  type!: CleaningServiceType;
  officeCleaning!: OfficeCleaningDto;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private officeApi: OfficeCleaningApiService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.buildForm();
  }

  private getRouteData(){
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private buildForm(){
    this.form = this.fb.group({
      space_details: this.fb.group({
        primaryUse: new FormControl(null, [Validators.required]),
        totalSquareMeters: new FormControl(null, [Validators.required]),
        numberOfPersons: new FormControl(null, [Validators.required]),
        frequencyOfCleaning: new FormControl(null, [Validators.required]),
        dayTime: new FormControl(null, [Validators.required]),
      }),
      space_type: this.fb.group({
        enclosedOffices: 0,
        workStations: 0,
        meetingRooms: 0,
        bathrooms: 0,
        toilets: 0,
        hallways: 0,
        cafeterias: 0
      }),
      contact_info: this.fb.group({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null, [Validators.required]),
      }),
      location: this.fb.group({
        county: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
      }),
    })
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      this.officeCleaning = this.getOfficeCleaningDto(formValue);
      const user = this.tokenStorage.getUser();
      this.officeApi.quoteRequestForOfficeCleaning(user?.id === undefined ? null : user.id, this.officeCleaning).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully requested a quote for an ' + this.type + ' Service'});  
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The field is required'});
    }
  }

  private getOfficeCleaningDto(formValue: any): OfficeCleaningDto{
    const spaceDetails = this.createSpaceDetailsDto(formValue.space_details);
    const spaceType = this.createSpaceTypeDto(formValue.space_type);
    const contactInfo = this.createContactInfoDto(formValue.contact_info);
    const location = this.createLocationDto(formValue.location);
    return new OfficeCleaningDto(spaceDetails, spaceType, contactInfo, location, OfficeCleaningStatusEnum.NotSent);
  }

  private createSpaceDetailsDto(space_details: any){
    const spaceDetails = new SpaceDetailsDto();
    spaceDetails.primaryUseOfSpace = space_details.primaryUse.value;
    spaceDetails.totalSquareMeters = space_details.totalSquareMeters;
    spaceDetails.numberOfPersons = space_details.numberOfPersons.label;
    spaceDetails.frequencyOfCleaning = space_details.frequencyOfCleaning.value;
    spaceDetails.dayTime = space_details.dayTime.value;
    return spaceDetails;
  }

  private createSpaceTypeDto(space_type: any){
    const spaceType = new SpaceTypeDto();
    spaceType.enclosedOffices = space_type.enclosedOffices;
    spaceType.workStations = space_type.workStations;
    spaceType.meetingRooms = space_type.meetingRooms;
    spaceType.bathrooms = space_type.bathrooms;
    spaceType.toilets = space_type.toilets;
    spaceType.hallways = space_type.hallways;
    spaceType.cafeterias = space_type.cafeterias;
    return spaceType;
  }

  private createContactInfoDto(contact_info: any){
    const contactInfo = new ContactInfoDto();
    contactInfo.firstName = contact_info.firstName;
    contactInfo.lastName = contact_info.lastName;
    contactInfo.email = contact_info.email;
    contactInfo.phoneNumber = contact_info.phoneNumber;
    return contactInfo;
  }

  private createLocationDto(formValueLocation: any){
    const location = new LocationDto();
    location.county = formValueLocation.county;
    location.city = formValueLocation.city;
    location.address = formValueLocation.address;
    return location;
  }

  private checkRequiredFields(){
    checkRequiredFields((this.form.get('contact_info') as FormGroup).controls);
    checkRequiredFields((this.form.get('location') as FormGroup).controls);
    checkRequiredFields((this.form.get('space_details') as FormGroup).controls);
  }
}
