import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { EmployeeAvailableInterval } from 'src/app/core/model/representation/shared/EmployeeAvailableInterval';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.scss']
})
export class AppointmentCreationComponent implements OnInit {

  @Input() appointmentForm: any;
  @Input() timeEstimation: number;
  employeeAvailableIntervals: EmployeeAvailableInterval[] = [];
  minimumDate: Date = new Date();

  constructor(
    public controlContainer: ControlContainer,
    private employeeApi: EmployeeApiService
  ) { }

  ngOnInit(): void {
  }

  selectDate(cleaningDate: any) {
    const formattedDate = formatDate(cleaningDate.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    if(this.timeEstimation){
      this.employeeApi.getEmployeesAvailableIntervalsForDate(formattedDate, this.timeEstimation).subscribe(res => {
        this.employeeAvailableIntervals = res;
      });
    }
  }
}