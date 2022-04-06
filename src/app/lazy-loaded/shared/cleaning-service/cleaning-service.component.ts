import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningDateDto } from 'src/app/core/dto/CleaningDateDto';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningStatusEnum } from 'src/app/core/dto/CleaningStatusEnum';
import { MessageDto } from 'src/app/core/dto/MessageDto';
import { RoleEnum } from 'src/app/core/dto/RoleEnum';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss']
})
export class CleaningServiceComponent implements OnInit {

  id: any;
  form: FormGroup;
  cleaningService!: CleaningServiceDto;
  canEditService = false;
  canFinishService = false;
  canServiceBeEdited = false;
  agendaDate: string = '';
  cleaningDate: string = '';
  datesOfCleaning: CleaningDateDto[] = [];
  messages: MessageDto;
  displayCleaningDate = true;
  displayHistoryOfCleaningDates = false;
  canDisplayHistory = false;
  user: any;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private sharedData: SharedDataService,
    public ref: DynamicDialogRef,
    private tokenStorage: TokenStorageService,
    private cleaningApi: CleaningApiService
    ) { 
      this.id = this.config.data?.id;
      this.agendaDate = this.config.data?.agendaDate;
      this.canEditService = this.config.data?.canEditService;
    }

  ngOnInit(): void {
    this.buildForm();
    this.getCleaningService();
    this.getNextCleaningDate();
  }

  private buildForm(){
    this.form = this.fb.group({
      message: new FormControl(null, [Validators.required]),
    });
  }

  private canUserEditService(){
    this.user = this.tokenStorage.getUser();
    this.canDisplayHistory = this.user.roles.includes(RoleEnum.ROLE_USER);
    this.canServiceBeEdited = this.canEditService && this.isInProgress();
    this.canFinishService = this.user.roles.includes(RoleEnum.ROLE_EMPLOYEE) && !this.isFinished() && this.isCleaningDateValid();
  }

  private getCleaningService(){
    this.cleaningApi.getCleaningService(this.id).subscribe(res => {
      this.cleaningService = res;
      this.getDatesOfCleaningForCleaningService();
      this.getMessagesForCleaningService();
    })
  }

  private getNextCleaningDate(){
    this.cleaningApi.getNextCleaningDate(this.id).subscribe(res => {
      if(res == null){
        this.displayCleaningDate = false;
      }
      this.cleaningDate = res?.cleaningDate ? res.cleaningDate : '-';
    })
  }

  private getDatesOfCleaningForCleaningService(){
    this.cleaningApi.getDatesOfCleaningForCleaningService(this.id).subscribe(res => {
      this.datesOfCleaning = res;
      this.canUserEditService();
    })
  }

  private getMessagesForCleaningService(){
    this.cleaningApi.getMessagesForCleaningService(this.id).subscribe(res => {
      this.messages = res;
    })
  }

  displayHistory(){
    this.displayHistoryOfCleaningDates = !this.displayHistoryOfCleaningDates;
  }

  private isCleaningDateValid(){
    const currentDate = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    return currentDate === this.agendaDate;
  }

  private isFinished(){
    if(this.datesOfCleaning.find(dateOfCleaning => dateOfCleaning?.cleaningDate === this.agendaDate) || this.cleaningService.status === CleaningStatusEnum.Finished)
      return true;
    return false;
  }

  private isInProgress(){
    return this.cleaningService.status === CleaningStatusEnum.InProgress;
  }

  confirm(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to end this cleaning service?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cleaningApi.endCleaningService(this.id).subscribe(res => {
          this.sharedData.toasterMessage.next({severity:'info', summary:'Confirmed', detail:'You have ended the cleaning service'});
          this.ref.close();
        });
      }
    });
  }

  finishService(){
    this.cleaningApi.finishCleaningService(this.id, this.cleaningDate).subscribe(res => {
      this.sharedData.toasterMessage.next({severity:'info', summary:'Confirmed', detail:'You have finished the cleaning service'});
      this.ref.close();
    })
  }

  onSubmit(formValue){
    this.checkRequiredFields();
    if(this.form.valid){
      this.submitForm(formValue); 
    }
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private submitForm(formValue){
    const date = formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en-US');
    const sender = this.user.username;
    let dto = new MessageDto(date, sender, formValue.message);
    this.cleaningApi.addMessageToCleaningService(this.id, dto).subscribe(res => {
      this.getMessagesForCleaningService();
      this.form.reset();
    })
  }

  getProperties(){
    const properties = Object.keys(this.cleaningService.cleaningDetails);
    let array: string[] = [];
    properties.forEach(property => {
      if(this.showLabelForProperty(property)){
        array.push(property);
      }
    })
    return array;
  }

  showLabelForProperty(property: string){
    return property !== 'type' && property !== 'id';
  }

  getLabelForProperty(property: string){
    switch(property) {
      case "squareMeters":
        return "Total Square Meters";
      case "parking":
        return "Parking";
      case "homeAccess":
        return "Home Access Way";
      case "bathrooms":
        return "Number of Bathrooms";
      case "bedrooms":
        return "Number of Bedrooms";
      case "kitchens":
        return "Number of Kitchens";
      case "property":
        return "Property type";
      case "rooms":
        return "Number of Rooms";
      default: 
        return '';
    }
  }

}
