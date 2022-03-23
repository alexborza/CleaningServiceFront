import { Component, OnDestroy, OnInit } from '@angular/core';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { ServicesAgenda } from 'src/app/core/dto/ServicesAgenda';
import { CleaningServiceComponent } from '../cleaning-service/cleaning-service.component';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  providers: [ DialogService ]
})
export class AgendaComponent implements OnInit, OnDestroy {

  id!: number;
  cleaningDate: string = '';
  dayOfWeek: string = '';
  cleaningServices: CleaningServiceDto[] = [];
  servicesAgenda: ServicesAgenda[] = [];
  toasterMessageSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedData: SharedDataService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private employeeApi: EmployeeApiService,
    private administratorApi: AdministratorApiService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getToasterMessage();
    this.formatDate(new Date());
    this.getAgenda();
  }

  private getToasterMessage(){
    this.toasterMessageSubscription = this.sharedData.toasterMessage.subscribe((res: any) => {
      if(res){
        setTimeout(() => {
          this.messageService.add(res);
          this.getAgenda();
          this.sharedData.toasterMessage.next(false);
        }, 100)
      }
    });
  }

  private getAgenda(){
    if(this.router.url.startsWith("/administrator")){
      this.getServicesAgenda();
    } else {
      this.getEmployeeCleaningServicesForDate();
    }
  }

  private getServicesAgenda(){
    this.administratorApi.getServicesAgenda(this.cleaningDate).subscribe(res => {
      this.servicesAgenda = res;
    });
  }

  private getEmployeeCleaningServicesForDate(){
    this.employeeApi.getEmployeeCleaningServicesForDate(this.id, this.cleaningDate).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  nextDay(){
    this.calculateNextDay();
    this.getAgenda();
  }

  private calculateNextDay(){
    const date = new Date(this.cleaningDate);
    if(this.dayOfWeek === 'Friday'){
      date.setDate(date.getDate() + 3);
    } else {
        date.setDate(date.getDate() + 1);
    }
    this.formatDate(date);
  }

  private formatDate(date: Date){
    this.cleaningDate = formatDate(date.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.dayOfWeek = formatDate(this.cleaningDate, 'EEEE', 'en-US');
  }

  previousDay(){
    this.calculatePreviousDay();
    this.getAgenda();
  }

  private calculatePreviousDay(){
    const date = new Date(this.cleaningDate);
    if(this.dayOfWeek === 'Monday'){
      date.setDate(date.getDate() - 3);
    } else {
        date.setDate(date.getDate() - 1);
    }
    this.formatDate(date);
  }

  onClick(cleaningService: CleaningServiceDto){
    const ref = this.dialogService.open(CleaningServiceComponent, {
      data: {
        id: cleaningService.id,
        cleaningDate: this.cleaningDate
      },
      header: 'Cleaning Service Details',
      width: '70%'
    });
  }

  ngOnDestroy(): void {
    this.toasterMessageSubscription.unsubscribe();
  }

}
