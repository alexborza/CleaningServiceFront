import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningPrices } from 'src/app/core/model/representation/cleaning_service/prices/CleaningPrices';

@Component({
  selector: 'app-extra-services-price',
  templateUrl: './extra-services-price.component.html',
  styleUrls: ['./extra-services-price.component.scss']
})
export class ExtraServicesPriceComponent implements OnInit {

  dto: CleaningPrices;
  parkingSpot: number;
  pickUpKeys: number;
  submitted = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.dto = this.config.data?.dto;
    this.initPrices();
  }

  ngOnInit(): void {
  }

  private initPrices(){
    this.parkingSpot = this.dto.paidParkingSpotPrice;
    this.pickUpKeys = this.dto.pickUpKeysPrice;
  }

  save(paidParkingSpotPrice: FormControl, pickUpKeysPrice: FormControl){
    if(paidParkingSpotPrice.valid && pickUpKeysPrice.valid){
      this.setExtraServicesPrice(paidParkingSpotPrice.value, pickUpKeysPrice.value);
      this.ref.close();
    }
    this.submitted = true;
  }

  private setExtraServicesPrice(paidParkingSpotPrice, pickUpKeysPrice){
    this.dto.paidParkingSpotPrice = paidParkingSpotPrice;
    this.dto.pickUpKeysPrice = pickUpKeysPrice;
  }

}
