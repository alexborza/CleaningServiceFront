import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-contract',
  templateUrl: './employee-contract.component.html',
  styleUrls: ['./employee-contract.component.scss']
})
export class EmployeeContractComponent implements OnInit, OnDestroy {

  items!: MenuItem[];
    
  subscription!: Subscription;

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
              label: 'Emergency Contact Information',
              routerLink: 'emergency-contact-info'
          },
          {
            label: 'Confirmation',
            routerLink: 'confirmation'
          } 
      ];

      // this.subscription = this.employeeService.paymentComplete$.subscribe((personalInformation: any) =>{
      //     this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
      // });
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
