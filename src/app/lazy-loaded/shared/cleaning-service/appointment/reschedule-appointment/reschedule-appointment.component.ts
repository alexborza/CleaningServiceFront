import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppointmentCreation } from 'src/app/core/model/creation/appointment/AppointmentCreation';
import { Appointment } from 'src/app/core/model/representation/appointment/Appointment';
import { EmployeeAvailableInterval } from 'src/app/core/model/representation/shared/EmployeeAvailableInterval';
import { checkRequiredFields } from 'src/app/core/services/error/validate';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.scss']
})
export class RescheduleAppointmentComponent implements OnInit {

  rescheduleForm: FormGroup;
  appointment: Appointment;
  timeEstimation: number;
  minimumDate: Date = new Date();
  employeeAvailableIntervals: EmployeeAvailableInterval[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.appointment = this.config.data?.appointment;
    this.timeEstimation = this.config.data?.timeEstimation;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.rescheduleForm = new FormGroup({
      cleaningDate: new FormControl(null, [Validators.required]),
      interval: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(formValue: any){
    checkRequiredFields(this.rescheduleForm.controls);
    if(this.rescheduleForm.valid){
      const appointmentCreation = new AppointmentCreation(formValue.interval.employeeId, formValue.cleaningDate, formValue.interval.availableInterval);
      this.ref.close(appointmentCreation)
    }
  }

  onClose(){
    this.ref.close();
  }

}
