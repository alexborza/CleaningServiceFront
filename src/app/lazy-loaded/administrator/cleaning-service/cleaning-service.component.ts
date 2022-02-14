import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CleaningServiceDto } from 'src/app/core/dto/CleaningServiceDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.scss']
})
export class CleaningServiceComponent implements OnInit {

  id: any;
  cleaningService!: CleaningServiceDto;

  constructor(
    private route: ActivatedRoute,
    private cleaningApi: CleaningApiService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCleaningService();
  }

  private getCleaningService(){
    this.cleaningApi.getCleaningService(this.id).subscribe(res => {
      this.cleaningService = res;
    })
  }

  getProperties(){
    const properties = Object.keys(this.cleaningService.cleaningDetails);
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
