import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EmergencyContactInformationDto } from 'src/app/core/dto/EmergencyContactInformationDto';
import { RoleEnum } from 'src/app/core/dto/RoleEnum';
import { UserInformationDto } from 'src/app/core/dto/UserInformationDto';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserApiService } from 'src/app/core/services/user-api.service';
import { JobInfoDetailsComponent } from '../components/job-info-details/job-info-details.component';
import { ModifyEmailComponent } from '../components/modify-email/modify-email.component';
import { ModifyEmergencyContactInfoComponent } from '../components/modify-emergency-contact-info/modify-emergency-contact-info.component';
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
    this.hasEmployeeRole();
    this.getUser();
  }

  private hasEmployeeRole(){
    const user = this.tokenStorage.getUser();
    this.isEmployee = user.roles.includes(RoleEnum.ROLE_EMPLOYEE);
  }

  private getUser(){
    this.userApi.getUser(this.id).subscribe(res => {
      this.userDto = res;
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

    ref.onClose.subscribe((dto: UserInformationDto) => {
      if (dto) {
        this.getUser();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified personal information!'});
      }
    });
  }

  modifyEmergencyContactInfo(){
    const ref = this.dialogService.open(ModifyEmergencyContactInfoComponent, {
      data: {
        id: this.id,
        dto: this.userDto.employeeInformation.emergencyContactInformation
      },
      header: 'Modify emergency contact information',
      width: '50%'
    });

    ref.onClose.subscribe((dto: EmergencyContactInformationDto) => {
      if (dto) {
        this.getUser();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified emergency contact info!'});
      }
    });
  }

  onJobInfoDetails() {
    this.dialogService.open(JobInfoDetailsComponent, {
      data: {
        dto: this.userDto.employeeInformation.jobInformation
      },
      header: 'Job Information Details',
      width: '50%'
    });
  }

  getFullName(){
    return this.userDto.userInformation?.fullName === undefined ? 'Not specified' : this.userDto.userInformation?.fullName;
  }

  getBirthDate(){
    return this.userDto.userInformation?.birthDate === undefined ? 'Not specified' : this.userDto.userInformation?.birthDate;
  }

}
