import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserInformation } from 'src/app/core/model/users/UserInformation';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { UserApiService } from 'src/app/core/services/user-api.service';

@Component({
  selector: 'app-modify-personal-info',
  templateUrl: './modify-personal-info.component.html',
  styleUrls: ['./modify-personal-info.component.scss']
})
export class ModifyPersonalInfoComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  years: string[] = [];
  days: string[] = [];
  months: string[] = [];
  userInfoDto!: UserInformation;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private userApi: UserApiService
  ) {
    this.id = this.config.data?.id;
    this.userInfoDto = this.config.data?.dto;
  }

  ngOnInit(): void {
    this.buildForm();
    this.initializeDropdownsForBirthdate();
  }

  private buildForm(){
    const birthDate = this.userInfoDto?.birthDate.split('-');
    this.form = new FormGroup({
      fullName: new FormControl(this.userInfoDto?.fullName != undefined ? this.userInfoDto.fullName : '', [Validators.required]),
      address: new FormControl(this.userInfoDto?.address != undefined ? this.userInfoDto.address : '', [Validators.required]),
      phoneNumber: new FormControl(this.userInfoDto?.phoneNumber != undefined ? this.userInfoDto.phoneNumber : '', [Validators.required]),
      day: new FormControl(birthDate != undefined ? birthDate[2] : null, [Validators.required]),
      month: new FormControl(birthDate != undefined ? birthDate[1] : null, [Validators.required]),
      year: new FormControl(birthDate != undefined ? birthDate[0] : null,[Validators.required])
    })
  }

  initializeDropdownsForBirthdate(){
    for(let i = 1900; i < 2010; i++){
      this.years.push(i.toString());
    }

    for(let i = 1; i <= 31; i++){
      this.days.push(i.toString().length === 1 ? '0' + i.toString() : i.toString());
    }

    for(let i = 1; i <= 12; i++){
      this.months.push(i.toString().length === 1 ? '0' + i.toString() : i.toString());
    }
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    let userInfoDto = this.createUserInformationDto(formValue);
    this.isValidDate(userInfoDto.birthDate)
    if(this.form.valid){
      let userInfoDto = this.createUserInformationDto(formValue);
      if(this.checkDateValidty(userInfoDto.birthDate)){
        this.modifyPersonalInfo(userInfoDto);
      }
    }
  }

  private modifyPersonalInfo (userInfoDto: UserInformation){
    this.userApi.modifyPersonalInfo(this.id, userInfoDto).subscribe(res => {
      this.ref.close(userInfoDto);
    });
  }

  private createUserInformationDto(formValue: any){
    let dto = new UserInformation();
    dto.fullName = formValue.fullName;
    dto.address = formValue.address;
    dto.phoneNumber = formValue.phoneNumber;
    dto.birthDate = formValue.year + "-" + formValue.month + "-" + formValue.day;
    return dto;
  }

  onClose(){
    this.ref.close();
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private checkDateValidty(date: string){
    if(!this.isValidDate(date)){
      this.form.get('day')?.setErrors({invalid_date: {message: 'Invalid date'}});
      return false;
    }
    return true;
  }

  private isLeap(year: number) {
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
  }

  private isValidDate(date: string) {
    const dateArray = date.split('-');
    const day: number = Number.parseInt(dateArray[2]);
    const month: number = Number.parseInt(dateArray[1]);
    const year: number = Number.parseInt(dateArray[0]);
    if (year > 2010 || year < 1900)
      return false;
    if (month < 1 || month > 12)
      return false;
    if (day < 1 || day > 31)
      return false;

    if (month == 2) {
        if (this.isLeap(year))
          return (day <= 29);
        else
          return (day <= 28);
    }

    if (month == 4 || month == 6 || month == 9 || month == 11)
        return (day <= 30);

    return true;
  }
}
