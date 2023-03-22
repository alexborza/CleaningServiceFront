import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleaningRoutingModule } from './cleaning-routing.module';
import { InputTextModule} from 'node_modules/primeng/inputtext';
import { ContactInfoComponent } from './components/contact-info/contact-info.component'
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { LocationOfHouseComponent } from './components/location-of-house/location-of-house.component';
import { DropdownModule } from 'primeng/dropdown';
import { CleaningFrequencyComponent } from './components/cleaning-frequency/cleaning-frequency.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppointmentCreationComponent } from './components/appointment-creation/appointment-creation.component';
import { CalendarModule } from 'primeng/calendar';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { StandardCleaningServiceDetailComponent } from './components/standard-cleaning-service-detail/standard-cleaning-service-detail.component';
import { EnvironmentalCleaningServiceDetailComponent } from './components/environmental-cleaning-service-detail/environmental-cleaning-service-detail.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CleaningServiceCreationComponent } from './cleaning-service-creation/cleaning-service-creation.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  declarations: [
    ContactInfoComponent,
    LocationOfHouseComponent,
    CleaningFrequencyComponent,
    AppointmentCreationComponent,
    PaymentDetailsComponent,
    BookingSummaryComponent,
    StandardCleaningServiceDetailComponent,
    EnvironmentalCleaningServiceDetailComponent,
    CleaningServiceCreationComponent,
  ],
  imports: [
    CommonModule,
    CleaningRoutingModule,
    InputTextModule,
    PanelModule,
    ReactiveFormsModule,
    DropdownModule,
    SelectButtonModule,
    CalendarModule,
    DividerModule,
    CardModule,
    InputMaskModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
    NgxTrimDirectiveModule
  ],
  exports: [
    AppointmentCreationComponent
  ]
})
export class CleaningModule { }
