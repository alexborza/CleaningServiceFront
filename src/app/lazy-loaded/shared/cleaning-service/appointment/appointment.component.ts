import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/core/model/representation/appointment/Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  @Input() appointments: Appointment[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  reschedule(appointment: Appointment) {
    console.log(appointment);
  }

}
