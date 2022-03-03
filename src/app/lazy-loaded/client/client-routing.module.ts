import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from '../shared/account-settings/account-settings.component';
import { CleaningServiceComponent } from '../shared/cleaning-service/cleaning-service.component';
import { QuoteRequestComponent } from '../shared/quote-request/quote-request.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

const routes: Routes = [
  { path: '', component: ClientProfileComponent, children: [
      { path: '', redirectTo: 'account-settings', pathMatch: 'full'},
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'orders', component: ClientOrdersComponent },
      { path: 'orders/cleaning-service/:id', component: CleaningServiceComponent },
      { path: 'orders/quote-request/:id', component: QuoteRequestComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
