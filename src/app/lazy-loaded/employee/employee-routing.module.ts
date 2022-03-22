import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from '../shared/account-settings/account-settings.component';
import { AgendaComponent } from '../shared/agenda/agenda.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

const routes: Routes = [
  { path: '', component: EmployeeProfileComponent, children: [
    { path: '', redirectTo: 'account-settings', pathMatch: 'full'},
    { path: 'account-settings', component: AccountSettingsComponent },
    { path: 'agenda', component: AgendaComponent }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
