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
    this.initHeaderCols();
  }

  private getCleaningServices(){
    this.administratorApi.getAllCleaningServices().subscribe(res => {
      this.cleaningServices = res;
    })
  }

  private initHeaderCols(){
    this.cols = [
      { header: 'Cleaning type'},
      { header: 'Total'},
      { header: 'Time estimation'},
      { header: 'Next cleaning date'},
      { header: 'Starting hour'},
      { header: 'Finishing hour'},
    ];
  }

  onRowSelect(row: any){
    this.router.navigate(["/administrator/cleaning-details", row.data.id]);
  }

}
