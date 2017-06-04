import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyGoodsRoutes } from './myGoods.routes';
import { PrePaidFreight } from './prePaidFreight/prePaidFreight.component';
import { Order } from './order/order.component';
import { SourceInfo } from './sourceInfo/sourceInfo.component';
import { CancelGoods } from './cancelGoods/cancelGoods.component';
import { CancelGoodsSuccess } from './cancelGoodsSuccess/cancelGoodsSuccess.component';
//http
import { myGoodsService } from './myGoods.service';
@NgModule({
  imports: [
    RouterModule.forChild(MyGoodsRoutes),CommonModule
  ],
  exports: [],
  declarations: [
    PrePaidFreight,Order,SourceInfo,CancelGoods,CancelGoodsSuccess
  ],
  providers: [myGoodsService]
})
export class MyGoodsModule { }
