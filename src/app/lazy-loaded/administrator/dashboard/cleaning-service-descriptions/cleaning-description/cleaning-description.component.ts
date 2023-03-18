import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningServiceDescriptionsDto } from 'src/app/core/model/CleaningServiceDescriptionDto';

@Component({
  selector: 'app-cleaning-description',
  templateUrl: './cleaning-description.component.html',
  styleUrls: ['./cleaning-description.component.scss']
})
export class CleaningDescriptionComponent implements OnInit {

  serviceDescription: string = '';
  descriptionType: string = '';
  dto: CleaningServiceDescriptionsDto;
  submitted = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.serviceDescription = this.config.data?.description;
    this.descriptionType = this.config.data?.descriptionType;
    this.dto = this.config.data?.dto;
  }

  ngOnInit(): void {
  }

  save(description: FormControl){
    if (description.valid) {
      this.setDescription(description.value, this.descriptionType);
      this.ref.close();
    }
    this.submitted = true;
  }

  private setDescription(description: string, descriptionType: string){
    switch(descriptionType){
      case "Standard":
        this.dto.standardCleaningDescription = description;
        break;
      case "Deep":
        this.dto.deepCleaningDescription = description;
        break;
      case "Disinfection":
        this.dto.disinfectionCleaningDescription = description;
        break;
      case "Post Construction":
        this.dto.postConstructionCleaningDescription = description;
        break;
      default:
        break;
    }
  }

}
