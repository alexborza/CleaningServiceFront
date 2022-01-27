import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { HomeAccessEnum } from 'src/app/core/dto/HomeAccessEnum';
import { ParkingEnum } from 'src/app/core/dto/ParkingEnum';

@Component({
  selector: 'app-standard-cleaning-service-detail',
  templateUrl: './standard-cleaning-service-detail.component.html',
  styleUrls: ['./standard-cleaning-service-detail.component.scss']
})
export class StandardCleaningServiceDetailComponent implements OnInit {

  standardCleaningForm: any;
  @Input() bedroomPrices: number[] = [];
  @Input() bathroomPrices: number[] = [];
  @Input() kitchenPrices: number[] = [];
  bedrooms: Room[] = [];
  bathrooms: Room[] = [];
  kitchens: Room[] = [];
  parking: Parking[] = [];
  homeAccess: HomeAccess[] = [];

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.standardCleaningForm = this.controlContainer.control;
    this.bedrooms = [
      {label: "0 Bedroom", value: 0, price: 0},
      {label: "1 Bedroom", value: 1, price: this.bedroomPrices[0]},
      {label: "2 Bedrooms", value: 2, price: this.bedroomPrices[1]},
      {label: "3 Bedrooms", value: 3, price: this.bedroomPrices[2]},
      {label: "4 Bedrooms", value: 4, price: this.bedroomPrices[3]},
      {label: "5 Bedrooms", value: 5, price: this.bedroomPrices[4]},
      {label: "6 Bedrooms", value: 6, price: this.bedroomPrices[5]}
    ]

    this.bathrooms = [
      {label: "0 Bathroom", value: 0, price: 0},
      {label: "1 Bathroom", value: 1, price: this.bathroomPrices[0]},
      {label: "2 Bathrooms", value: 2, price: this.bathroomPrices[1]},
      {label: "3 Bathrooms", value: 3, price: this.bathroomPrices[2]},
      {label: "4 Bathrooms", value: 4, price: this.bathroomPrices[3]},
      {label: "5 Bathrooms", value: 5, price: this.bathroomPrices[4]},
      {label: "6 Bathrooms", value: 6, price: this.bathroomPrices[5]}
    ]

    this.kitchens = [
      {label: "0 Kitchen", value: 0, price: 0},
      {label: "1 Kitchen", value: 1, price: this.kitchenPrices[0]},
      {label: "2 Kitchens", value: 2, price: this.kitchenPrices[1]},
      {label: "3 Kitchens", value: 3, price: this.kitchenPrices[2]},
      {label: "4 Kitchens", value: 4, price: this.kitchenPrices[3]},
      {label: "5 Kitchens", value: 5, price: this.kitchenPrices[4]},
      {label: "6 Kitchens", value: 6, price: this.kitchenPrices[5]}
    ]

    this.parking = [
      {label: "Free parking spot", value: ParkingEnum.Free, price: 0},
      {label: "Paid parking spot", value: ParkingEnum.Paid, price: 15}
    ]

    this.homeAccess = [
      {label: "Meet at the location", value: HomeAccessEnum.Meet, price: 0},
      {label: "Key placed in the mailbox", value: HomeAccessEnum.KeyMailbox, price: 0},
      {label: "Pick up keys(additional charges)", value: HomeAccessEnum.PickupKey, price: 15},
      {label: "Give us a call to organize", value: HomeAccessEnum.Call, price: 0}
    ]
  }

}

interface Room {
  label: string;
  value: number;
  price: number;
}

interface Parking {
  label: string;
  value: ParkingEnum;
  price: number;
}

interface HomeAccess {
  label: string;
  value: HomeAccessEnum;
  price: number;
}
