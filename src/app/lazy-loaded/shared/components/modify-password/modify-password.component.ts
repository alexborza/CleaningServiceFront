import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModifyPassswordDto } from 'src/app/core/dto/ModifyPasswordDto';
import { ClientService } from 'src/app/core/services/client.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  showEye = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private clientApi: ClientService
  ) {
    this.id = this.config.data?.id;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    })
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      let modifyPasswordDto = new ModifyPassswordDto(formValue.password, formValue.newPassword)
      this.clientApi.modifyPassword(this.id, modifyPasswordDto).subscribe(res => {
        this.ref.close(res.message);
      },
      err => {
        if(err.error.message === "Incorrect password entered"){
          this.form.get('password')?.setErrors({invalid: {message: err.error.message}});
        }
      });
    }
  }

  onClose(){
    this.ref.close();
  }

  onFocus(){
    this.showEye = true;
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }


}