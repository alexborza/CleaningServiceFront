import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningServiceDescriptionsDto } from 'src/app/core/dto/CleaningServiceDescriptionDto';
import { CleaningDescriptionComponent } from '../cleaning-description/cleaning-description.component';
import { CleaningDescriptionContent } from '../CleaningDescriptionContent';

@Component({
  selector: 'app-cleaning-description-content',
  templateUrl: './cleaning-description-content.component.html',
  styleUrls: ['./cleaning-description-content.component.scss'],
  providers: [ DialogService ]
})
export class CleaningDescriptionContentComponent implements OnInit {

  @Input() cleaningDescriptionsContent: CleaningDescriptionContent;
  @Input() dto: CleaningServiceDescriptionsDto;

  constructor(
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }
  
  modifyDescription(descriptionType: string){
    const ref = this.dialogService.open(CleaningDescriptionComponent, {
      data: {
        description: this.getDescription(descriptionType),
        descriptionType: descriptionType,
        dto: this.dto
      },
      header: 'Modify description',
      width: '50%'
    });
  }

  private getDescription(descriptionType: string){
    switch(descriptionType){
      case 'Standard':
        return this.dto.standardCleaningDescription;
      case 'Deep': 
        return this.dto.deepCleaningDescription;
      case 'Post Construction':
        return this.dto.postConstructionCleaningDescription;
      case 'Disinfection':
        return this.dto.disinfectionCleaningDescription;
      default:
        return "";
    }
  }

}
