import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppointmentCreation } from 'src/app/core/model/creation/appointment/AppointmentCreation';
import { Appointment } from 'src/app/core/model/representation/appointment/Appointment';
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

  constructor(public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  reschedule(appointment: Appointment) {
    const ref = this.dialogService.open(RescheduleAppointmentComponent, {
      data: {
        appointment: appointment,
        timeEstimation: this.timeEstimation,
        cleaningServiceId: this.cleaningServiceId
      },
      header: 'Reschedule Appointment',
      width: '60%'
    });

    ref.onClose.subscribe((appointmentCreation: AppointmentCreation) => {
      if (appointmentCreation) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully rescheduled an appointment!'});
      }
    });
  }

}
