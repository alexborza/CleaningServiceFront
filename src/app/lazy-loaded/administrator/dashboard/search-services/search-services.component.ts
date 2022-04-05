import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CleaningServiceDisplay } from 'src/app/core/dto/CleaningServiceDisplay';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { CleaningServiceComponent } from 'src/app/lazy-loaded/shared/cleaning-service/cleaning-service.component';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss'],
  providers: [ DialogService ]
})
export class SearchServicesComponent implements OnInit, OnDestroy {

  cols: any[] = [];
  cleaningServices: CleaningServiceDisplay[] = [];
  toasterMessageSubscription: Subscription;

  constructor(
    private cleaningApi: CleaningApiService,
    public dialogService: DialogService,
    private sharedData: SharedDataService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getCleaningServices();
    this.getToasterMessage();
    this.initCols();
  }

  private getToasterMessage(){
    this.toasterMessageSubscription = this.sharedData.toasterMessage.subscribe((res: any) => {
      if(res){
        setTimeout(() => {
          this.messageService.add(res);
          this.getCleaningServices();
          this.sharedData.toasterMessage.next(false);
        }, 100)
      }
    });
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

  ngOnDestroy(): void {
    this.toasterMessageSubscription.unsubscribe();
  }

}
