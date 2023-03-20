import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CleaningServiceMinimal } from 'src/app/core/model/representation/cleaning_service/CleaningServiceMinimal';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  id!: number;
  cleaningServices: CleaningServiceMinimal[] = [];
  toasterMessageSubscription: Subscription;

  constructor(
    private router: Router,
    private cleaningApiService: CleaningApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getClientsCleaningServices();
  }

  private getClientsCleaningServices(){
    this.cleaningApiService.findClientsCleaningServices(this.id).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  toCleaningService(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
