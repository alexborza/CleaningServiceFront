import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AvailableHour } from 'src/app/core/dto/AvailableHour';
import { CleaningDateDto } from 'src/app/core/dto/CleaningDateDto';
import { CleaningFrequencyEnum } from 'src/app/core/dto/CleaningFrequencyEnum';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningServicePricesDto } from 'src/app/core/dto/CleaningServicePricesDto';
import { CleaningTypeEnum } from 'src/app/core/dto/CleaningTypeEnum';
import { ContactInfoDto } from 'src/app/core/dto/ContactInfoDto';
import { DisinfectionCleaningDetailsDto } from 'src/app/core/dto/DisinfectionCleaningDetailsDto';
import { EmployeesDayAgenda } from 'src/app/core/dto/EmployeesDayAgenda';
import { LocationDto } from 'src/app/core/dto/LocationDto';
import { PostConstructionCleaningDetailsDto } from 'src/app/core/dto/PostConstructionCleaningDetailsDto';
import { StandardCleaningDetailsDto } from 'src/app/core/dto/StandardCleaningDetailsDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
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
  cleaningServicePricesDto: CleaningServicePricesDto;
  pickUpKeysPrice: number;
  paidParkingSpotPrice: number;
  cleaningServicePrice: number = 0;
  cleaningDetailsPrices: number = 0;
  cleaningFrequency: CleaningFrequencyEnum;
  discount: number = 0;
  frequency: string = '';
  cleaningDate: any;
  hour!: AvailableHour;
  property: string = '';
  timeEstimation!: number;
  employeesDayAgenda: EmployeesDayAgenda[] = []
  bedroomPrices: number[] = [];
  bathroomPrices: number[] = [];
  kitchenPrices: number[] = [];
  roomPrices: number[] = [];
  propertyPrices: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cleaningApi: CleaningApiService,
    private employeeApi: EmployeeApiService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.getCleaningServicePrices();
    this.buildForm();
    this.setBookingSummary();
    this.getEmployeesAgendaForDate();
  }

  private getRouteData(){
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private getCleaningServicePrices(){
    this.cleaningApi.getCleaningServicePrices().subscribe(res => {
      this.cleaningServicePricesDto = res;
      this.setCleaningPrices();
    })
  }

  private setCleaningPrices(){
    this.pickUpKeysPrice = this.cleaningServicePricesDto.pickUpKeysPrice;
    this.paidParkingSpotPrice = this.cleaningServicePricesDto.paidParkingSpotPrice;
    
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
        let sbedroomPrice = this.cleaningServicePricesDto.standardCleaningPrices.standardServiceBedroom;
        let sbathroomPrice = this.cleaningServicePricesDto.standardCleaningPrices.standardServiceBathroom;
        let skitchenPrice = this.cleaningServicePricesDto.standardCleaningPrices.standardServiceKitchen;
        this.cleaningServicePrice = this.cleaningServicePricesDto.standardCleaningPrices.standardServicePrice;
        this.bedroomPrices = [sbedroomPrice, sbedroomPrice * 2, sbedroomPrice * 3, sbedroomPrice * 4, sbedroomPrice * 5, sbedroomPrice * 6];
        this.bathroomPrices = [sbathroomPrice, sbathroomPrice * 2, sbathroomPrice * 3, sbathroomPrice * 4, sbathroomPrice * 5, sbathroomPrice * 6];
        this.kitchenPrices = [skitchenPrice, skitchenPrice * 2, skitchenPrice * 3, skitchenPrice * 4, skitchenPrice * 5, skitchenPrice * 6];
        break;
      case CleaningServiceType.DeepCleaning:
        let dbedroomPrice = this.cleaningServicePricesDto.deepCleaningPrices.deepServiceBedroom;
        let dbathroomPrice = this.cleaningServicePricesDto.deepCleaningPrices.deepServiceBathroom;
        let dkitchenPrice = this.cleaningServicePricesDto.deepCleaningPrices.deepServiceKitchen;
        this.cleaningServicePrice = this.cleaningServicePricesDto.deepCleaningPrices.deepServicePrice;
        this.bedroomPrices = [dbedroomPrice, dbedroomPrice * 2, dbedroomPrice * 3, dbedroomPrice * 4, dbedroomPrice * 5, dbedroomPrice * 6];
        this.bathroomPrices = [dbathroomPrice, dbathroomPrice * 2, dbathroomPrice * 3, dbathroomPrice * 4, dbathroomPrice * 5, dbathroomPrice * 6];
        this.kitchenPrices = [dkitchenPrice, dkitchenPrice * 2, dkitchenPrice * 3, dkitchenPrice * 4, dkitchenPrice * 5, dkitchenPrice * 6];
        break;
      case CleaningServiceType.PostContructionCleaning:
        let room = this.cleaningServicePricesDto.postConstructionCleaningPrices.roomPrice;
        this.cleaningServicePrice = this.cleaningServicePricesDto.postConstructionCleaningPrices.postConstructionServicePrice;
        this.propertyPrices = [50, 100, 150]; // ce facem cu property prices?
        this.roomPrices = [room, room * 2, room * 3, room * 4, room * 5, room * 6, room * 7, room * 8, room * 9, room * 10];
        break;
      case CleaningServiceType.DisinfectionCleaning:
        this.cleaningServicePrice = this.cleaningServicePricesDto.disinfectionCleaningPrices.disinfectionServicePrice;
        this.propertyPrices = [50, 100, 150]; // ce facem cu property prices?
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
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null, [Validators.required])
      }),
      location: this.fb.group({
        county: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
      }),
      cleaning_details: this.fb.group({
        squareMeters: new FormControl(null, [Validators.required]),
        parking: new FormControl(null, [Validators.required]),
        homeAccess: new FormControl(null, [Validators.required]),
      }),
      cleaning_date: this.fb.group({
        cleaningDate: new FormControl({value: null, disabled: true}, [Validators.required]),
        hour: new FormControl(null, [Validators.required]),
      }),
      payment: this.fb.group({
        paymentMethod: null,
        cardNumber: null,
        expirationDate: null,
        cvc: null,
        holderName: null
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
      cleaning_details.addControl(control, new FormControl(null, [Validators.required]));
    })
  }

  public onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      this.cleaningService = this.getCleaningServiceDto(formValue);
      const employeeId = formValue.cleaning_date.hour.employeeId;
      const user = this.tokenStorage.getUser();
      this.cleaningApi.createCleaningService(employeeId, user?.id === undefined ? null : user.id, this.cleaningService).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully booked a ' + this.type + ' Service'});
        this.form.reset();
        const frequencyControl = this.form.get('frequency');
        if(frequencyControl){
          frequencyControl.setValue({label: "One Time", value: CleaningFrequencyEnum.OneTime, discount: 0});
        }
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The field is required'});
    }
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
    cleaningServiceDto.type = this.type;
    cleaningServiceDto.timeEstimation = this.timeEstimation;
    return cleaningServiceDto;
  }

  private createCleaningDateDto(formValue: any){
    const cleaningDate = new CleaningDateDto();
    cleaningDate.cleaningDate = formValue.cleaning_date.cleaningDate;
    cleaningDate.startingHour = formValue.cleaning_date.hour.interval.startingHour;
    cleaningDate.finishingHour = formValue.cleaning_date.hour.interval.endingHour;
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
    standardCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters.label;
    standardCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    standardCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return standardCleaningDetailsDto;
  }

  private createPostConstructionCleaningDetailsDto(formValue: any) {
    const postConstructionCleaningDetailsDto = new PostConstructionCleaningDetailsDto();
    postConstructionCleaningDetailsDto.type = CleaningTypeEnum.PostConstructionCleaning;
    postConstructionCleaningDetailsDto.property = formValue.cleaning_details.property.value;
    postConstructionCleaningDetailsDto.rooms = formValue.cleaning_details.rooms.value;
    postConstructionCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters.label;
    postConstructionCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    postConstructionCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return postConstructionCleaningDetailsDto;
  }

  private createDisinfectionCleaningDetailsDto(formValue: any) {
    const disinfectionCleaningDetailsDto = new DisinfectionCleaningDetailsDto();
    disinfectionCleaningDetailsDto.type = CleaningTypeEnum.DisinfectionCleaning;
    disinfectionCleaningDetailsDto.property = formValue.cleaning_details.property.value;
    disinfectionCleaningDetailsDto.squareMeters = formValue.cleaning_details.squareMeters.label;
    disinfectionCleaningDetailsDto.parking = formValue.cleaning_details.parking.value;
    disinfectionCleaningDetailsDto.homeAccess = formValue.cleaning_details.homeAccess.value;
    return disinfectionCleaningDetailsDto;
  }

  private checkRequiredFields(){
    checkRequiredFields((this.form.get('contact_info') as FormGroup).controls);
    checkRequiredFields((this.form.get('location') as FormGroup).controls);
    checkRequiredFields((this.form.get('cleaning_details') as FormGroup).controls);
    checkRequiredFields((this.form.get('cleaning_date') as FormGroup).controls);
  }

  private setBookingSummary(){
    this.getFrequencyForBookingSummary();
    this.getCleaningDateForBookingSummary();
    this.getTimeEstimation();
    this.getCleaningDetailsForBookingSummary(); 
  }

  private getFrequencyForBookingSummary(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    this.form.get('frequency')?.valueChanges.subscribe(res => {
      if(res){
        cleaning_date.get('cleaningDate')?.setValue(null)
        this.cleaningFrequency = res?.value;
        this.discount = res?.discount;
        this.frequency = res?.label;
      }
    })
  }

  private getCleaningDateForBookingSummary(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_date.valueChanges.subscribe(res => {
      if(res?.cleaningDate){
        this.cleaningDate = res.cleaningDate != null ? new Date(res.cleaningDate) : null ;
        this.hour = res.hour;
      }
    })
  }

  private getTimeEstimation() {
    const cleaning_details = this.form.get('cleaning_details') as FormGroup;
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_details.get('squareMeters')?.valueChanges.subscribe(res => {
      if(res){
        cleaning_date.get('cleaningDate')?.enable();
        cleaning_date.get('hour')?.setValue(null);
        this.timeEstimation = res.timeEstimation;
      } else {
        this.timeEstimation = 0;
        cleaning_date.get('hour')?.setValue(null);
        cleaning_date.get('cleaningDate')?.disable();
      }
    })
  }

  private getCleaningDetailsForBookingSummary() {
    const cleaning_details = this.form.get('cleaning_details') as FormGroup;
    cleaning_details.valueChanges.subscribe(() => {
      this.cleaningDetailsPrices = this.getCleaningDetailsPrice(cleaning_details);
      this.property = cleaning_details.get('property')?.value;
    })
  }

  private getCleaningDetailsPrice(cleaning_details: FormGroup){
    let cleaningPrice: number = 0;
    Object.keys(cleaning_details.controls).forEach(key => {
      if(cleaning_details.controls[key].value?.price != undefined){
        cleaningPrice += cleaning_details.controls[key].value?.price;
      }
    });
    return cleaningPrice;
  }

  private getEmployeesAgendaForDate(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_date.get('cleaningDate')?.valueChanges.subscribe(cleaningDate => {
      if(cleaningDate != null){
        cleaning_date.get('hour')?.setValue(null);
        this.cleaningFrequency = this.form.get('frequency')?.value.value ? this.form.get('frequency')?.value.value : null;
        this.employeeApi.getEmployeesAgendaForDate(cleaningDate, this.cleaningFrequency).subscribe(res => {
          this.employeesDayAgenda = res;
        })
      }
    });
  }
}
