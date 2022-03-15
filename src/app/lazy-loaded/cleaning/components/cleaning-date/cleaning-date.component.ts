import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AvailableHour } from 'src/app/core/dto/AvailableHour';
import { AvailableInterval } from 'src/app/core/dto/AvailableInterval';
import { EmployeesDayAgenda } from 'src/app/core/dto/EmployeesDayAgenda';

@Component({
  selector: 'app-cleaning-date',
  templateUrl: './cleaning-date.component.html',
  styleUrls: ['./cleaning-date.component.scss']
})
export class CleaningDateComponent implements OnInit, OnChanges {

  cleaningDateForm: any;
  totalEmployees!: number;
  @Input() employeesDayAgenda: EmployeesDayAgenda[] = [];
  @Input() timeEstimation!: number;
  availableHours: AvailableHour[] = [];
  minimumDate: Date = new Date();

  constructor(
    public controlContainer: ControlContainer
    ) { }

  ngOnInit(): void {
    this.cleaningDateForm = this.controlContainer.control;
    console.log('mai trebuie sa te ocupi de date',+new Date().toTimeString().split(" ")[0].split(":")[0]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.employeesDayAgenda.length !== 0){
      this.getAvailableHoursForCleaning(this.employeesDayAgenda, this.timeEstimation);
    }
  }
  
  private getAvailableHoursForCleaning(employeesAgenda: EmployeesDayAgenda[], timeEstimation: number){
    let avHours: AvailableHour[] = []; // export class AvailableCleaningHours
    if(timeEstimation !== 0){
      employeesAgenda.forEach(agenda => {
        this.getAvailableHoursForAgenda(agenda, timeEstimation, avHours);
      })
    }
    this.availableHours = avHours;
  }

  private getAvailableHoursForAgenda(agenda: EmployeesDayAgenda, timeEstimation: number, avHours: AvailableHour[]){
    agenda.availableIntervals.forEach(interval => {
      if(interval.endingHour - interval.startingHour >= timeEstimation){
        this.getAvailableHoursForInterval(agenda, interval, timeEstimation, avHours);
      }
    })
  }

  private getAvailableHoursForInterval(agenda: EmployeesDayAgenda, interval: AvailableInterval, timeEstimation: number, avHours: AvailableHour[]){
    if(interval.endingHour - interval.startingHour === timeEstimation && !this.intervalAlreadyExists(interval, avHours)){
      avHours.push(new AvailableHour(agenda.employeeId, interval, this.setIntervalLabel(interval)));
    } else {
      let leftInterval = this.createInterval(interval.startingHour, interval.startingHour + timeEstimation);
      let rightInterval = this.createInterval(interval.endingHour - timeEstimation, interval.endingHour);
      this.addIntervals(agenda, avHours, [leftInterval, rightInterval]);
    }
  }

  private intervalAlreadyExists(interval: AvailableInterval, avHours: AvailableHour[]){
    for(let i = 0; i < avHours.length; i++){
      if(avHours[i].interval.startingHour === interval.startingHour && avHours[i].interval.endingHour === interval.endingHour){
        return true;
      }
    }
    return false;
  }

  private setIntervalLabel(interval: AvailableInterval){
    return (interval.startingHour === 9 ? '09:00 - ' : interval.startingHour.toString() + ':00 - ') + interval.endingHour.toString() + ':00';
  }

  private createInterval(startingHour: number, endingHour: number){
    let interval = new AvailableInterval();
    interval.startingHour = startingHour;
    interval.endingHour = endingHour;
    return interval;
  }

  private addIntervals(agenda: EmployeesDayAgenda, avHours: AvailableHour[], intervals: AvailableInterval[]){
    intervals.forEach(interval => {
      if(!this.intervalAlreadyExists(interval, avHours)){
        avHours.push(new AvailableHour(agenda.employeeId, interval, this.setIntervalLabel(interval)));
      }
    })
  }
}