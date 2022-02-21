import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-emergency-contact-information',
  templateUrl: './emergency-contact-information.component.html',
  styleUrls: ['./emergency-contact-information.component.scss']
})
export class EmergencyContactInformationComponent implements OnInit {

  employeeDto!: EmployeeDto;
  submitted: boolean = false;
  relationshipOptions!: {label: string}[];

  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.relationshipOptions = [
      {label: "Mother"},
      {label: "Father"},
      {label: "Daughter"},
      {label: "Son"},
      {label: "Sister"},
      {label: "Brother"},
      {label: "Aunt"},
      {label: "Uncle"},
      {label: "Niece"},
      {label: "Nephew"},
      {label: "Cousin"},
      {label: "Grandmother"},
      {label: "Grandfather"},
      {label: "Granddaughter"},
      {label: "Grandson"},
      {label: "Stepsister"},
      {label: "Stepbrother"},
      {label: "Stepmother"},
      {label: "Friend"},
    ]
    this.employeeDto = this.employeeService.employeeDto
  }

  nextPage() {
    if(this.isEmergencyContactInformationValid()){
      this.router.navigate(['administrator/employee-contract/confirmation']);
      this.employeeService.canAccessConfirmation = true;
      return;
    }
    this.submitted = true;
  }

  isEmergencyContactInformationValid(){
    return this.employeeDto.employeeInformation.emergencyContactInformation.fullName && 
           this.employeeDto.employeeInformation.emergencyContactInformation.address && 
           this.employeeDto.employeeInformation.emergencyContactInformation.phoneNumber && 
           this.employeeDto.employeeInformation.emergencyContactInformation.relationship
  }

  prevPage() {
    this.router.navigate(['administrator/employee-contract/job-info']);
  }

}
