import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { CleaningServiceComponent } from './cleaning-service/cleaning-service.component';
import { QuoteRequestComponent } from './quote-request/quote-request.component';
import { QuoteRequestsComponent } from './quote-requests/quote-requests.component';
import { ServicesHistoryComponent } from './services-history/services-history.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      { path: 'quote-requests', component: QuoteRequestsComponent },
      { path: 'quote-requests/:id', component: QuoteRequestComponent },
      { path: 'services-history' , component: ServicesHistoryComponent },
      { path: 'services-history/:id' , component: CleaningServiceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
