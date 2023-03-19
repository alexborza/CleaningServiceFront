import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningServiceMinimal } from 'src/app/core/model/representation/cleaning_service/CleaningServiceMinimal';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-services-history',
  templateUrl: './services-history.component.html',
  styleUrls: ['./services-history.component.scss']
})
export class ServicesHistoryComponent implements OnInit {

  cleaningServices: CleaningServiceMinimal[] = [];

  constructor(
    private cleaningServiceApi: CleaningApiService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCleaningServices();
  }

  private getCleaningServices(){
    // this.cleaningServiceApi.getCleaningServices().subscribe(res => {
    //   this.cleaningServices = res;
    // })
  }

  onRowSelect(event: any){
    this.router.navigate([event.data.id], {relativeTo: this.route});
  }

}
