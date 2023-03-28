import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AppointmentCreation } from 'src/app/core/model/creation/appointment/AppointmentCreation';
import { Appointment } from 'src/app/core/model/representation/appointment/Appointment';
import { Role } from 'src/app/core/model/representation/users/Role';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [ DialogService ]
})
export class AppointmentComponent implements OnInit {

  @Input() appointments: Appointment[] = [];
  @Input() timeEstimation: number;
  @Input() cleaningServiceId: number;
  @Output() appointmentCompletion = new EventEmitter<number>();
  @Output() appointmentRescheduling = new EventEmitter<any>();
  role: Role;
  currentDate: string;

  constructor(public dialogService: DialogService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.role = user.role;
    this.currentDate = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
  }

  reschedule(appointment: Appointment) {
    const ref = this.dialogService.open(RescheduleAppointmentComponent, {
      data: {
        appointment: appointment,
        timeEstimation: this.timeEstimation
      },
      header: 'Reschedule Appointment',
      width: '60%'
    });

    ref.onClose.subscribe((appointmentCreation: AppointmentCreation) => {
      if (appointmentCreation) {
        this.appointmentRescheduling.emit({appointmentCreation: appointmentCreation, appointmentId: appointment.id});
      }
    });
  }

  complete(appointmentId: number) {
    this.appointmentCompletion.emit(appointmentId);
  }

}
