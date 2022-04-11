import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeesDayAgenda } from 'src/app/core/dto/EmployeesDayAgenda';
import { RescheduleDateDto } from 'src/app/core/dto/RescheduleDateDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { EmployeeApiService } from 'src/app/core/services/employee-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';

@Component({
  selector: 'app-reschedule-cleaning-service',
  templateUrl: './reschedule-cleaning-service.component.html',
  styleUrls: ['./reschedule-cleaning-service.component.scss']
})
export class RescheduleCleaningServiceComponent implements OnInit {

  id: number;
  form: FormGroup;
  timeEstimation: number;
  datesToReschedule: string[] = [];
  employeesDayAgenda: EmployeesDayAgenda[] = []

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private employeeApi: EmployeeApiService,
    private cleaningApi: CleaningApiService,
    private fb: FormBuilder,
  ) { 
    this.id = this.config.data?.id;
    this.timeEstimation = this.config.data?.timeEstimation;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getDatesToReschedule();
    this.getEmployeesAgendaForDate();
  }

  private buildForm(){
    this.form = this.fb.group({
      cleaning_date: this.fb.group({
        cleaningDate: new FormControl(null, [Validators.required]),
        hour: new FormControl(null, [Validators.required])
      }),
      dateToReschedule: new FormControl(null, [Validators.required])
    })
  }

  private getDatesToReschedule(){
    this.cleaningApi.getDatesToReschedule(this.id).subscribe(res => {
      this.datesToReschedule = res;
    })
  }

  private getEmployeesAgendaForDate(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_date.get('cleaningDate')?.valueChanges.subscribe(cleaningDate => {
      if(cleaningDate != null){
        cleaning_date.get('hour')?.setValue(null);
        this.employeeApi.getEmployeesAgendaForDate(cleaningDate).subscribe(res => {
          this.employeesDayAgenda = res;
        })
      }
    });
  }

  public onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      console.log('valid form');
      let dto = new RescheduleDateDto(
        formValue.dateToReschedule,
        formValue.cleaning_date.cleaningDate,
        formValue.cleaning_date.hour.interval.startingHour,
        formValue.cleaning_date.hour.interval.endingHour);
        console.log(dto);
    } else {
      console.log('invalid form');
    }
  }

  private checkRequiredFields(){
    checkRequiredFields((this.form.get('cleaning_date') as FormGroup).controls);
    checkRequiredFields(this.form.controls);
  }
}
