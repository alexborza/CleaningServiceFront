import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningPrices } from 'src/app/core/model/representation/cleaning_service/prices/CleaningPrices';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningPriceComponent } from './cleaning-price/cleaning-price.component';
import { ExtraServicesPriceComponent } from './extra-services-price/extra-services-price.component';

@Component({
  selector: 'app-cleaning-service-prices',
  templateUrl: './cleaning-service-prices.component.html',
  styleUrls: ['./cleaning-service-prices.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServicePricesComponent implements OnInit {

  cleaningPrices!: CleaningPrices;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private administratorApi: AdministratorApiService,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.getCleaningServicePrices();
  }

  private getCleaningServicePrices(){
    this.cleaningApi.getCleaningPrices().subscribe(res => {
      this.cleaningPrices = res;
    })
  }

  modifyPrices(cleaningType: string){
    const ref = this.dialogService.open(CleaningPriceComponent, {
      data: {
        cleaningType: cleaningType,
        dto: this.cleaningPrices
      },
      header: 'Modify Prices',
      width: '50%'
    });
  }

  modifyExtraServicesPrice(){
    const ref = this.dialogService.open(ExtraServicesPriceComponent, {
      data: {
        dto: this.cleaningPrices
      },
      header: 'Modify Extra Services Price',
      width: '50%'
    });
  }

  onSave(){
    this.createCleaningPrices();
  }

  private createCleaningPrices(){
    if(this.arePricesValid()){
      this.administratorApi.createCleaningPrices(this.cleaningPrices).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Prices updated successfully!'});
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail: 'All prices are required!'});
    }
  }

  private arePricesValid(){
    return this.cleaningPrices.standardCleaningPrices && this.cleaningPrices.deepCleaningPrices && this.cleaningPrices.disinfectionCleaningPrices && this.cleaningPrices.postConstructionCleaningPrices;
  }

}
