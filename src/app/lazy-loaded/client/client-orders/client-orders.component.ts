import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { ClientService } from 'src/app/core/services/client.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  id!: number;
  cleaningServices: CleaningServiceDto[] = [];
  toasterMessageSubscription: Subscription;

  constructor(
    private router: Router,
    private clientApi: ClientService,
    private route: ActivatedRoute,
    private sharedData: SharedDataService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getClientsCleaningServices();
    this.getToasterMessage();
  }

  private getToasterMessage(){
    this.toasterMessageSubscription = this.sharedData.toasterMessage.subscribe((res: any) => {
      if(res){
        setTimeout(() => {
          this.messageService.add(res);
          this.sharedData.toasterMessage.next(false);
        }, 100)
      }
    });
  }

  private getClientsCleaningServices(){
    this.clientApi.getClientsCleaningServices(this.id).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  toCleaningService(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

}
