import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageCreation } from 'src/app/core/model/creation/cleaning_service/MessageCreation';
import { CleaningService } from 'src/app/core/model/representation/cleaning_service/CleaningService';
import { AppointmentApiService } from 'src/app/core/services/appointment-api.service';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServiceComponent implements OnInit {

  userId: any;
  id: any;
  cleaningService: CleaningService;
  agendaDate: string = '';
  canEditService: boolean;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private messageService: MessageService,
    private cleaningApi: CleaningApiService,
    private appointmentApi: AppointmentApiService
    ) { 
      this.getRouteData();
    }

  ngOnInit(): void {
    this.getRouteParams();
    this.getCleaningService();
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

  private getCleaningService(){
    this.cleaningApi.getCleaningService(this.id).subscribe(res => {
      this.cleaningService = res;
    })
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

  onAppointmentCompletion(appointmentId: number) {
    this.appointmentApi.completeAppointment(appointmentId).subscribe(() => {
      this.getCleaningService();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully completed the appointment!'})
    });
  }

  onAppointmentRescheduling(data: any) {
    this.appointmentApi.rescheduleAppointment(data.appointmentId, this.id, data.appointmentCreation).subscribe(() => {
      this.getCleaningService();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully rescheduled the appointment!'})
    });
  }

  onMessageCreation(messageCreation: MessageCreation) {
    this.cleaningApi.addMessageToCleaningService(this.id, messageCreation).subscribe(() => {
      this.getCleaningService();
    })
  }

}
