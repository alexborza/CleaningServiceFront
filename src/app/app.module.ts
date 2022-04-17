import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/helpers/auth.interceptors';
import { AuthorizationGuard } from './core/guard/authorization.guard';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { ToastModule } from 'primeng/toast';
import { EmployeeContractGuard } from './core/guard/employee-contract.guard';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SharedModule } from './lazy-loaded/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthorizationGuard,
    AuthenticationGuard,
    EmployeeContractGuard,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
