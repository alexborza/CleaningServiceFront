import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/core/model/EmployeeDto';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  employeeDto!: EmployeeDto;

  constructor(
    private employeeService: EmployeeService,
    private sharedData: SharedDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.employeeDto = this.employeeService.employeeDto;
  }

  nextPage() {
    this.employeeDto.type = "employee";
    this.employeeService.createEmployeeContract(this.employeeDto).subscribe(res => {
      this.sharedData.toasterMessage.next(true);
      this.router.navigate(['administrator/employees']);
      this.employeeService.createNewEmployee();
    });
  }
  prevPage() {
    this.router.navigate(['administrator/employee-contract/emergency-contact-info']);
  }

}
