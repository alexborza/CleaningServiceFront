import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CleaningServiceDescriptionsDto } from 'src/app/core/dto/CleaningServiceDescriptionDto';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningDescriptionContent } from './CleaningDescriptionContent';

@Component({
  selector: 'app-cleaning-service-descriptions',
  templateUrl: './cleaning-service-descriptions.component.html',
  styleUrls: ['./cleaning-service-descriptions.component.scss']
})
export class CleaningServiceDescriptionsComponent implements OnInit {

  dto = new CleaningServiceDescriptionsDto();
  cleaningDescriptionsContent: CleaningDescriptionContent[] = [];

  constructor(
    private messageService: MessageService,
    private administratorApi: AdministratorApiService,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.getDescriptions();
  }

  private getDescriptions(){
    this.cleaningApi.getDescriptions().subscribe(res => {
      this.dto = res;
      this.initializeCleaningDescriptionContent();
    })
  }

  private initializeCleaningDescriptionContent(){
    this.cleaningDescriptionsContent = [
      {title: "Standard Cleaning Description", descriptionType: "Standard"},
      {title: "Deep Cleaning Description", descriptionType: "Deep"},
      {title: "Post Construction Cleaning Description", descriptionType: "Post Construction"},
      {title: "Disinfection Cleaning Description", descriptionType: "Disinfection"},
    ]
  }

  onSave(){
    if(this.dto.id){
      this.updateDescriptions();
    } else {
      this.createDescriptions();
    }
  }

  private updateDescriptions(){
    this.administratorApi.updateDescriptions(this.dto.id, this.dto).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Success', detail: 'Descriptions updated successfully!'});
    });
  }

  private createDescriptions(){
    this.administratorApi.createDescriptions(this.dto).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Success', detail: 'Descriptions updated successfully!'});
    });
  }

}
