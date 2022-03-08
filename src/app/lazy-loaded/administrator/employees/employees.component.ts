import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  toasterMessageSubscription!: Subscription;
  employees: EmployeeDto[] = [];

  constructor(
    private sharedData: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private administratorApi: AdministratorApiService
  ) {}

  ngOnInit(): void {
    this.toasterMessageSubscription = this.sharedData.toasterMessage.subscribe(res => {
      if(res){
        setTimeout(() => {
          this.messageService.add({severity:'success', summary:'Success', detail: 'Employee registered successfully!'});
          this.sharedData.toasterMessage.next(false);
        }, 100)
      }
    });

    this.getAllEmployees();
  }

  private getAllEmployees(){
    this.administratorApi.getAllEmployees().subscribe(res => {
      this.employees = res;
    })
  }

  toEmployeesDetails(id: number){
    this.router.navigate([id], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.toasterMessageSubscription.unsubscribe();
  }

}
