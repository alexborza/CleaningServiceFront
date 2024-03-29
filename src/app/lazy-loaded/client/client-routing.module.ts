import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from '../shared/account-settings/account-settings.component';
import { CleaningServiceComponent } from '../shared/cleaning-service/cleaning-service.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'account-settings', pathMatch: 'full'},
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'orders', component: ClientOrdersComponent },
      { path: 'orders/:id', component: CleaningServiceComponent, data: {
          canEditService: true
        } 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
