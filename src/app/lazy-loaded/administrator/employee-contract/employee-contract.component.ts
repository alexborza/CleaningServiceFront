import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-contract',
  templateUrl: './employee-contract.component.html',
  styleUrls: ['./employee-contract.component.scss']
})
export class EmployeeContractComponent implements OnInit {

  items!: MenuItem[];

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
      this.items = [{
              label: 'Account',
              routerLink: 'account'
          },
          {
              label: 'Personal Information',
              routerLink: 'personal-info'
          },
          {
              label: 'Job Information',
              routerLink: 'job-info'
          },
          {
            label: 'Confirmation',
            routerLink: 'confirmation'
          } 
      ];
  }
}
