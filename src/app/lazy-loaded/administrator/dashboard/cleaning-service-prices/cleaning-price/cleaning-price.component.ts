import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningPrices } from 'src/app/core/model/representation/cleaning_service/prices/CleaningPrices';

@Component({
  selector: 'app-cleaning-price',
  templateUrl: './cleaning-price.component.html',
  styleUrls: ['./cleaning-price.component.scss']
})
export class CleaningPriceComponent implements OnInit {

  @ViewChild('servicePrice') servicePrice: any;
  @ViewChild('bedroom') bedroom: any;
  @ViewChild('bathroom') bathroom: any;
  @ViewChild('kitchen') kitchen: any;
  @ViewChild('room') room: any;

  dto!: CleaningPrices;
  cleaningType!: string;
  cleaningServicePrice!: number;
  bedroomPrice!: number;
  bathroomPrice!: number;
  kitchenPrice!: number;
  roomPrice!: number;
  submitted = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.cleaningType = this.config.data?.cleaningType;
    this.dto = this.config.data?.dto;
    this.initPrices();
  }

  ngOnInit(): void {
  }

  private initPrices(){
    switch(this.cleaningType){
      case "Standard":
        this.cleaningServicePrice = this.dto.standardCleaningPrices?.standardServicePrice;
        this.bedroomPrice = this.dto.standardCleaningPrices?.standardServiceBedroom;
        this.bathroomPrice = this.dto.standardCleaningPrices?.standardServiceBathroom;
        this.kitchenPrice = this.dto.standardCleaningPrices?.standardServiceKitchen;
        break;
      case "Deep":
        this.cleaningServicePrice = this.dto.deepCleaningPrices?.deepServicePrice;
        this.bedroomPrice = this.dto.deepCleaningPrices?.deepServiceBedroom;
        this.bathroomPrice = this.dto.deepCleaningPrices?.deepServiceBathroom;
        this.kitchenPrice = this.dto.deepCleaningPrices?.deepServiceKitchen;
        break;
      case "Disinfection":
        this.cleaningServicePrice = this.dto.disinfectionCleaningPrices?.disinfectionServicePrice;
        break;
      case "Post Construction":
        this.cleaningServicePrice = this.dto.postConstructionCleaningPrices?.postConstructionServicePrice;
        this.roomPrice = this.dto.postConstructionCleaningPrices?.roomPrice;
        break;
      default:
        break;
    }
  }

  save(){
    this.setPrices();
  }

  private setPrices(){
    switch(this.cleaningType){
      case "Standard":
        if(this.servicePrice.valid && this.bedroom.valid && this.bathroom.valid && this.kitchen.valid){
          this.dto.standardCleaningPrices.standardServicePrice = this.cleaningServicePrice;
          this.dto.standardCleaningPrices.standardServiceBedroom = this.bedroomPrice;
          this.dto.standardCleaningPrices.standardServiceBathroom = this.bathroomPrice;
          this.dto.standardCleaningPrices.standardServiceKitchen = this.kitchenPrice;
          this.ref.close();
          break;
        }
        this.submitted = true;
        break;
      case "Deep":
        if(this.servicePrice.valid && this.bedroom.valid && this.bathroom.valid && this.kitchen.valid){
          this.dto.deepCleaningPrices.deepServicePrice = this.cleaningServicePrice;
          this.dto.deepCleaningPrices.deepServiceBedroom = this.bedroomPrice;
          this.dto.deepCleaningPrices.deepServiceBathroom = this.bathroomPrice;
          this.dto.deepCleaningPrices.deepServiceKitchen = this.kitchenPrice;
          this.ref.close();
          break;
        }
        this.submitted = true;
        break;
      case "Disinfection":
        if(this.servicePrice.valid){
          this.dto.disinfectionCleaningPrices.disinfectionServicePrice = this.cleaningServicePrice;
          this.ref.close();
          break;
        }
        this.submitted = true;
        break;
      case "Post Construction":
        if(this.servicePrice.valid && this.room.valid){
          this.dto.postConstructionCleaningPrices.postConstructionServicePrice = this.cleaningServicePrice;
          this.dto.postConstructionCleaningPrices.roomPrice = this.roomPrice;
          this.ref.close();
          break;
        }
        this.submitted = true;
        break;
      default:
        break;
    }
  }

}
