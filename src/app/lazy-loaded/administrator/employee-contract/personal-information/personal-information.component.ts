import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeContractCreation } from 'src/app/core/model/creation/users/EmployeeContractCreation';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  employeeContractCreation!: EmployeeContractCreation;
  submitted: boolean = false;

  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit() { 
      this.employeeContractCreation = this.employeeService.employeeContractCreation
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
    return this.employeeContractCreation.userInformationCreation.fullName && 
           this.employeeContractCreation.userInformationCreation.address && 
           this.employeeContractCreation.userInformationCreation.phoneNumber && 
           this.employeeContractCreation.userInformationCreation.birthDate
  }

  prevPage() {
    this.router.navigate(['administrator/employee-contract/account']);
  }

}
