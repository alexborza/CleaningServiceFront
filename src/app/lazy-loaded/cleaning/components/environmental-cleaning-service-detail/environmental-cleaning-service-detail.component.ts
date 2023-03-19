import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeAccess } from 'src/app/core/model/representation/cleaning_service/details/HomeAccess';
import { Parking } from 'src/app/core/model/representation/cleaning_service/details/Parking';
import { Property } from 'src/app/core/model/representation/cleaning_service/details/Property';

@Component({
  selector: 'app-environmental-cleaning-service-detail',
  templateUrl: './environmental-cleaning-service-detail.component.html',
  styleUrls: ['./environmental-cleaning-service-detail.component.scss']
})
export class EnvironmentalCleaningServiceDetailComponent implements OnInit, OnChanges {

  environmentCleaningForm: any;
  @Input() roomPrices: number[] = [];
  @Input() propertyPrices: number[] = [];
  @Input() paidParkingSpotPrice: number;
  @Input() pickUpKeysPrice: number;
  properties: PropertyValueObject[] = [];
  rooms: RoomValueObject[] = [];
  parking: ParkingValueObject[] = [];
  homeAccess: HomeAccessValueObject[] = [];
  squareMeters: SquareMetersValueObject[] = [];
  isPostConstructionCleaning = false;

  constructor(
    public controlContainer: ControlContainer,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.rooms = [
      {label: "1 room", value: 1, price: this.roomPrices[0]},
      {label: "2 rooms", value: 2, price: this.roomPrices[1]},
      {label: "3 rooms", value: 3, price: this.roomPrices[2]},
      {label: "4 rooms", value: 4, price: this.roomPrices[3]},
      {label: "5 rooms", value: 5, price: this.roomPrices[4]},
      {label: "6 rooms", value: 6, price: this.roomPrices[5]},
      {label: "7 rooms", value: 7, price: this.roomPrices[6]},
      {label: "8 rooms", value: 8, price: this.roomPrices[7]},
      {label: "9 rooms", value: 9, price: this.roomPrices[8]},
      {label: "10 rooms", value: 10, price: this.roomPrices[9]},
    ]

    this.parking = [
      {label: "Free parking spot", value: Parking.Free, price: 0},
      {label: "Paid parking spot", value: Parking.Paid, price: this.paidParkingSpotPrice}
    ]

    this.homeAccess = [
      {label: "Meet at the location", value: HomeAccess.Meet, price: 0},
      {label: "Key placed in the mailbox", value: HomeAccess.KeyMailbox, price: 0},
      {label: "Pick up keys(additional charges)", value: HomeAccess.PickupKey, price: this.pickUpKeysPrice},
      {label: "Give us a call to organize", value: HomeAccess.Call, price: 0}
    ]
  }

  ngOnInit(): void {
    this.environmentCleaningForm = this.controlContainer.control;
    this.isPostConstruction();

    this.properties = [
      {label: "Apartment", value: Property.Apartment, price: this.propertyPrices[0]},
      {label: "Family home", value: Property.FamilyHome, price: this.propertyPrices[1]},
      {label: "Office space", value: Property.OfficeSpace, price: this.propertyPrices[2]},
    ];

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

  private isPostConstruction(){
    if(this.router.url.split('/')[2] === "post-construction-cleaning"){
      this.isPostConstructionCleaning = true;
    }
  }
}

interface SquareMetersValueObject {
  label: string;
  timeEstimation: number;
}

interface RoomValueObject {
  label: string;
  value: number;
  price: number;
}

interface PropertyValueObject {
  label: string;
  value: Property;
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

