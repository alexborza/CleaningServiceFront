import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ClientProfileComponent,
    ClientOrdersComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    TableModule,
    CardModule,
    ButtonModule
  ]
})
export class ClientModule { }
