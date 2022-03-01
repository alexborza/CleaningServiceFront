import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuModule } from 'primeng/menu';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModifyEmailComponent } from './components/modify-email/modify-email.component';
import { ModifyPasswordComponent } from './components/modify-password/modify-password.component';
import { ModifyPersonalInfoComponent } from './components/modify-personal-info/modify-personal-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'node_modules/primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar'
import { DropdownModule } from 'primeng/dropdown';
import { CleaningServiceComponent } from './cleaning-service/cleaning-service.component';
import { QuoteRequestComponent } from './quote-request/quote-request.component';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    SidebarComponent,
    AccountSettingsComponent,
    ModifyEmailComponent,
    ModifyPasswordComponent,
    ModifyPersonalInfoComponent,
    CleaningServiceComponent,
    QuoteRequestComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MenuModule,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    PasswordModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    SidebarComponent,
    AccountSettingsComponent,
    CleaningServiceComponent,
    QuoteRequestComponent
  ],
  entryComponents: [
    ModifyEmailComponent,
    ModifyPasswordComponent,
    ModifyPersonalInfoComponent
  ]
})
export class SharedModule { }
