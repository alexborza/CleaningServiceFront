import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { EmployeeAppointment } from 'src/app/core/model/representation/appointment/EmployeeAppointment';
import { Appointment } from 'src/app/core/model/representation/appointment/Appointment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

  id!: number;
  cleaningDate: string = '';
  dayOfWeek: string = '';
  appointments: Appointment[] = [];
  allEmployeesAppointments: EmployeeAppointment[] = [];
  showAppointments: boolean;

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
      this.getAllEmployeesAppointments();
    } else {
      this.getEmployeeCleaningServicesForDate();
    }
  }

  private getAllEmployeesAppointments(){
    this.administratorApi.getAllEmployeesAppointmentsByDate(this.cleaningDate).subscribe(res => {
      this.allEmployeesAppointments = res;
      this.showAppointments = this.allEmployeesAppointments.some(app => app.appointmentRepresentations.length > 0);
    });
  }

  private getEmployeeCleaningServicesForDate(){
    this.employeeApi.getEmployeesAppointmentsForDate(this.id, this.cleaningDate).subscribe(res => {
      this.appointments = res;
      this.showAppointments = this.appointments.length > 0;
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

  onClick(appointment: Appointment){
    if(this.router.url.startsWith("/administrator")){
      this.router.navigate(["/administrator/cleaning-details", appointment.cleaningServiceId, {agendaDate: this.cleaningDate}]);
    } else {
      this.router.navigate([appointment.cleaningServiceId, {agendaDate: this.cleaningDate}], {relativeTo: this.route});
    }
  }
}
