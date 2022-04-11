import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { UserApiService } from 'src/app/core/services/user-api.service';

@Component({
  selector: 'app-modify-email',
  templateUrl: './modify-email.component.html',
  styleUrls: ['./modify-email.component.scss']
})
export class ModifyEmailComponent implements OnInit {

  form!: FormGroup;
  email: string = '';
  id!: number;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private userApi: UserApiService
  ) { 
    this.email = this.config.data?.email;
    this.id = this.config.data?.id;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.form = new FormGroup({
      email: new FormControl({value: this.email, disabled: true}, Validators.required),
      newEmail: new FormControl('', [Validators.required])
    })
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      this.userApi.modifyEmail(this.id, formValue.newEmail).subscribe(res => {
        this.ref.close(formValue.newEmail);
      });
    }
  }
  
  onClose(){
    this.ref.close();
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

}
