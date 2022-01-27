import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleaningRoutingModule } from './cleaning-routing.module';
import { OfficeCleaningComponent } from './office-cleaning/office-cleaning.component';
import { InputTextModule} from 'node_modules/primeng/inputtext';
import { ContactInfoComponent } from './components/contact-info/contact-info.component'
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { LocationOfHouseComponent } from './components/location-of-house/location-of-house.component';
import { DropdownModule } from 'primeng/dropdown';
import { CleaningFrequencyComponent } from './components/cleaning-frequency/cleaning-frequency.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CleaningDateComponent } from './components/cleaning-date/cleaning-date.component';
import { CalendarModule } from 'primeng/calendar';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { StandardCleaningServiceDetailComponent } from './components/standard-cleaning-service-detail/standard-cleaning-service-detail.component';
import { EnvironmentalCleaningServiceDetailComponent } from './components/environmental-cleaning-service-detail/environmental-cleaning-service-detail.component';
import { InputMaskModule } from 'primeng/inputmask';
import { OfficeSpaceDetailsComponent } from './components/office-space-details/office-space-details.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { OfficeSpaceTypeComponent } from './components/office-space-type/office-space-type.component';
import { CleaningServiceDetailComponent } from './cleaning-service-detail/cleaning-service-detail.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  declarations: [
    OfficeCleaningComponent,
    ContactInfoComponent,
    LocationOfHouseComponent,
    CleaningFrequencyComponent,
    CleaningDateComponent,
    PaymentDetailsComponent,
    BookingSummaryComponent,
    StandardCleaningServiceDetailComponent,
    EnvironmentalCleaningServiceDetailComponent,
    OfficeSpaceDetailsComponent,
    OfficeSpaceTypeComponent,
    CleaningServiceDetailComponent,
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
  ]
})
export class CleaningModule { }
