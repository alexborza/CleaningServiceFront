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
    this.dto = new CleaningServicePricesDto();
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

}
