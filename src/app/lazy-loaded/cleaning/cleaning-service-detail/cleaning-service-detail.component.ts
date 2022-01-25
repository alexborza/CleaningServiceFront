import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CleaningDateDto } from 'src/app/core/dto/CleaningDateDto';
import { CleaningFrequencyEnum } from 'src/app/core/dto/CleaningFrequencyEnum';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningTypeEnum } from 'src/app/core/dto/CleaningTypeEnum';
import { ContactInfoDto } from 'src/app/core/dto/ContactInfoDto';
import { DisinfectionCleaningDetailsDto } from 'src/app/core/dto/DisinfectionCleaningDetailsDto';
import { LocationDto } from 'src/app/core/dto/LocationDto';
import { PostConstructionCleaningDetailsDto } from 'src/app/core/dto/PostConstructionCleaningDetailsDto';
import { StandardCleaningDetailsDto } from 'src/app/core/dto/StandardCleaningDetailsDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningServiceType } from '../models/cleaning-service-type';

@Component({
  selector: 'app-cleaning-service-detail',
  templateUrl: './cleaning-service-detail.component.html',
  styleUrls: ['./cleaning-service-detail.component.scss']
})
export class CleaningServiceDetailComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  type!: CleaningServiceType;
  cleaningService!: CleaningServiceDto;
  cleaningServicePrice: number = 0;
  cleaningDetailsPrices: number = 0;
  discount: number = 0;
  frequency: string = '';
  cleaningDate: any;
  hour: string = '';
  bookedHours: string[] = [];
  bedroomPrices: number[] = [];
  bathroomPrices: number[] = [];
  kitchenPrices: number[] = [];
  roomPrices: number[] = [];
  propertyPrices: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cleaningApi: CleaningApiService
    ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.setCleaningPrices();
    this.buildForm();
    this.setBookingSummary();
    this.getBookedHoursForDate();
  }

  private getRouteData(){
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private setCleaningPrices(){
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
        this.cleaningServicePrice = 50;
        this.bedroomPrices = [10, 20, 30, 40, 50, 60];
        this.bathroomPrices = [15, 30, 45, 60, 75, 90];
        this.kitchenPrices = [15, 30, 45, 60, 75, 90];
        break;
      case CleaningServiceType.DeepCleaning:
        this.cleaningServicePrice = 80;
        this.bedroomPrices = [12, 24, 36, 48, 60, 72];
        this.bathroomPrices = [18, 36, 54, 72, 90, 106];
        this.kitchenPrices = [18, 36, 54, 72, 90, 106];
        break;
      case CleaningServiceType.PostContructionCleaning:
        this.cleaningServicePrice = 100;
        this.propertyPrices = [50, 100, 150];
        this.roomPrices = [20, 40, 60, 90, 110, 140, 170, 200, 230, 260];
        break;
      case CleaningServiceType.DisinfectionCleaning:
        this.cleaningServicePrice = 110;
        this.propertyPrices = [50, 100, 150];
        break;
      default:
        break;
    }
  }

  public isStandardDetail(){
    return this.type === CleaningServiceType.StandardCleaning || 
           this.type === CleaningServiceType.DeepCleaning;
  }

  private buildForm(){
    this.form = this.fb.group({
      contact_info: this.fb.group({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }),
      location: this.fb.group({
        county: null,
        city: '',
        address: ''
      }),
      cleaning_details: this.fb.group({
        squareMeters: null,
        parking: null,
        homeAccess: null,
      }),
      cleaning_date: this.fb.group({
        cleaningDate: null,
        hour: null
      }),
      payment: this.fb.group({
        paymentMethod: null,
        cardNumber: '',
        expirationDate: '',
        cvc: '',
        holderName: ''
      })
    })

    const cleaning_details = this.form.get('cleaning_details') as FormGroup;
    this.completeFormGroup(cleaning_details);
    
  }

  private completeFormGroup(cleaning_details: FormGroup){
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
      case CleaningServiceType.DeepCleaning:
        this.frequency = "One Time";
        this.form.addControl('frequency', new FormControl({label: "One Time", value: CleaningFrequencyEnum.OneTime, discount: 0}));
        this.addCleaningDetailsControls(cleaning_details, ['bedrooms', 'bathrooms', 'kitchens']);
        break;
      case CleaningServiceType.PostContructionCleaning:
        this.addCleaningDetailsControls(cleaning_details, ['property', 'rooms']);
        break;
      case CleaningServiceType.DisinfectionCleaning:
        this.addCleaningDetailsControls(cleaning_details, ['property']);
        break;
      default:
        break;
    }
  }

  private addCleaningDetailsControls(cleaning_details: FormGroup, controls: string[]){
    controls.forEach(control => {
      cleaning_details.addControl(control, this.fb.control(null));
    })
  }

  public onSubmit(formValue: any){
    this.cleaningService = this.getCleaningServiceDto(formValue);
    console.log(this.cleaningService);
    this.cleaningApi.createCleaningService(this.cleaningService).subscribe();
  }

  private getCleaningServiceDto(formValue: any){
    const contactInfo = this.createContactInfoDto(formValue);
    const location = this.createLocationDto(formValue);
    const cleaningDate = this.createCleaningDateDto(formValue);
    const cleaningDetails = this.createCleaningDetailsDto(formValue);
    
    let cleaningServiceDto = new CleaningServiceDto();
    cleaningServiceDto.contactInfo = contactInfo;
    cleaningServiceDto.location = location;
    cleaningServiceDto.cleaningDetails = cleaningDetails;
    if(this.type === CleaningServiceType.StandardCleaning || this.type === CleaningServiceType.DeepCleaning){
      cleaningServiceDto.cleaningFrequency = formValue.frequency.value;
    }
    cleaningServiceDto.cleaningDate = cleaningDate;
    cleaningServiceDto.paymentMethod = formValue.payment.paymentMethod;
    cleaningServiceDto.total = this.cleaningServicePrice + this.cleaningDetailsPrices - ((this.cleaningServicePrice + this.cleaningDetailsPrices) * this.discount/100);
    return cleaningServiceDto;
  }

  private createCleaningDateDto(formValue: any){
    const cleaningDate = new CleaningDateDto();
    console.log(new Date().getTime() > new Date(formValue.cleaning_date.cleaningDate).getTime());
    cleaningDate.cleaningDate = formValue.cleaning_date.cleaningDate;
    cleaningDate.cleaningHour = formValue.cleaning_date.hour;
    return cleaningDate;
  }

  private createLocationDto(formValue: any){
    const location = new LocationDto();
    location.county = formValue.location.county;
    location.city = formValue.location.city;
    location.address = formValue.location.address;
    return location;
  }

  private createContactInfoDto(formValue: any) {
    const contactInfo = new ContactInfoDto();
    contactInfo.firstName = formValue.contact_info.firstName;
    contactInfo.lastName = formValue.contact_info.lastName;
    contactInfo.email = formValue.contact_info.email;
    contactInfo.phoneNumber = formValue.contact_info.phoneNumber;
    return contactInfo;
  }

  private createCleaningDetailsDto(formValue: any) {
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
      case CleaningServiceType.DeepCleaning:
        return this.createStandardCleaningDetailsDto(formValue);
      case CleaningServiceType.PostContructionCleaning:
        return this.createPostConstructionCleaningDetailsDto(formValue);
      case CleaningServiceType.DisinfectionCleaning:
        return this.createDisinfectionCleaningDetailsDto(formValue);
      default:
        return null;
    }
  }

  private createStandardCleaningDetailsDto(formValue: any) {
    const standardCleaningDetailsDto = new StandardCleaningDetailsDto();
    standardCleaningDetailsDto.type = CleaningTypeEnum.StandardCleaning;
    standardCleaningDetailsDto.bedrooms = formValue.cleaning_details.bedrooms.value;
    standardCleaningDetailsDto.bathrooms = formValue.cleaning_details.bathrooms.value;
    standardCleaningDetailsDto.kitchens = formValue.cleaning_details.kitchens.value;
    standardCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters;
    standardCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    standardCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return standardCleaningDetailsDto;
  }

  private createPostConstructionCleaningDetailsDto(formValue: any) {
    const postConstructionCleaningDetailsDto = new PostConstructionCleaningDetailsDto();
    postConstructionCleaningDetailsDto.type = CleaningTypeEnum.PostConstructionCleaning;
    postConstructionCleaningDetailsDto.property = formValue.cleaning_details.property.value;
    postConstructionCleaningDetailsDto.rooms = formValue.cleaning_details.rooms.value;
    postConstructionCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters;
    postConstructionCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    postConstructionCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return postConstructionCleaningDetailsDto;
  }

  private createDisinfectionCleaningDetailsDto(formValue: any) {
    const disinfectionCleaningDetailsDto = new DisinfectionCleaningDetailsDto();
    disinfectionCleaningDetailsDto.type = CleaningTypeEnum.DisinfectionCleaning;
    disinfectionCleaningDetailsDto.property = formValue.cleaning_details.property.value;
    disinfectionCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters;
    disinfectionCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    disinfectionCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return disinfectionCleaningDetailsDto;
  }

  private setBookingSummary(){
    const cleaning_details = this.form.get('cleaning_details') as FormGroup;
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    this.form.valueChanges.subscribe(res => {
      let cleaningPrice: number = 0;
      Object.keys(cleaning_details.controls).forEach(key => {
        if(cleaning_details.controls[key].value?.price != undefined){
          cleaningPrice += cleaning_details.controls[key].value?.price;
        }
      });
      this.cleaningDetailsPrices = cleaningPrice;
      if(this.form.get('frequency')?.value?.discount != undefined){
        this.discount = this.form.get('frequency')?.value?.discount;
        this.frequency = this.form.get('frequency')?.value?.label;
      }

      this.cleaningDate = cleaning_date.get('cleaningDate')?.value != null ? new Date(cleaning_date.get('cleaningDate')?.value) : null ;
      this.hour = cleaning_date.get('hour')?.value;
    })
  }

  private getBookedHoursForDate(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_date.get('cleaningDate')?.valueChanges.subscribe(cleaningDate => {
      this.cleaningApi.getBookedHoursForDate(cleaningDate).subscribe(res => {
        this.bookedHours = res;
      })
    });
  }
}
