import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeContractCreation } from 'src/app/core/model/creation/users/EmployeeContractCreation';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  employeeDto!: EmployeeContractCreation;

  constructor(
    private employeeService: EmployeeService,
    private administratorApi: AdministratorApiService,
    private sharedData: SharedDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.employeeDto = this.employeeService.employeeContractCreation;
  }

  nextPage() {
    this.administratorApi.createEmployeeContract(this.employeeDto).subscribe(res => {
      this.sharedData.toasterMessage.next(true);
      this.router.navigate(['administrator/employees']);
      this.employeeService.createNewEmployee();
    });
  }
  prevPage() {
    this.router.navigate(['administrator/employee-contract/emergency-contact-info']);
  }

}
