import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { DividerModule } from 'primeng/divider';
import { QuoteRequestsComponent } from './quote-requests/quote-requests.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { QuoteRequestComponent } from './quote-request/quote-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ServicesHistoryComponent } from './services-history/services-history.component';
import { CleaningServiceComponent } from './cleaning-service/cleaning-service.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    QuoteRequestsComponent,
    QuoteRequestComponent,
    ServicesHistoryComponent,
    CleaningServiceComponent
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
    ToastModule
  ]
})
export class AdministratorModule { }
