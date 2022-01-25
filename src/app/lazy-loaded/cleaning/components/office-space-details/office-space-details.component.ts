import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-office-space-details',
  templateUrl: './office-space-details.component.html',
  styleUrls: ['./office-space-details.component.scss']
})
export class OfficeSpaceDetailsComponent implements OnInit {

  numberOfPersons: {label: string;}[] = [];
  frequency: {label: string;}[] = [];
  timeOfTheDay: {label: string;}[] = [];

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.numberOfPersons = [
      {label: "1-10"},
      {label: "10-30"},
      {label: "30-50"},
      {label: "50-100"},
      {label: "100-200"},
      {label: "200-400"},
      {label: "400+"}
    ];
    this.frequency = [
      {label: "Daily including weekends"},
      {label: "Daily weekdays only"},
      {label: "Twice / week"},
      {label: "Weekly"},
      {label: "Every 2 weeks"},
      {label: "Monthly"},
      {label: "To be determined"}
    ];
    this.timeOfTheDay = [
      {label: "During regular business hours"},
      {label: "After regular business hours"},
      {label: "Graveyard shift 11 pm to 7 am"}
    ];
  }

}
