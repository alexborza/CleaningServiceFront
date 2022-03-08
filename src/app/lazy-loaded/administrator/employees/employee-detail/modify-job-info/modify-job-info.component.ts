import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmploymentStatusEnum } from 'src/app/core/dto/EmploymentStatusEnum';
import { JobInformationDto } from 'src/app/core/dto/JobInformationDto';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';

@Component({
  selector: 'app-modify-job-info',
  templateUrl: './modify-job-info.component.html',
  styleUrls: ['./modify-job-info.component.scss']
})
export class ModifyJobInfoComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  years: string[] = [];
  days: string[] = [];
  months: string[] = [];
  employmentOptions!: {label: string, value: EmploymentStatusEnum}[];
  jobInfoDto!: JobInformationDto;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private employeeApi: EmployeeApiService
  ) {
    this.id = this.config.data?.id;
    this.jobInfoDto = this.config.data?.dto;
  }

  ngOnInit(): void {
    this.intializeRelationshipOptions();
    this.buildForm();
    this.initializeDropdownsForBirthdate();
  }
  
  private buildForm(){
    const birthDate = this.jobInfoDto?.hiringDate.split('-');
    this.form = new FormGroup({
      title: new FormControl(this.jobInfoDto?.title != undefined ? this.jobInfoDto.title : '', [Validators.required]),
      supervisor: new FormControl(this.jobInfoDto?.supervisor != undefined ? this.jobInfoDto.supervisor : '', [Validators.required]),
      workPhone: new FormControl(this.jobInfoDto?.workPhone != undefined ? this.jobInfoDto.workPhone : '', [Validators.required]),
      employmentStatus: new FormControl(this.jobInfoDto?.employmentStatus != undefined ? this.jobInfoDto.employmentStatus : '', [Validators.required]),
      day: new FormControl(birthDate != undefined ? birthDate[2] : null, [Validators.required]),
      month: new FormControl(birthDate != undefined ? birthDate[1] : null, [Validators.required]),
      year: new FormControl(birthDate != undefined ? birthDate[0] : null,[Validators.required]),
      salary: new FormControl(this.jobInfoDto?.salary != undefined ? this.jobInfoDto.salary : '', [Validators.required])
    })
  }

  private initializeDropdownsForBirthdate(){
    for(let i = 1900; i < 2023; i++){
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
    let dto = this.createJobInfoDto(formValue);
    if(this.form.valid && this.checkDateValidty(dto.hiringDate)){
      this.modifyJobInfo(dto);
    }
  }

  private modifyJobInfo(dto: JobInformationDto){
    this.employeeApi.modifyJobInfo(this.id, dto).subscribe(res => {
      this.ref.close(dto);
    })
  }

  private createJobInfoDto(formValue: any){
    let dto = new JobInformationDto();
    dto.title = formValue.title;
    dto.supervisor = formValue.supervisor;
    dto.workPhone = formValue.workPhone;
    dto.employmentStatus = formValue.employmentStatus;
    dto.hiringDate = formValue.year + "-" + formValue.month + "-" + formValue.day;
    dto.salary = formValue.salary;
    return dto;
  }

  onClose(){
    this.ref.close();
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private intializeRelationshipOptions(){
    this.employmentOptions = [
      { label: "Part Time", value: EmploymentStatusEnum.PartTime},
      { label: "Full Time", value: EmploymentStatusEnum.FullTime}
    ]
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
    if (year > 2023 || year < 1900)
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
