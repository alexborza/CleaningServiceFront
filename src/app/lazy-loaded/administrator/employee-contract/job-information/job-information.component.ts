import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { EmploymentStatusEnum } from 'src/app/core/dto/EmploymentStatusEnum';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss']
})
export class JobInformationComponent implements OnInit {

  employeeDto!: EmployeeDto;
  submitted: boolean = false;
  employmentOptions!: {label: string, value: EmploymentStatusEnum}[];

  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit() { 
    this.employmentOptions = [
      { label: "Part Time", value: EmploymentStatusEnum.PartTime},
      { label: "Full Time", value: EmploymentStatusEnum.FullTime}
    ]
    this.employeeDto = this.employeeService.employeeDto;
  }

  nextPage() {
    if(this.isJobInformationValid()){
      this.router.navigate(['administrator/employee-contract/emergency-contact-info']);
      this.employeeService.canAccessEmergencyInfo = true;
      return;
    }
    this.submitted = true;
  }

  isJobInformationValid(){
    return this.employeeDto.employeeInformation.jobInformation.title && 
           this.employeeDto.employeeInformation.jobInformation.supervisor && 
           this.employeeDto.employeeInformation.jobInformation.workPhone && 
           this.employeeDto.employeeInformation.jobInformation.employmentStatus &&
           this.employeeDto.employeeInformation.jobInformation.hiringDate &&
           this.employeeDto.employeeInformation.jobInformation.salary
  }

  prevPage() {
    this.router.navigate(['administrator/employee-contract/personal-info']);
  }
}
