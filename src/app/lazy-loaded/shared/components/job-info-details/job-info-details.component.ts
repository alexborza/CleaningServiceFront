import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JobInformation } from 'src/app/core/model/representation/users/JobInformation';

@Component({
  selector: 'app-job-info-details',
  templateUrl: './job-info-details.component.html',
  styleUrls: ['./job-info-details.component.scss']
})
export class JobInfoDetailsComponent implements OnInit {

  jobInformationRepresentation!: JobInformation;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.jobInformationRepresentation = this.config.data?.dto;
  }

  ngOnInit(): void {
  }

  onClose(){
    this.ref.close();
  }

}
