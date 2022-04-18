import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningDateDto } from 'src/app/core/dto/CleaningDateDto';
import { CleaningFrequencyEnum } from 'src/app/core/dto/CleaningFrequencyEnum';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningStatusEnum } from 'src/app/core/dto/CleaningStatusEnum';
import { RoleEnum } from 'src/app/core/dto/RoleEnum';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RescheduleCleaningServiceComponent } from '../components/reschedule-cleaning-service/reschedule-cleaning-service.component';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServiceComponent implements OnInit {

  userId: any;
  id: any;
  cleaningService!: CleaningServiceDto;
  canEditService = false;
  canFinishService = false;
  canServiceBeEdited = false;
  canEndCleaningService = false;
  agendaDate: string = '';
  cleaningDate: string = '';
  datesOfCleaning: CleaningDateDto[] = [];
  displayCleaningDate = true;
  displayHistoryOfCleaningDates = false;
  canDisplayHistory = false;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private tokenStorage: TokenStorageService,
    private cleaningApi: CleaningApiService
    ) { 
      this.getRouteData();
    }

  ngOnInit(): void {
    this.getRouteParams();
    this.getCleaningService();
    this.getNextCleaningDate();
  }

  private getRouteParams(){
    this.route.parent.params.subscribe(params => {
      this.userId = Number.parseInt(params['userId']);
    });
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.agendaDate = this.route.snapshot.paramMap.get('agendaDate');
  }

  private getRouteData(){
    this.canEditService = this.route.snapshot.data?.['canEditService'];
  }

  private canUserEditService(){
    this.user = this.tokenStorage.getUser();
    this.canDisplayHistory = this.user.role === RoleEnum.ROLE_USER;
    this.canServiceBeEdited = this.canEditService && this.isInProgress();
    this.canFinishService = this.user.role === RoleEnum.ROLE_EMPLOYEE && !this.isFinished() && this.isCleaningDateValid();
  }

  private getCleaningService(){
    this.cleaningApi.getCleaningService(this.id).subscribe(res => {
      this.cleaningService = res;
      this.getDatesOfCleaningForCleaningService();
    })
  }

  private getNextCleaningDate(){
    this.cleaningApi.getNextCleaningDate(this.id).subscribe(res => {
      if(res?.value == null){
        this.displayCleaningDate = false;
      }
      this.cleaningDate = res?.value ? res.value : '-';
    })
  }

  private getDatesOfCleaningForCleaningService(){
    this.cleaningApi.getDatesOfCleaningForCleaningService(this.id).subscribe(res => {
      this.datesOfCleaning = res;
      this.canEndService();
      this.canUserEditService();
    })
  }

  private canEndService(){
    if(this.cleaningService.cleaningFrequency == null || this.cleaningService.cleaningFrequency === CleaningFrequencyEnum.OneTime){
      this.canEndCleaningService = true;
    } else {
      this.canEndCleaningService = this.datesOfCleaning.length > 5;
    }
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
          this.getCleaningService();
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have ended the cleaning service'});
        });
      }
    });
  }

  finishService(){
    this.cleaningApi.finishCleaningService(this.id, this.cleaningDate).subscribe(res => {
      this.getCleaningService();
      this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have finished the cleaning service'});
    })
  }

  reschedule(){
    const ref = this.dialogService.open(RescheduleCleaningServiceComponent, {
      data: {
        id: this.id,
        timeEstimation: this.cleaningService.timeEstimation,
        canCancelCleaningService: this.canCancelCleaningService()
      },
      header: 'Reschedule cleaning service',
      width: '60%'
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully rescheduled cleaning service!'});
      }
    });
  }

  private canCancelCleaningService(){
    return this.cleaningService.cleaningFrequency === CleaningFrequencyEnum.Weekly || 
           this.cleaningService.cleaningFrequency === CleaningFrequencyEnum.BiWeekly || 
           this.cleaningService.cleaningFrequency === CleaningFrequencyEnum.Monthly
  }

  back(){
    if(this.router.url.startsWith("/administrator")){
      if(this.agendaDate){
        this.router.navigate(['/administrator/services-agenda', {agendaDate: this.agendaDate}]);
      } else {
        this.router.navigate(['/administrator/dashboard']);
      }
    } else if(this.router.url.startsWith("/employee")){
      this.router.navigate(['employee', this.userId, 'agenda', {agendaDate: this.agendaDate}]);
    } else {
      this.router.navigate(['client', this.userId, 'orders']);
    }
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
