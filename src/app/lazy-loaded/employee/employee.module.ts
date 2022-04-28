import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    CardModule,
    DividerModule
  ]
})
export class EmployeeModule { }
