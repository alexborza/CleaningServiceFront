import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Frequency } from 'src/app/core/model/representation/cleaning_service/Frequency';
import { CleaningService } from 'src/app/core/model/representation/cleaning_service/CleaningService';
import { Role } from 'src/app/core/model/representation/users/Role';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServiceComponent implements OnInit {

  userId: any;
  id: any;
  cleaningService!: CleaningService;
  canEditService = false;
  canFinishService = false;
  canServiceBeEdited = false;
  canEndCleaningService = false;
  agendaDate: string = '';
  cleaningDate: string = '';
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
    // this.getCleaningService();
    // this.getNextCleaningDate();
  }

  private getRouteData(){
    this.canEditService = this.route.snapshot.data?.['canEditService'];
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

  // private getCleaningService(){
  //   this.cleaningApi.getCleaningService(this.id).subscribe(res => {
  //     this.cleaningService = res;
  //     this.getDatesOfCleaningForCleaningService();
  //   })
  // }

  // private getNextCleaningDate(){
  //   this.cleaningApi.getNextCleaningDate(this.id).subscribe(res => {
  //     if(res == null){
  //       this.displayCleaningDate = false;
  //     }
  //     console.log(this.cleaningDateDto)
  //     this.cleaningDateDto = res;
  //   })
  // }

  // private getDatesOfCleaningForCleaningService(){
  //   this.cleaningApi.getDatesOfCleaningForCleaningService(this.id).subscribe(res => {
  //     this.datesOfCleaning = res;
  //     this.canEndService();
  //     this.canUserEditService();
  //   })
  // }

  // private canEndService(){
  //   if(this.cleaningService.cleaningFrequency == null || this.cleaningService.cleaningFrequency === Frequency.OneTime){
  //     this.canEndCleaningService = true;
  //   } else {
  //     this.canEndCleaningService = this.datesOfCleaning.length > 5;
  //   }
  // }

  // private canUserEditService(){
  //   this.user = this.tokenStorage.getUser();
  //   this.canDisplayHistory = this.user.role === Role.USER;
  //   this.canServiceBeEdited = this.canEditService && this.isInProgress();
  //   this.canFinishService = this.user.role === Role.EMPLOYEE && !this.isFinished() && this.isCleaningDateValid();
  // }

  // private isInProgress(){
  //   return this.cleaningService.status === CleaningStatusEnum.InProgress;
  // }

  // private isFinished(){
  //   if(this.datesOfCleaning.find(dateOfCleaning => dateOfCleaning?.cleaningDate === this.agendaDate) || this.cleaningService.status === CleaningStatusEnum.Finished)
  //     return true;
  //   return false;
  // }

  // private isCleaningDateValid(){
  //   const currentDate = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
  //   return currentDate === this.agendaDate;
  // }

  // confirm(){
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to end this cleaning service?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.cleaningApi.endCleaningService(this.id).subscribe(res => {
  //         this.getCleaningService();
  //         this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have ended the cleaning service'});
  //       });
  //     }
  //   });
  // }

  // finishService(){
  //   this.cleaningApi.finishCleaningService(this.id, this.cleaningDateDto.cleaningDate).subscribe(res => {
  //     this.getCleaningService();
  //     this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have finished the cleaning service'});
  //   })
  // }

  // reschedule(){
  //   const ref = this.dialogService.open(RescheduleCleaningServiceComponent, {
  //     data: {
  //       id: this.id,
  //       timeEstimation: this.cleaningService.timeEstimation,
  //       canCancelCleaningService: this.canCancelCleaningService()
  //     },
  //     header: 'Reschedule cleaning service',
  //     width: '60%'
  //   });

  //   ref.onClose.subscribe((res) => {
  //     if (res) {
  //       this.getNextCleaningDate();
  //       this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully rescheduled cleaning service!'});
  //     }
  //   });
  // }

  // private canCancelCleaningService(){
  //   return this.cleaningService.cleaningFrequency === Frequency.TwoTime || 
  //          this.cleaningService.cleaningFrequency === Frequency.FourTime || 
  //          this.cleaningService.cleaningFrequency === Frequency.SixTime
  // }

  displayHistory(){
    this.displayHistoryOfCleaningDates = !this.displayHistoryOfCleaningDates;
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
