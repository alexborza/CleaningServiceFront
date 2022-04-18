import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatesToRescheduleDto } from 'src/app/core/dto/DatesToRescheduleDto';
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
export class RescheduleCleaningServiceComponent implements OnInit, AfterContentChecked {

  id: number;
  form: FormGroup;
  timeEstimation: number;
  canCancelCleaningService: boolean;
  datesToReschedule: DatesToRescheduleDto[] = [];
  datesToRescheduleInitialArray: DatesToRescheduleDto[] = [];
  employeesDayAgenda: EmployeesDayAgenda[] = []
  minDate: Date;
  maxDate: Date;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private employeeApi: EmployeeApiService,
    private cleaningApi: CleaningApiService,
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { 
    this.id = this.config.data?.id;
    this.timeEstimation = this.config.data?.timeEstimation;
    this.canCancelCleaningService = this.config.data?.canCancelCleaningService;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getDatesToReschedule();
    this.getEmployeesAgendaForDate();
    this.getDateToReschedule();
  }

  private buildForm(){
    this.form = this.fb.group({
      cleaning_date: this.fb.group({
        cleaningDate: new FormControl({value: null, disabled: true}, [Validators.required]),
        hour: new FormControl(null, [Validators.required])
      }),
      dateToReschedule: new FormControl(null, [Validators.required])
    })
  }

  private getDatesToReschedule(){
    this.cleaningApi.getDatesToReschedule(this.id).subscribe(res => {
      this.datesToRescheduleInitialArray = JSON.parse(JSON.stringify(res));
      if(res.length > 1) {
        res.pop();
      }
      this.datesToReschedule = res;
    })
  }

  private getEmployeesAgendaForDate(){
    const cleaning_date = this.form.get('cleaning_date') as FormGroup;
    cleaning_date.get('cleaningDate')?.valueChanges.subscribe(cleaningDate => {
      if(cleaningDate != null){
        cleaning_date.get('hour')?.setValue(null);
        this.employeeApi.getEmployeesAgendaForDate(cleaningDate, null).subscribe(res => {
          this.employeesDayAgenda = res;
        })
      }
    });
  }

  private getDateToReschedule(){
    this.form.get('dateToReschedule').valueChanges.subscribe((dateToRescheduleValue) => {
      if(dateToRescheduleValue){
        const cleaning_date = this.form.get('cleaning_date') as FormGroup;
        cleaning_date.get('cleaningDate').enable();
        cleaning_date.get('cleaningDate').setValue(null);
        this.setCalendarOptions(dateToRescheduleValue);
      }
    })
  }

  private setCalendarOptions(dateToRescheduleValue){
    if(dateToRescheduleValue.date == this.datesToRescheduleInitialArray[0].date){
      if(this.datesToRescheduleInitialArray.length == 1){
        this.minDate = new Date();
      } else {
        this.minDate = new Date();
        this.maxDate = new Date(this.datesToRescheduleInitialArray[1].date);
      }
    } else {
      let indexOfValue = this.datesToRescheduleInitialArray.findIndex(dateToReschedule => dateToReschedule.date === dateToRescheduleValue.date)
      this.minDate = new Date(this.datesToRescheduleInitialArray[indexOfValue - 1].date);
      this.maxDate = new Date(this.datesToRescheduleInitialArray[indexOfValue + 1].date);
    }
  }

  public onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      let dto = new RescheduleDateDto(
        formValue.dateToReschedule.date,
        formValue.cleaning_date.cleaningDate,
        formValue.cleaning_date.hour.interval.startingHour,
        formValue.cleaning_date.hour.interval.endingHour);
      this.rescheduleCleaningService(dto);
    }
  }

  onCancel(){
    const formValue = this.form.getRawValue();
    let dto = new RescheduleDateDto(formValue.dateToReschedule.date, null, 0, 0);
    this.rescheduleCleaningService(dto);
  }

  private rescheduleCleaningService(dto: RescheduleDateDto){
    this.cleaningApi.rescheduleCleaningService(this.id, dto).subscribe(res => {
      this.ref.close(dto);
    })
  }

  private checkRequiredFields(){
    checkRequiredFields((this.form.get('cleaning_date') as FormGroup).controls);
    checkRequiredFields(this.form.controls);
  }
}
