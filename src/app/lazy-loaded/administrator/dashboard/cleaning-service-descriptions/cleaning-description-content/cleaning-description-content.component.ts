import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CleaningDescriptionCreation } from 'src/app/core/model/creation/cleaning_service/description/CleaningDescriptionCreation';
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
  @Input() cleaningDescriptionCreation: CleaningDescriptionCreation;

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
        dto: this.cleaningDescriptionCreation
      },
      header: 'Modify description',
      width: '50%'
    });
  }

  private getDescription(descriptionType: string){
    switch(descriptionType){
      case 'Standard':
        return this.cleaningDescriptionCreation.standardCleaningDescription;
      case 'Deep': 
        return this.cleaningDescriptionCreation.deepCleaningDescription;
      case 'Post Construction':
        return this.cleaningDescriptionCreation.postConstructionCleaningDescription;
      case 'Disinfection':
        return this.cleaningDescriptionCreation.disinfectionCleaningDescription;
      default:
        return "";
    }
  }

}
