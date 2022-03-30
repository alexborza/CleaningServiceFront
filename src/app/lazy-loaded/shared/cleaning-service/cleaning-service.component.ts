import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningDateDto } from 'src/app/core/dto/CleaningDateDto';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningStatusEnum } from 'src/app/core/dto/CleaningStatusEnum';
import { RoleEnum } from 'src/app/core/dto/RoleEnum';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss']
})
export class CleaningServiceComponent implements OnInit {

  id: any;
  cleaningService!: CleaningServiceDto;
  canEditService = false;
  canFinishService = false;
  canServiceBeEdited = false;
  agendaDate: string = '';
  cleaningDate: string = '';
  datesOfCleaning: CleaningDateDto[] = [];
  displayCleaningDate = true;
  displayHistoryOfCleaningDates = false;
  canDisplayHistory = false;

  constructor(
    private confirmationService: ConfirmationService,
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
    this.getCleaningService();
    this.getNextCleaningDate();
  }

  private canUserEditService(){
    const user = this.tokenStorage.getUser();
    this.canDisplayHistory = user.roles.includes(RoleEnum.ROLE_USER);
    this.canServiceBeEdited = this.canEditService && this.isInProgress();
    this.canFinishService = user.roles.includes(RoleEnum.ROLE_EMPLOYEE) && !this.isFinished() && this.isCleaningDateValid();
  }

  private getCleaningService(){
    this.cleaningApi.getCleaningService(this.id).subscribe(res => {
      this.cleaningService = res;
      console.log('cleaning Service',this.cleaningService)
      this.getDatesOfCleaningForCleaningService();
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

  displayHistory(){
    this.displayHistoryOfCleaningDates = !this.displayHistoryOfCleaningDates;
  }

  private isCleaningDateValid(){
    const currentDate = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    return currentDate === this.agendaDate;
  }

  private isFinished(){
    console.log(this.datesOfCleaning.find(dateOfCleaning => dateOfCleaning?.cleaningDate === this.agendaDate) || this.cleaningService.status === CleaningStatusEnum.Finished)
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
