import { Component, OnInit } from '@angular/core';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { ServicesAgenda } from 'src/app/core/dto/ServicesAgenda';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

  id!: number;
  cleaningDate: string = '';
  dayOfWeek: string = '';
  cleaningServices: CleaningServiceDto[] = [];
  servicesAgenda: ServicesAgenda[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeApi: EmployeeApiService,
    private administratorApi: AdministratorApiService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    const agendaDate = this.route.snapshot.paramMap.get('agendaDate')
    this.formatDate(agendaDate ? new Date(agendaDate) : new Date());
    this.getAgenda();
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
    if(this.router.url.startsWith("/administrator")){
      this.router.navigate(["/administrator/cleaning-details", cleaningService.id, {agendaDate: this.cleaningDate}]);
    } else {
      this.router.navigate([cleaningService.id, {agendaDate: this.cleaningDate}], {relativeTo: this.route});
    }
  }
}
