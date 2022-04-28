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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ModifyEmergencyContactInfoComponent } from './components/modify-emergency-contact-info/modify-emergency-contact-info.component';
import { JobInfoDetailsComponent } from './components/job-info-details/job-info-details.component';
import { AgendaComponent } from './agenda/agenda.component';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { MessagesHistoryComponent } from './cleaning-service/messages-history/messages-history.component';
import { RescheduleCleaningServiceComponent } from './components/reschedule-cleaning-service/reschedule-cleaning-service.component';
import { CleaningModule } from '../cleaning/cleaning.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    SidebarComponent,
    AccountSettingsComponent,
    ModifyEmailComponent,
    ModifyPasswordComponent,
    ModifyPersonalInfoComponent,
    CleaningServiceComponent,
    ModifyEmergencyContactInfoComponent,
    JobInfoDetailsComponent,
    AgendaComponent,
    MessagesHistoryComponent,
    RescheduleCleaningServiceComponent,
    NavigationComponent,
    ProfileComponent
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
    InputTextareaModule,
    DividerModule,
    ConfirmDialogModule,
    TableModule,
    CleaningModule,
    SelectButtonModule,
    TooltipModule
  ],
  exports: [
    NavigationComponent,
    SidebarComponent,
    AccountSettingsComponent,
    CleaningServiceComponent,
    AgendaComponent,
    ProfileComponent
  ],
  entryComponents: [
    ModifyEmailComponent,
    ModifyPasswordComponent,
    ModifyPersonalInfoComponent,
    RescheduleCleaningServiceComponent
  ]
})
export class SharedModule { }
