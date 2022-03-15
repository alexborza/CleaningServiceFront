import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeAccessEnum } from 'src/app/core/dto/HomeAccessEnum';
import { ParkingEnum } from 'src/app/core/dto/ParkingEnum';
import { PropertyEnum } from 'src/app/core/dto/PropertyEnum';

@Component({
  selector: 'app-environmental-cleaning-service-detail',
  templateUrl: './environmental-cleaning-service-detail.component.html',
  styleUrls: ['./environmental-cleaning-service-detail.component.scss']
})
export class EnvironmentalCleaningServiceDetailComponent implements OnInit {

  environmentCleaningForm: any;
  @Input() roomPrices: number[] = [];
  @Input() propertyPrices: number[] = [];
  properties: Property[] = [];
  rooms: Room[] = [];
  parking: Parking[] = [];
  homeAccess: HomeAccess[] = [];
  squareMeters: SquareMeters[] = [];
  isPostConstructionCleaning = false;

  constructor(
    public controlContainer: ControlContainer,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.environmentCleaningForm = this.controlContainer.control;
    this.isPostConstruction();

    this.properties = [
      {label: "Apartment", value: PropertyEnum.Apartment, price: this.propertyPrices[0]},
      {label: "Family home", value: PropertyEnum.FamilyHome, price: this.propertyPrices[1]},
      {label: "Office space", value: PropertyEnum.OfficeSpace, price: this.propertyPrices[2]},
    ];

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
      {label: "Free parking spot", value: ParkingEnum.Free, price: 0},
      {label: "Paid parking spot", value: ParkingEnum.Paid, price: 15}
    ]

    this.homeAccess = [
      {label: "Meet at the location", value: HomeAccessEnum.Meet, price: 0},
      {label: "Key placed in the mailbox", value: HomeAccessEnum.KeyMailbox, price: 0},
      {label: "Pick up keys(additional charges)", value: HomeAccessEnum.PickupKey, price: 15},
      {label: "Give us a call to organize", value: HomeAccessEnum.Call, price: 0}
    ]

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

interface SquareMeters {
  label: string;
  timeEstimation: number;
}

interface Room {
  label: string;
  value: number;
  price: number;
}

interface Property {
  label: string;
  value: PropertyEnum;
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

