import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { DividerModule } from 'primeng/divider';
import { QuoteRequestsComponent } from './quote-requests/quote-requests.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ServicesHistoryComponent } from './services-history/services-history.component';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';
import { StepsModule } from 'primeng/steps';
import { EmployeeAccountComponent } from './employee-contract/employee-account/employee-account.component';
import { PersonalInformationComponent } from './employee-contract/personal-information/personal-information.component';
import { JobInformationComponent } from './employee-contract/job-information/job-information.component';
import { EmergencyContactInformationComponent } from './employee-contract/emergency-contact-information/emergency-contact-information.component';
import { CardModule } from 'primeng/card';
import { ConfirmationComponent } from './employee-contract/confirmation/confirmation.component';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeesComponent } from './employees/employees.component';
import { MenuModule } from 'primeng/menu';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdministratorComponent,
    QuoteRequestsComponent,
    ServicesHistoryComponent,
    EmployeeContractComponent,
    EmployeeAccountComponent,
    PersonalInformationComponent,
    JobInformationComponent,
    EmergencyContactInformationComponent,
    ConfirmationComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    DividerModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    StepsModule,
    FormsModule,
    CardModule,
    PasswordModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    MenuModule,
    SharedModule
  ]
})
export class AdministratorModule { }
