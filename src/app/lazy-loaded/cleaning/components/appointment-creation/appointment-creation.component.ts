import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { EmployeeAvailableInterval } from 'src/app/core/model/representation/shared/EmployeeAvailableInterval';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.scss']
})
export class AppointmentCreationComponent implements OnInit {

  appointmentForm: any;
  @Input() employeeAvailableIntervals: EmployeeAvailableInterval[] = [];
  minimumDate: Date = new Date();

  constructor(
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.controlContainer.control;
  }
}