import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { HomeAccess } from 'src/app/core/model/representation/cleaning_service/details/HomeAccess';
import { Parking } from 'src/app/core/model/representation/cleaning_service/details/Parking';

@Component({
  selector: 'app-standard-cleaning-service-detail',
  templateUrl: './standard-cleaning-service-detail.component.html',
  styleUrls: ['./standard-cleaning-service-detail.component.scss']
})
export class StandardCleaningServiceDetailComponent implements OnInit, OnChanges {

  standardCleaningForm: any;
  @Input() bedroomPrices: number[] = [];
  @Input() bathroomPrices: number[] = [];
  @Input() kitchenPrices: number[] = [];
  @Input() paidParkingSpotPrice: number;
  @Input() pickUpKeysPrice: number;
  bedrooms: Room[] = [];
  bathrooms: Room[] = [];
  kitchens: Room[] = [];
  squareMeters: SquareMeters[] = [];
  parking: ParkingValueObject[] = [];
  homeAccess: HomeAccessValueObject[] = [];

  constructor(public controlContainer: ControlContainer) { }
  
  ngOnChanges(): void {
    this.bedrooms = [
      {label: "1 Bedroom", value: 1, price: this.bedroomPrices[0]},
      {label: "2 Bedrooms", value: 2, price: this.bedroomPrices[1]},
      {label: "3 Bedrooms", value: 3, price: this.bedroomPrices[2]},
      {label: "4 Bedrooms", value: 4, price: this.bedroomPrices[3]},
      {label: "5 Bedrooms", value: 5, price: this.bedroomPrices[4]},
      {label: "6 Bedrooms", value: 6, price: this.bedroomPrices[5]}
    ]

    this.bathrooms = [
      {label: "1 Bathroom", value: 1, price: this.bathroomPrices[0]},
      {label: "2 Bathrooms", value: 2, price: this.bathroomPrices[1]},
      {label: "3 Bathrooms", value: 3, price: this.bathroomPrices[2]},
      {label: "4 Bathrooms", value: 4, price: this.bathroomPrices[3]},
      {label: "5 Bathrooms", value: 5, price: this.bathroomPrices[4]},
      {label: "6 Bathrooms", value: 6, price: this.bathroomPrices[5]}
    ]

    this.kitchens = [
      {label: "1 Kitchen", value: 1, price: this.kitchenPrices[0]},
      {label: "2 Kitchens", value: 2, price: this.kitchenPrices[1]},
      {label: "3 Kitchens", value: 3, price: this.kitchenPrices[2]},
      {label: "4 Kitchens", value: 4, price: this.kitchenPrices[3]},
      {label: "5 Kitchens", value: 5, price: this.kitchenPrices[4]},
      {label: "6 Kitchens", value: 6, price: this.kitchenPrices[5]}
    ]

    this.parking = [
      {label: "Free parking spot", value: Parking.FREE, price: 0},
      {label: "Paid parking spot", value: Parking.PAID, price: this.paidParkingSpotPrice}
    ]

    this.homeAccess = [
      {label: "Meet at the location", value: HomeAccess.MEET, price: 0},
      {label: "Key placed in the mailbox", value: HomeAccess.KEY_MAILBOX, price: 0},
      {label: "Pick up keys(additional charges)", value: HomeAccess.PICKUP_KEY, price: this.pickUpKeysPrice},
      {label: "Give us a call to organize", value: HomeAccess.CALL, price: 0}
    ]
  }

  ngOnInit(): void {
    this.standardCleaningForm = this.controlContainer.control;
    this.squareMeters = [
      {label: '50 to 80', timeEstimation: 2},
      {label: '81 to 120', timeEstimation: 3},
      {label: '121 to 160', timeEstimation: 4},
      {label: '161 to 200', timeEstimation: 5},
      {label: '201 to 240', timeEstimation: 6},
      {label: '241 to 280', timeEstimation: 7},
      {label: '281 to 320', timeEstimation: 8},
    ]
  }
}

interface SquareMeters {
  label: string;
  timeEstimation: number;
}

interface Room {
  label: string;
  value: number;
  price: number;
}

interface ParkingValueObject {
  label: string;
  value: Parking;
  price: number;
}

interface HomeAccessValueObject {
  label: string;
  value: HomeAccess;
  price: number;
}
