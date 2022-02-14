import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CardModule,
    InputTextModule,
    NgxTrimDirectiveModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule
  ]
})
export class LoginModule { }
