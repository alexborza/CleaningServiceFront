import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Frequency } from 'src/app/core/model/representation/cleaning_service/Frequency';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CleaningType } from '../../../core/model/representation/cleaning_service/CleaningType';
import { CleaningPrices } from 'src/app/core/model/representation/cleaning_service/prices/CleaningPrices';
import { ContactInfoCreation } from 'src/app/core/model/creation/cleaning_service/ContactInfoCreation';
import { LocationCreation } from 'src/app/core/model/creation/cleaning_service/LocationCreation';
import { StandardCleaningDetailsCreation } from 'src/app/core/model/creation/cleaning_service/details/StandardCleaningDetailsCreation';
import { PostConstructionCleaningDetailsCreation } from 'src/app/core/model/creation/cleaning_service/details/PostConstructionCleaningDetailsCreation';
import { DisinfectionCleaningDetailsCreation } from 'src/app/core/model/creation/cleaning_service/details/DisinfectionCleaningDetailsCreation';
import { CleaningServiceCreation } from 'src/app/core/model/creation/cleaning_service/CleaningServiceCreation';
import { EmployeeAvailableInterval } from 'src/app/core/model/representation/shared/EmployeeAvailableInterval';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';

@Component({
  selector: 'app-cleaning-service-creation',
  templateUrl: './cleaning-service-creation.component.html',
  styleUrls: ['./cleaning-service-creation.component.scss']
})
export class CleaningServiceCreationComponent implements OnInit {

  form: FormGroup;
  title: string = '';
  type: CleaningType;
  cleaningPrices: CleaningPrices;
  pickUpKeysPrice: number;
  paidParkingSpotPrice: number;
  cleaningServicePrice: number = 0;
  cleaningDetailsPrices: number = 0;
  discount: number = 0;
  frequency: string = '';
  property: string = '';
  timeEstimation: number;
  bedroomPrices: number[] = [];
  bathroomPrices: number[] = [];
  kitchenPrices: number[] = [];
  roomPrices: number[] = [];
  propertyPrices: number[] = [];

