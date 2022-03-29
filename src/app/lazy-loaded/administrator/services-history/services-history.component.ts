import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningServiceDisplay } from 'src/app/core/dto/CleaningServiceDisplay';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-services-history',
  templateUrl: './services-history.component.html',
  styleUrls: ['./services-history.component.scss']
})
export class ServicesHistoryComponent implements OnInit {

  cleaningServices: CleaningServiceDisplay[] = [];

  constructor(
    private cleaningServiceApi: CleaningApiService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCleaningServices();
  }

  private getCleaningServices(){
    this.cleaningServiceApi.getCleaningServices().subscribe(res => {
      this.cleaningServices = res;
    })
  }

  onRowSelect(event: any){
    this.router.navigate([event.data.id], {relativeTo: this.route});
  }

}
