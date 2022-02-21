import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  toasterMessageSubscription!: Subscription;

  constructor(
    private sharedData: SharedDataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.toasterMessageSubscription = this.sharedData.toasterMessage.subscribe(res => {
      if(res){
        setTimeout(() => {
          this.messageService.add({severity:'success', summary:'Success', detail: 'Employee registered successfully!'});
        }, 100)
      }
    })
  }

  ngOnDestroy(): void {
    this.toasterMessageSubscription.unsubscribe();
  }

}
