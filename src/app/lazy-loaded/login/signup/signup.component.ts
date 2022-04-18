import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  showEye: boolean = false;
  action: string = '';
  buttonLabel: string = '';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.action = this.route.snapshot.data?.['action'];
    this.buildForm();
  }

  private buildForm(){
    this.form = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.completeFormGroup();
  }

  private completeFormGroup(){
    if(this.action === 'signup'){
      this.form.addControl('email', new FormControl(null, [Validators.required]));
    }
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      this.submitForm(formValue); 
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The field is required'});
    }
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }
  
  private submitForm(formValue: any){
    if(this.action === 'signin'){
      this.login(formValue);
    } else {
      this.register(formValue);
    }
  }

  private login(formValue: any){
    this.authService.login(formValue.username, formValue.password).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.reloadPage();
      this.messageService.add({severity:'success', summary:'Success', detail:'Successfully logged in'});
    },
    err => {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Invalid username and/or password', life: 5000});
    });
  }

  private register(formValue: any){
    this.authService.register(formValue.username, formValue.email, formValue.password).subscribe(
      res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully registered your account'});
        this.form.reset();
      }, 
      err => {
        this.messageService.add({severity:'error', summary:'Error', detail: err.error.message, life: 5000});
      })
  }

  private reloadPage(): void {
    window.location.reload();
  }

  setHeader(){
    if(this.action === 'signup'){
      return "Create a new account";
    }
    return "Login";
  }

  setButtonLabel() {
    if(this.action === 'signup'){
      return "Register";
    }
    return "Login";
  }

  onFocus(){
    this.showEye = true;
  }
}
