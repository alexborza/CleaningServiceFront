import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-cleaning-date',
  templateUrl: './cleaning-date.component.html',
  styleUrls: ['./cleaning-date.component.scss']
})
export class CleaningDateComponent implements OnInit, OnChanges {

  cleaningDateForm: any;
  @Input() bookedHours: string[] = [];
  hours: {hour: string}[] = [];
  availableHours: {hour: string}[] = [];
  minimumDate: Date = new Date();

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.cleaningDateForm = this.controlContainer.control;
    console.log('mai trebuie sa te ocupi de date',+new Date().toTimeString().split(" ")[0].split(":")[0]);
    this.hours = [
      {hour: "08:00 - 10:00"}, {hour: "10:00 - 12:00"}, {hour: "12:00 - 14:00"}, {hour: "14:00 - 16:00"}, {hour: "16:00 - 18:00"}
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.bookedHours.length === 0){
      this.availableHours = Object.assign([], this.hours);
    } else {
        this.availableHours = Object.assign([], this.hours);
        this.getAvailableHours();
    }
  }

  private getAvailableHours(){
    this.bookedHours.forEach(bookedHour => {
      this.availableHours.forEach(hour => {
        if(hour.hour === bookedHour){
          this.deleteBookedHour(hour);
        }
      })
    })
  }

  private deleteBookedHour(hour: any){
    const index = this.availableHours.indexOf(hour, 0);
    if (index > -1) {
      this.availableHours.splice(index, 1);
    }
  }

}
