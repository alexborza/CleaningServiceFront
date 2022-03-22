import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    EmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    CardModule,
    DividerModule
  ]
})
export class EmployeeModule { }
