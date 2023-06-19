import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeContractGuard } from 'src/app/core/guard/employee-contract.guard';
import { ConfirmationComponent } from './employee-contract/confirmation/confirmation.component';
import { EmployeeAccountComponent } from './employee-contract/employee-account/employee-account.component';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';
import { JobInformationComponent } from './employee-contract/job-information/job-information.component';
import { PersonalInformationComponent } from './employee-contract/personal-information/personal-information.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { AgendaComponent } from '../shared/agenda/agenda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CleaningServiceComponent } from '../shared/cleaning-service/cleaning-service.component';
import { ProfileComponent } from '../shared/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'services-agenda' , component: AgendaComponent },
      { path: 'cleaning-details/:id' , component: CleaningServiceComponent, data: {
          canEditService: true
        } 
      },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/:id', component: EmployeeDetailComponent },
      { path: 'employee-contract' , component: EmployeeContractComponent, children: [
        { path: '', redirectTo: 'account', pathMatch: 'full'},
        { path: 'account', component: EmployeeAccountComponent },
        { path: 'personal-info', component: PersonalInformationComponent, canActivate: [EmployeeContractGuard] },
        { path: 'job-info', component: JobInformationComponent, canActivate: [EmployeeContractGuard] },
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
