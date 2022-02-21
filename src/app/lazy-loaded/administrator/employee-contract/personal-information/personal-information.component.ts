import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  employeeDto!: EmployeeDto;
  submitted: boolean = false;

  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit() { 
      this.employeeDto = this.employeeService.employeeDto
  }

  nextPage() {
    if(this.isUserInformationValid()){
      this.router.navigate(['administrator/employee-contract/job-info']);
      this.employeeService.canAccessJobInfo = true;
      return;
    }
    this.submitted = true;
  }

  isUserInformationValid(){
    return this.employeeDto.userInformation.fullName && 
           this.employeeDto.userInformation.address && 
           this.employeeDto.userInformation.phoneNumber && 
           this.employeeDto.userInformation.birthDate
  }

  prevPage() {
    this.router.navigate(['administrator/employee-contract/account']);
  }

}
