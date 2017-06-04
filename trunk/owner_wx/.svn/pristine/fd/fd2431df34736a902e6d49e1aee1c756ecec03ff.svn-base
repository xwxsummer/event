import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliverGoodsRoutes } from './deliverGoods.routes';
import { DeliverGoods } from './deliverGoods.component';
import { PublicGoods } from './deliverGoods.component.child';
import { Success } from './success/success.component';
import { Remarks } from './Remarks/Remarks.component';
import { Map } from '../map/map.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    RouterModule.forChild( DeliverGoodsRoutes ),CommonModule,FormsModule,ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    DeliverGoods,PublicGoods,Success,Map,Remarks
  ],
  providers: []
})
export class DeliverGoodsModule { }
