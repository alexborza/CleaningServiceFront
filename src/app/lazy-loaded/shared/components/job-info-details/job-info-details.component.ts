import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JobInformationDto } from 'src/app/core/dto/JobInformationDto';

@Component({
  selector: 'app-job-info-details',
  templateUrl: './job-info-details.component.html',
  styleUrls: ['./job-info-details.component.scss']
})
export class JobInfoDetailsComponent implements OnInit {

  jobInfoDto!: JobInformationDto;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.jobInfoDto = this.config.data?.dto;
  }

  ngOnInit(): void {
  }

  onClose(){
    this.ref.close();
  }

}
