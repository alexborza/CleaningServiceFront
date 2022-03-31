import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDescriptionsDto } from 'src/app/core/dto/CleaningServiceDescriptionDto';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningDescriptionComponent } from './cleaning-description/cleaning-description.component';

@Component({
  selector: 'app-cleaning-service-descriptions',
  templateUrl: './cleaning-service-descriptions.component.html',
  styleUrls: ['./cleaning-service-descriptions.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServiceDescriptionsComponent implements OnInit {

  dto = new CleaningServiceDescriptionsDto();

  constructor(
    public dialogService: DialogService,
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
    })
  }

  modifyDescription(descriptionType: string, description: string){
    const ref = this.dialogService.open(CleaningDescriptionComponent, {
      data: {
        description: description,
        descriptionType: descriptionType,
        dto: this.dto
      },
      header: 'Modify description',
      width: '50%'
    });
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
