import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CleaningService } from 'src/app/core/model/representation/cleaning_service/CleaningService';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  id!: number;
  cleaningServices: CleaningService[] = [];
  toasterMessageSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getClientsCleaningServices();
  }

  private getClientsCleaningServices(){
    // this.clientApi.getClientsCleaningServices(this.id).subscribe(res => {
    //   this.cleaningServices = res;
    // })
  }

  toCleaningService(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
