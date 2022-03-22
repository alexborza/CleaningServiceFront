import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { OfficeCleaningDto } from 'src/app/core/dto/OfficeCleaningDto';
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
  officeCleanings: OfficeCleaningDto[] = [];

  constructor(
    private clientApi: ClientService,
    private router: Router,
    public dialogService: DialogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getClientsCleaningServices();
    this.getClientsOfficeCleanings();
  }

  private getClientsCleaningServices(){
    this.clientApi.getClientsCleaningServices(this.id).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  private getClientsOfficeCleanings(){
    this.clientApi.getClientsOfficeCleanings(this.id).subscribe(res => {
      this.officeCleanings = res;
    })
  }

  toCleaningService(id: number) {
    const ref = this.dialogService.open(CleaningServiceComponent, {
      data: {
        id: id
      },
      header: 'Cleaning Service Details',
      width: '70%'
    });
  }

  toQuoteRequest(id: number) {
    this.router.navigate(['quote-request', id], {relativeTo: this.route});
  }

}
