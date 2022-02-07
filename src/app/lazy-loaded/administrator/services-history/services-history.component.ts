import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-services-history',
  templateUrl: './services-history.component.html',
  styleUrls: ['./services-history.component.scss']
})
export class ServicesHistoryComponent implements OnInit {

  cleaningServices: CleaningServiceDto[] = [];

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
      console.log(this.cleaningServices)
    })
  }

  onRowSelect(event: any){
    this.router.navigate([event.data.id], {relativeTo: this.route});
  }

}
