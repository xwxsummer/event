import {OrdertypeComponent} from './ordertype.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdertypeRoutes } from './ordertype.routes';
import { ordertypeService } from "app/orderType/ordertype.service";
import { ConfirmOrdertypeComponent } from './confirm-ordertype/confirm-ordertype.component';
import {FormsModule} from '@angular/forms';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
  imports: [
    RouterModule.forChild(OrdertypeRoutes),CommonModule,FormsModule
  ],
  exports: [],
  declarations: [
    OrdertypeComponent,
    ConfirmOrdertypeComponent,
    OrderSuccessComponent 
  ],
  providers: [ordertypeService],
})

export class OrdertypeModule{ }
