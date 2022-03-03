import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmergencyContactInformationDto } from 'src/app/core/dto/EmergencyContactInformationDto';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';

@Component({
  selector: 'app-modify-emergency-contact-info',
  templateUrl: './modify-emergency-contact-info.component.html',
  styleUrls: ['./modify-emergency-contact-info.component.scss']
})
export class ModifyEmergencyContactInfoComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  relationshipOptions!: {label: string}[];
  emergencyContactInfo!: EmergencyContactInformationDto;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private employeeApi: EmployeeApiService
  ) {
    this.id = this.config.data?.id;
    this.emergencyContactInfo = this.config.data?.dto;
  }

  ngOnInit(): void {
    this.intializeRelationshipOptions();
    this.buildForm();
  }
  
  private buildForm(){
    this.form = new FormGroup({
      fullName: new FormControl(this.emergencyContactInfo?.fullName != undefined ? this.emergencyContactInfo.fullName : '', [Validators.required]),
      address: new FormControl(this.emergencyContactInfo?.address != undefined ? this.emergencyContactInfo.address : '', [Validators.required]),
      phoneNumber: new FormControl(this.emergencyContactInfo?.phoneNumber != undefined ? this.emergencyContactInfo.phoneNumber : '', [Validators.required]),
      relationship: new FormControl(this.emergencyContactInfo?.relationship != undefined ? this.emergencyContactInfo.relationship : '', [Validators.required])
    })
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      let dto = this.createEmergencyContactInfoDto(formValue);
      this.modifyEmergencyContactInfo(dto);
    }
  }

  private modifyEmergencyContactInfo(dto: EmergencyContactInformationDto){
    this.employeeApi.modifyEmergencyContactInfo(this.id, dto).subscribe(res => {
      this.ref.close(dto);
    })
  }

  private createEmergencyContactInfoDto(formValue: any){
    let dto = new EmergencyContactInformationDto();
    dto.fullName = formValue.fullName;
    dto.address = formValue.address;
    dto.phoneNumber = formValue.phoneNumber;
    dto.relationship = formValue.relationship;
    return dto;
  }

  onClose(){
    this.ref.close();
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private intializeRelationshipOptions(){
    this.relationshipOptions = [
      {label: "Mother"},
      {label: "Husband"},
      {label: "Wife"},
      {label: "Father"},
      {label: "Daughter"},
      {label: "Son"},
      {label: "Sister"},
      {label: "Brother"},
      {label: "Aunt"},
      {label: "Uncle"},
      {label: "Niece"},
      {label: "Nephew"},
      {label: "Cousin"},
      {label: "Grandmother"},
      {label: "Grandfather"},
      {label: "Granddaughter"},
      {label: "Grandson"},
      {label: "Stepsister"},
      {label: "Stepbrother"},
      {label: "Stepmother"},
      {label: "Friend"},
    ]
  }

}
