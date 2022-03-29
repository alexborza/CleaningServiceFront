import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServicePricesDto } from 'src/app/core/dto/CleaningServicePricesDto';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { CleaningPriceComponent } from './cleaning-price/cleaning-price.component';

@Component({
  selector: 'app-cleaning-service-prices',
  templateUrl: './cleaning-service-prices.component.html',
  styleUrls: ['./cleaning-service-prices.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServicePricesComponent implements OnInit {

  dto!: CleaningServicePricesDto;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private administratorApi: AdministratorApiService
  ) { }

  ngOnInit(): void {
    this.getCleaningServicePrices();
  }

  private getCleaningServicePrices(){
    this.administratorApi.getCleaningServicePrices().subscribe(res => {
      this.dto = res;
    })
  }

  modifyPrices(cleaningType: string){
    const ref = this.dialogService.open(CleaningPriceComponent, {
      data: {
        cleaningType: cleaningType,
        dto: this.dto
      },
      header: 'Modify Prices',
      width: '50%'
    });
  }

  onSave(){
    if(this.dto.id){
      this.updateCleaningPrices();
    } else {
      this.createCleaningPrices();
    }
  }

  private updateCleaningPrices(){
    console.log(this.dto)
    this.administratorApi.updateCleaningPrices(this.dto.id, this.dto).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Success', detail: 'Prices updated successfully!'});
    });
  }

  private createCleaningPrices(){
    if(this.arePricesValid()){
      this.administratorApi.createCleaningPrices(this.dto).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Prices updated successfully!'});
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail: 'All prices are required!'});
    }
  }

  private arePricesValid(){
    return this.dto.standardCleaningPrices && this.dto.deepCleaningPrices && this.dto.disinfectionCleaningPrices && this.dto.postConstructionCleaningPrices;
  }

}
