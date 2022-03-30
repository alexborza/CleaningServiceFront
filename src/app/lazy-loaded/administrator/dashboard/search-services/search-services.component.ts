import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDisplay } from 'src/app/core/dto/CleaningServiceDisplay';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningServiceComponent } from 'src/app/lazy-loaded/shared/cleaning-service/cleaning-service.component';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss'],
  providers: [ DialogService ]
})
export class SearchServicesComponent implements OnInit {

  cols: any[] = [];
  cleaningServices: CleaningServiceDisplay[] = [];

  constructor(
    private cleaningApi: CleaningApiService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getCleaningServices();
    this.initCols();
  }


  private getCleaningServices(){
    this.cleaningApi.getCleaningServices().subscribe(res => {
      this.cleaningServices = res;
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
    const ref = this.dialogService.open(CleaningServiceComponent, {
      data: {
        id: row.data.id,
        canEditService: true
      },
      header: 'Cleaning Service Details',
      width: '70%'
    });
  }

}
