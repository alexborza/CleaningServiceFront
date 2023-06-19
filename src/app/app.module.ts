import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/helpers/auth.interceptors';
import { LoadingInterceptor } from './core/helpers/loading.interceptor';
import { AuthorizationGuard } from './core/guard/authorization.guard';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { ToastModule } from 'primeng/toast';
import { EmployeeContractGuard } from './core/guard/employee-contract.guard';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SharedModule } from './lazy-loaded/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    SharedModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    AuthorizationGuard,
    AuthenticationGuard,
    EmployeeContractGuard,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
