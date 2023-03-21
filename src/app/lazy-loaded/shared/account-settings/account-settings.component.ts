import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/core/model/representation/users/Employee';
import { Role } from 'src/app/core/model/representation/users/Role';
import { UserInformation } from 'src/app/core/model/representation/users/UserInformation';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserApiService } from 'src/app/core/services/user-api.service';
import { JobInfoDetailsComponent } from '../components/job-info-details/job-info-details.component';
import { ModifyEmailComponent } from '../components/modify-email/modify-email.component';
import { ModifyPasswordComponent } from '../components/modify-password/modify-password.component';
import { ModifyPersonalInfoComponent } from '../components/modify-personal-info/modify-personal-info.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  providers: [ DialogService ]
})
export class AccountSettingsComponent implements OnInit {

  id!: number;
  userDto!: any;
  isEmployee = false;

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
    public dialogService: DialogService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getUser();
  }

  private getUser(){
    const user = this.tokenStorage.getUser();
    this.userApi.getUser(this.id).subscribe(res => {
      if(user.role === Role.EMPLOYEE) {
        this.userDto = <Employee> res;
        this.isEmployee = true;
      } else {
        this.userDto = res;
        this.isEmployee = false;
      }
    })
  }

  modifyEmail(){
    const ref = this.dialogService.open(ModifyEmailComponent, {
      data: {
          email: this.userDto.email,
          id: this.id
      },
      header: 'Modify email',
      width: '50%'
    });

    ref.onClose.subscribe((email: string) => {
      if (email) {
        this.getUser();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified email'});
      }
    });
  }

  modifyPasssword(){
    const ref = this.dialogService.open(ModifyPasswordComponent, {
      data: {
        id: this.id
      },
      header: 'Modify password',
      width: '50%'
    });

    ref.onClose.subscribe((message: string) => {
      if (message) {
        this.getUser();
        this.messageService.add({severity:'success', summary: 'Success', detail: message});
      }
    });
  }

  modifyPersonalInfo() {
    const ref = this.dialogService.open(ModifyPersonalInfoComponent, {
      data: {
        id: this.id,
        dto: this.userDto.userInformation
      },
      header: 'Modify personal information',
      width: '50%'
    });

    ref.onClose.subscribe((dto: UserInformation) => {
      if (dto) {
        this.getUser();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified personal information!'});
      }
    });
  }

  onJobInfoDetails() {
    this.dialogService.open(JobInfoDetailsComponent, {
      data: {
        dto: this.userDto.jobInformationRepresentation
      },
      header: 'Job Information Details',
      width: '50%'
    });
  }
}
