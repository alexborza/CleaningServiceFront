import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeContractCreation } from 'src/app/core/model/creation/users/EmployeeContractCreation';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss']
})
export class JobInformationComponent implements OnInit {

  employeeContractCreation!: EmployeeContractCreation;
  submitted: boolean = false;

  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit() { 
    this.employeeContractCreation = this.employeeService.employeeContractCreation;
  }

  nextPage() {
    if(this.isJobInformationValid()){
      this.router.navigate(['administrator/employee-contract/confirmation']);
      this.employeeService.canAccessConfirmation = true;
      return;
    }
    this.submitted = true;
  }

  isJobInformationValid(){
    return this.employeeContractCreation.jobInformationCreation.workPhone && 
           this.employeeContractCreation.jobInformationCreation.hiringDate &&
           this.employeeContractCreation.jobInformationCreation.salary
  }

  prevPage() {
    this.router.navigate(['administrator/employee-contract/personal-info']);
  }
}
