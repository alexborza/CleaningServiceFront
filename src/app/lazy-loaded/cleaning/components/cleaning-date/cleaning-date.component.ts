import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Frequency } from 'src/app/core/model/representation/cleaning_service/Frequency';

@Component({
  selector: 'app-cleaning-date',
  templateUrl: './cleaning-date.component.html',
  styleUrls: ['./cleaning-date.component.scss']
})
export class CleaningDateComponent implements OnInit, OnChanges {

  cleaningDateForm: any;
  totalEmployees!: number;
  // @Input() employeesDayAgenda: EmployeesDayAgenda[] = [];
  @Input() timeEstimation!: number;
  @Input() cleaningFrequency: Frequency;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  // availableHours: AvailableHour[] = [];
  minimumDate: Date = new Date();

  constructor(
    public controlContainer: ControlContainer
    ) { }

  ngOnInit(): void {
    this.cleaningDateForm = this.controlContainer.control;
  }

  ngOnChanges(changes: SimpleChanges): void {
  //   if(this.employeesDayAgenda.length !== 0){
  //     this.getAvailableHoursForCleaning(this.employeesDayAgenda, this.timeEstimation);
  //   }
  }
  
  // private getAvailableHoursForCleaning(employeesAgenda: EmployeesDayAgenda[], timeEstimation: number){
  //   let avHours: AvailableHour[] = [];
  //   if(timeEstimation !== 0){
  //     employeesAgenda.forEach(agenda => {
  //       if(this.isCleaningServiceDoneFrequently() && agenda.availableIntervalsForOverlapping != null){
  //         this.getAvailableHoursForAgenda(agenda, agenda.availableIntervalsForOverlapping, timeEstimation, avHours);
  //       } else {
  //           this.getAvailableHoursForAgenda(agenda, agenda.availableIntervals, timeEstimation, avHours);
  //       }
  //     })
  //   }
  //   this.availableHours = avHours.sort((a, b) => a.interval.startingHour - b.interval.startingHour);
  // }

  // private isCleaningServiceDoneFrequently(){
  //   return this.cleaningFrequency === Frequency.Weekly || 
  //          this.cleaningFrequency === Frequency.BiWeekly || 
  //          this.cleaningFrequency === Frequency.Monthly;
  // }

  // private getAvailableHoursForAgenda(agenda: EmployeesDayAgenda, availableIntervals: AvailableInterval[], timeEstimation: number, avHours: AvailableHour[]){
  //   availableIntervals.forEach(interval => {
  //     if(interval.endingHour - interval.startingHour >= timeEstimation){
  //       this.getAvailableHoursForInterval(agenda, interval, timeEstimation, avHours);
  //     }
  //   })
  // }

  // private getAvailableHoursForInterval(agenda: EmployeesDayAgenda, interval: AvailableInterval, timeEstimation: number, avHours: AvailableHour[]){
  //   if(interval.endingHour - interval.startingHour === timeEstimation && !this.intervalAlreadyExists(interval, avHours)){
  //     avHours.push(new AvailableHour(agenda.employeeId, interval, this.setIntervalLabel(interval)));
  //   } else {
  //     let leftInterval = this.createInterval(interval.startingHour, interval.startingHour + timeEstimation);
  //     let rightInterval = this.createInterval(interval.endingHour - timeEstimation, interval.endingHour);
  //     this.addIntervals(agenda, avHours, [leftInterval, rightInterval]);
  //   }
  // }

  // private intervalAlreadyExists(interval: AvailableInterval, avHours: AvailableHour[]){
  //   for(let i = 0; i < avHours.length; i++){
  //     if(avHours[i].interval.startingHour === interval.startingHour && avHours[i].interval.endingHour === interval.endingHour){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // private setIntervalLabel(interval: AvailableInterval){
  //   return (interval.startingHour === 9 ? '09:00 - ' : interval.startingHour.toString() + ':00 - ') + interval.endingHour.toString() + ':00';
  // }

  // private createInterval(startingHour: number, endingHour: number){
  //   let interval = new AvailableInterval();
  //   interval.startingHour = startingHour;
  //   interval.endingHour = endingHour;
  //   return interval;
  // }

  // private addIntervals(agenda: EmployeesDayAgenda, avHours: AvailableHour[], intervals: AvailableInterval[]){
  //   intervals.forEach(interval => {
  //     if(!this.intervalAlreadyExists(interval, avHours)){
  //       avHours.push(new AvailableHour(agenda.employeeId, interval, this.setIntervalLabel(interval)));
  //     }
  //   })
  // }
}