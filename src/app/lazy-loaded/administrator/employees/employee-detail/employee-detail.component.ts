import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { ModifyJobInfoComponent } from './modify-job-info/modify-job-info.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [ DialogService ]
})
export class EmployeeDetailComponent implements OnInit {
  
  id!: number;
  employee!: EmployeeDto;

  constructor(
    private route: ActivatedRoute,
    private employeeApi: EmployeeApiService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.getEmployee();
  }

  private getEmployee(){
    this.employeeApi.getEmployee(this.id).subscribe(res => {
      this.employee = res;
    })
  }

  onEditJobInfo(){
    const ref = this.dialogService.open(ModifyJobInfoComponent, {
      data: {
        id: this.id,
        dto: this.employee.employeeInformation.jobInformation
      },
      header: 'Modify Job Information',
      width: '50%'
    });

    ref.onClose.subscribe((email: string) => {
      if (email) {
        this.getEmployee();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified job information!'});
      }
    });
  }

}
