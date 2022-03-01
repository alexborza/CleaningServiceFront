import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UserDto } from 'src/app/core/dto/UserDto';
import { UserInformationDto } from 'src/app/core/dto/UserInformationDto';
import { ClientService } from 'src/app/core/services/client.service';
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
  userDto!: UserDto;

  constructor(
    private route: ActivatedRoute,
    private clientApi: ClientService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = Number.parseInt(params['userId']);
    });
    this.getUser();
  }

  private getUser(){
    this.clientApi.getUser(this.id).subscribe(res => {
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
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully modified personal information'});
      }
    });
  }

  getFullName(){
    return this.userDto.userInformation?.fullName === undefined ? 'Not specified' : this.userDto.userInformation?.fullName;
  }

  getBirthDate(){
    return this.userDto.userInformation?.birthDate === undefined ? 'Not specified' : this.userDto.userInformation?.birthDate;
  }

}
