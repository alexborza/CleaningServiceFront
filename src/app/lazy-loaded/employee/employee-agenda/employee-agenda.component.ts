import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';

@Component({
  selector: 'app-employee-agenda',
  templateUrl: './employee-agenda.component.html',
  styleUrls: ['./employee-agenda.component.scss']
})
export class EmployeeAgendaComponent implements OnInit {

  id!: number;
  cleaningDate: string = '';
  dayOfWeek: string = '';
  cleaningServices: CleaningServiceDto[] = [];
  cleaningServiceToDisplay!: CleaningServiceDto | null;

  constructor(
    private route: ActivatedRoute,
    private employeeApi: EmployeeApiService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.formatDate(new Date());
    this.getEmployeeCleaningServicesForDate();
  }

  private getEmployeeCleaningServicesForDate(){
    this.employeeApi.getEmployeeCleaningServicesForDate(this.id, this.cleaningDate).subscribe(res => {
      this.cleaningServices = res;
    })
  }

  nextDay(){
    this.calculateNextDay();
    this.getEmployeeCleaningServicesForDate();
    this.cleaningServiceToDisplay = null;
  }

  private calculateNextDay(){
    const date = new Date(this.cleaningDate);
    if(this.dayOfWeek === 'Friday'){
      date.setDate(date.getDate() + 3);
    } else {
        date.setDate(date.getDate() + 1);
    }
    this.formatDate(date);
  }

  private formatDate(date: Date){
    this.cleaningDate = formatDate(date.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.dayOfWeek = formatDate(this.cleaningDate, 'EEEE', 'en-US');
  }

  previousDay(){
    this.calculatePreviousDay();
    this.getEmployeeCleaningServicesForDate();
    this.cleaningServiceToDisplay = null;
  }

  private calculatePreviousDay(){
    const date = new Date(this.cleaningDate);
    if(this.dayOfWeek === 'Monday'){
      date.setDate(date.getDate() - 3);
    } else {
        date.setDate(date.getDate() - 1);
    }
    this.formatDate(date);
  }

  onClick(cleaningService: CleaningServiceDto){
    this.cleaningServiceToDisplay = cleaningService;
  }

  getProperties(){
    const properties = Object.keys(this.cleaningServiceToDisplay?.cleaningDetails);
    let array: string[] = [];
    properties.forEach(property => {
      if(this.showLabelForProperty(property)){
        array.push(property);
      }
    })
    return array;
  }

  showLabelForProperty(property: string){
    return property !== 'type' && property !== 'id';
  }

  getLabelForProperty(property: string){
    switch(property) {
      case "squareMeters":
        return "Total Square Meters";
      case "parking":
        return "Parking";
      case "homeAccess":
        return "Home Access Way";
      case "bathrooms":
        return "Number of Bathrooms";
      case "bedrooms":
        return "Number of Bedrooms";
      case "kitchens":
        return "Number of Kitchens";
      case "property":
        return "Property type";
      case "rooms":
        return "Number of Rooms";
      default: 
        return '';
    }
  }

}
