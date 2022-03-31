import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { ClientService } from 'src/app/core/services/client.service';
import { CleaningServiceComponent } from '../../shared/cleaning-service/cleaning-service.component';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss'],
  providers: [DialogService]
})
export class ClientOrdersComponent implements OnInit {

  id!: number;
  cleaningServices: CleaningServiceDto[] = [];

  constructor(
    private clientApi: ClientService,
    public dialogService: DialogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getClientsCleaningServices();
  }

  private getClientsCleaningServices(){
    this.clientApi.getClientsCleaningServices(this.id).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  toCleaningService(id: number) {
    const ref = this.dialogService.open(CleaningServiceComponent, {
      data: {
        id: id,
        canEditService: true
      },
      header: 'Cleaning Service Details',
      width: '70%'
    });
  }

}
