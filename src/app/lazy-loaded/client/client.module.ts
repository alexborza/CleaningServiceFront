import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ClientOrdersComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    TableModule,
    CardModule,
    ButtonModule,
    ToastModule
  ]
})
export class ClientModule { }
