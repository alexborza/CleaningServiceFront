import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from '../shared/account-settings/account-settings.component';
import { AgendaComponent } from '../shared/agenda/agenda.component';
import { CleaningServiceComponent } from '../shared/cleaning-service/cleaning-service.component';
import { ProfileComponent } from '../shared/profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, children: [
    { path: '', redirectTo: 'account-settings', pathMatch: 'full'},
    { path: 'account-settings', component: AccountSettingsComponent },
    { path: 'agenda', component: AgendaComponent },
    { path: 'agenda/:id', component: CleaningServiceComponent }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
