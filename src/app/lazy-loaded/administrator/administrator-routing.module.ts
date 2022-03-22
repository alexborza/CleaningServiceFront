import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeContractGuard } from 'src/app/core/guard/employee-contract.guard';
import { AdministratorComponent } from './administrator/administrator.component';
import { ConfirmationComponent } from './employee-contract/confirmation/confirmation.component';
import { EmergencyContactInformationComponent } from './employee-contract/emergency-contact-information/emergency-contact-information.component';
import { EmployeeAccountComponent } from './employee-contract/employee-account/employee-account.component';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';
import { JobInformationComponent } from './employee-contract/job-information/job-information.component';
import { PersonalInformationComponent } from './employee-contract/personal-information/personal-information.component';
import { EmployeesComponent } from './employees/employees.component';
import { QuoteRequestComponent } from '../../lazy-loaded/shared/quote-request/quote-request.component';
import { QuoteRequestsComponent } from './quote-requests/quote-requests.component';
import { ServicesHistoryComponent } from './services-history/services-history.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { AgendaComponent } from '../shared/agenda/agenda.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      { path: 'quote-requests', component: QuoteRequestsComponent },
      { path: 'quote-requests/:id', component: QuoteRequestComponent },
      { path: 'services-agenda' , component: AgendaComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/:id', component: EmployeeDetailComponent },
      { path: 'employee-contract' , component: EmployeeContractComponent, children: [
        { path: '', redirectTo: 'account', pathMatch: 'full'},
        { path: 'account', component: EmployeeAccountComponent },
        { path: 'personal-info', component: PersonalInformationComponent, canActivate: [EmployeeContractGuard] },
        { path: 'job-info', component: JobInformationComponent, canActivate: [EmployeeContractGuard] },
        { path: 'emergency-contact-info', component: EmergencyContactInformationComponent, canActivate: [EmployeeContractGuard] },
        { path: 'confirmation', component: ConfirmationComponent, canActivate: [EmployeeContractGuard] }
      ] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
