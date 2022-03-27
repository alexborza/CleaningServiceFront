import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDescriptionsDto } from 'src/app/core/dto/CleaningServiceDescriptionDto';
import { AdministratorApiService } from 'src/app/core/services/administrator-api.service';
import { CleaningDescriptionComponent } from './cleaning-description/cleaning-description.component';

@Component({
  selector: 'app-cleaning-service-descriptions',
  templateUrl: './cleaning-service-descriptions.component.html',
  styleUrls: ['./cleaning-service-descriptions.component.scss'],
  providers: [ DialogService ]
})
export class CleaningServiceDescriptionsComponent implements OnInit {

  dto!: CleaningServiceDescriptionsDto;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private administratorApi: AdministratorApiService
  ) { }

  ngOnInit(): void {
    this.getDescriptions();
    this.dto = new CleaningServiceDescriptionsDto();
  }

  private getDescriptions(){
    this.administratorApi.getDescriptions().subscribe(res => {
      this.dto = res;
      console.log(this.dto)
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
