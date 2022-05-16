import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CleaningServiceDisplay } from 'src/app/core/dto/CleaningServiceDisplay';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss'],
})
export class SearchServicesComponent implements OnInit {

  cols: any[] = [];
  cleaningServices: CleaningServiceDisplay[] = [];

  constructor(
    private cleaningApi: CleaningApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCleaningServices();
    this.initCols();
  }

  private getCleaningServices(){
    this.cleaningApi.getCleaningServices().subscribe(res => {
      this.cleaningServices = [];
    })
  }

  private initCols(){
    this.cols = [
      { field: 'type', header: 'Cleaning type'},
      { field: 'phoneNumber', header: 'Client Phone Number'},
      { field: 'email', header: 'Client Email'},
      { field: 'squareMeters', header: 'Square Meters'},
      { field: 'status', header: 'Status'},
    ];
  }

  onRowSelect(row: any){
    this.router.navigate(["/administrator/cleaning-details", row.data.id]);
  }

}
