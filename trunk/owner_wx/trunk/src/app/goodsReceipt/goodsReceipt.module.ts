import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoodsReceiptRoutes } from './goodsReceipt.routes';
import { ReceiptDetails } from './receiptDetails/receiptDetails.component';
import {goodsReceiptService } from './goodsReceipt.service';


@NgModule({
  imports: [
    RouterModule.forChild(GoodsReceiptRoutes),CommonModule
  ],
  exports: [],
  declarations: [
    ReceiptDetails
    //PrePaidFreight,Order,SourceInfo,CancelGoods,CancelGoodsSuccess,ReceiptDetails
  ],
  providers: [goodsReceiptService],
})
export class GoodsReceiptModule  { }
