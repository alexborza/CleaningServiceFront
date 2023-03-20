import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CleaningServiceMinimal } from 'src/app/core/model/representation/cleaning_service/CleaningServiceMinimal';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss'],
})
export class SearchServicesComponent implements OnInit {

  cols: any[] = [];
  cleaningServices: CleaningServiceMinimal[] = [];

  constructor(
    private administratorApi: AdministratorApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCleaningServices();
    this.initCols();
  }

  private getCleaningServices(){
    this.administratorApi.getAllCleaningServices().subscribe(res => {
      this.cleaningServices = res;
    })
  }

  private initCols(){
    this.cols = [
      { field: 'cleaningType', header: 'Cleaning type'},
      { field: 'total', header: 'Total'},
      { field: 'timeEstimation', header: 'Time estimation'},
      { field: 'nextCleaningDate', header: 'Next cleaning date'},
      { field: 'timeSlot.startingHour', header: 'Starting hour'},
      { field: 'timeSlot.startingHour', header: 'Ending hour'},
    ];
  }

  onRowSelect(row: any){
    this.router.navigate(["/administrator/cleaning-details", row.data.id]);
  }

}
