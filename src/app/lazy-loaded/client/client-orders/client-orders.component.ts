import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { OfficeCleaningDto } from 'src/app/core/dto/OfficeCleaningDto';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  id!: number;
  cleaningServices: CleaningServiceDto[] = [];
  officeCleanings: OfficeCleaningDto[] = [];

  constructor(
    private clientApi: ClientService,
    private router: Router,
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
    this.router.navigate(['cleaning-service', id], {relativeTo: this.route});
  }

  toQuoteRequest(id: number) {
    this.router.navigate(['quote-request', id], {relativeTo: this.route});
  }

}