  employeeAvailableIntervals: EmployeeAvailableInterval[] = [];

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
    this.getEmployeeAvailableIntervals();
  }

  private getRouteData(){
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private getCleaningServicePrices(){
    this.cleaningApi.getCleaningPrices().subscribe(res => {
      this.cleaningPrices = res;
      this.setCleaningPrices();
    })
  }

  private setCleaningPrices(){
    this.pickUpKeysPrice = this.cleaningPrices.pickUpKeysPrice;
    this.paidParkingSpotPrice = this.cleaningPrices.paidParkingSpotPrice;
    
    switch(this.type){
      case CleaningType.STANDARD:
        let sbedroomPrice = this.cleaningPrices.standardCleaningPrices.standardServiceBedroom;
        let sbathroomPrice = this.cleaningPrices.standardCleaningPrices.standardServiceBathroom;
        let skitchenPrice = this.cleaningPrices.standardCleaningPrices.standardServiceKitchen;
        this.cleaningServicePrice = this.cleaningPrices.standardCleaningPrices.standardServicePrice;
        this.bedroomPrices = [sbedroomPrice, sbedroomPrice * 2, sbedroomPrice * 3, sbedroomPrice * 4, sbedroomPrice * 5, sbedroomPrice * 6];
        this.bathroomPrices = [sbathroomPrice, sbathroomPrice * 2, sbathroomPrice * 3, sbathroomPrice * 4, sbathroomPrice * 5, sbathroomPrice * 6];
        this.kitchenPrices = [skitchenPrice, skitchenPrice * 2, skitchenPrice * 3, skitchenPrice * 4, skitchenPrice * 5, skitchenPrice * 6];
        break;
      case CleaningType.DEEP:
        let dbedroomPrice = this.cleaningPrices.deepCleaningPrices.deepServiceBedroom;
        let dbathroomPrice = this.cleaningPrices.deepCleaningPrices.deepServiceBathroom;
        let dkitchenPrice = this.cleaningPrices.deepCleaningPrices.deepServiceKitchen;
        this.cleaningServicePrice = this.cleaningPrices.deepCleaningPrices.deepServicePrice;
        this.bedroomPrices = [dbedroomPrice, dbedroomPrice * 2, dbedroomPrice * 3, dbedroomPrice * 4, dbedroomPrice * 5, dbedroomPrice * 6];
        this.bathroomPrices = [dbathroomPrice, dbathroomPrice * 2, dbathroomPrice * 3, dbathroomPrice * 4, dbathroomPrice * 5, dbathroomPrice * 6];
        this.kitchenPrices = [dkitchenPrice, dkitchenPrice * 2, dkitchenPrice * 3, dkitchenPrice * 4, dkitchenPrice * 5, dkitchenPrice * 6];
        break;
      case CleaningType.POST_CONSTRUCTION:
        let room = this.cleaningPrices.postConstructionCleaningPrices.roomPrice;
        this.cleaningServicePrice = this.cleaningPrices.postConstructionCleaningPrices.postConstructionServicePrice;
        this.propertyPrices = [50, 100, 150]; // ce facem cu property prices?
        this.roomPrices = [room, room * 2, room * 3, room * 4, room * 5, room * 6, room * 7, room * 8, room * 9, room * 10];
        break;
      case CleaningType.DISINFECTION:
        this.cleaningServicePrice = this.cleaningPrices.disinfectionCleaningPrices.disinfectionServicePrice;
        this.propertyPrices = [50, 100, 150]; // ce facem cu property prices?
        break;
      default:
        break;
    }
  }

  public isStandardOrDeepDetail(){
    return this.type === CleaningType.STANDARD || 
           this.type === CleaningType.DEEP;
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
      appointment: this.fb.group({
        cleaningDate: new FormControl(null, [Validators.required]),
        interval: new FormControl(null, [Validators.required]),
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
      case CleaningType.STANDARD:
      case CleaningType.DEEP:
        this.frequency = "One Time";
        this.form.addControl('frequency', new FormControl({label: "One Time", value: Frequency.OneTime, discount: 0}));
        this.addCleaningDetailsControls(cleaning_details, ['bedrooms', 'bathrooms', 'kitchens']);
        break;
      case CleaningType.POST_CONSTRUCTION:
        this.addCleaningDetailsControls(cleaning_details, ['property', 'rooms']);
        break;
      case CleaningType.DISINFECTION:
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
      const cleaningService = this.createCleaningService(formValue);
      console.log(cleaningService);
      const user = this.tokenStorage.getUser();
      this.cleaningApi.createCleaningService(user?.id === undefined ? null : user.id, cleaningService).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully booked a ' + this.type + ' Service'});
        this.form.reset();
        const frequencyControl = this.form.get('frequency');
        if(frequencyControl){
          frequencyControl.setValue({label: "One Time", value: Frequency.OneTime, discount: 0});
        }
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The field is required'});
    }
  }

  private createCleaningService(formValue: any): CleaningServiceCreation{
    const contactInfo = this.createContactInfo(formValue.contact_info);
    const location = this.createLocation(formValue.location);
    const cleaningDetails = this.createCleaningDetails(formValue.cleaning_details);
    const frequency = this.form.get('frequency') ? formValue.frequency.value : Frequency.OneTime;
    const total = this.cleaningServicePrice + this.cleaningDetailsPrices - ((this.cleaningServicePrice + this.cleaningDetailsPrices) * this.discount/100);
    const appointments = [];
    
    return new CleaningServiceCreation(
      contactInfo,
      location,
      cleaningDetails,
      frequency,
      formValue.payment.paymentMethod,
      total,
      this.timeEstimation,
      this.type,
      appointments,

    );
  }

  private createLocation(locationForm: any){
    return new LocationCreation(locationForm.county,
      locationForm.city,
      locationForm.address);
  }

  private createContactInfo(contactInfoForm: any): ContactInfoCreation {
    return new ContactInfoCreation(contactInfoForm.firstName, 
      contactInfoForm.lastName, 
      contactInfoForm.email, 
      contactInfoForm.phoneNumber);
  }

  private createCleaningDetails(cleaningDetailsForm: any) {
    switch(this.type){
      case CleaningType.STANDARD:
      case CleaningType.DEEP:
        return this.createStandardCleaningDetails(cleaningDetailsForm);
      case CleaningType.POST_CONSTRUCTION:
        return this.createPostConstructionCleaningDetails(cleaningDetailsForm);
      case CleaningType.DISINFECTION:
        return this.createDisinfectionCleaningDetails(cleaningDetailsForm);
      default:
        return null;
    }
  }

  private createStandardCleaningDetails(cleaningDetailsForm: any) {
    return new StandardCleaningDetailsCreation(
      cleaningDetailsForm.squareMeters.label,
      cleaningDetailsForm.parking.value,
      cleaningDetailsForm.homeAccess.value,
      cleaningDetailsForm.bedrooms.value,
      cleaningDetailsForm.bathrooms.value,
      cleaningDetailsForm.kitchens.value
    );
  }

  private createPostConstructionCleaningDetails(cleaningDetailsForm: any) {
    return new PostConstructionCleaningDetailsCreation(
      cleaningDetailsForm.squareMeters.label,
      cleaningDetailsForm.parking.value,
      cleaningDetailsForm.homeAccess.value,
      cleaningDetailsForm.property.value,
      cleaningDetailsForm.rooms.value,
    );
  }

  private createDisinfectionCleaningDetails(cleaningDetailsForm: any) {
    return new DisinfectionCleaningDetailsCreation(
      cleaningDetailsForm.squareMeters.label,
      cleaningDetailsForm.parking.value,
      cleaningDetailsForm.homeAccess.value,
      cleaningDetailsForm.property.value
    );
  }

  private checkRequiredFields(){
    checkRequiredFields((this.form.get('contact_info') as FormGroup).controls);
    checkRequiredFields((this.form.get('location') as FormGroup).controls);
    checkRequiredFields((this.form.get('cleaning_details') as FormGroup).controls);
  }

  private setBookingSummary(){
    this.getFrequencyForBookingSummary();
    this.getTimeEstimation();
    this.getCleaningDetailsForBookingSummary(); 
  }

  private getFrequencyForBookingSummary(){
    this.form.get('frequency')?.valueChanges.subscribe(res => {
      if(res){
        this.discount = res?.discount;
        this.frequency = res?.label;
      }
    })
  }

  private getEmployeeAvailableIntervals(){
    this.form.get('appointment').get('cleaningDate')?.valueChanges.subscribe(cleaningDate => {
      if(cleaningDate && this.timeEstimation){
        this.employeeApi.getEmployeesAvailableIntervalsForDate(cleaningDate, this.timeEstimation).subscribe(res => {
          this.employeeAvailableIntervals = res;
        });
      }
    })
  }

  private getTimeEstimation() {
    const cleaning_details = this.form.get('cleaning_details') as FormGroup;
    cleaning_details.get('squareMeters')?.valueChanges.subscribe(res => this.timeEstimation = res ? res.timeEstimation : 0)
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
}
