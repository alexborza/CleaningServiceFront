import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/core/model/representation/users/Employee';
import { UserApiService } from 'src/app/core/services/user-api.service';
import { ModifyJobInfoComponent } from './modify-job-info/modify-job-info.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [ DialogService ]
})
export class EmployeeDetailComponent implements OnInit {
  
  id!: number;
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApiService,
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
    this.userApi.getUser(this.id).subscribe(res => {
      this.employee = <Employee> res;
    })
  }

  onEditJobInfo(){
    const ref = this.dialogService.open(ModifyJobInfoComponent, {
      data: {
        id: this.employee.jobInformationRepresentation.id,
        dto: this.employee.jobInformationRepresentation
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

  back(){
    this.router.navigate(['/administrator/employees']);
  }

}
