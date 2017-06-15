import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoodsReceiptRoutes } from './goodsReceipt.routes';
import { ReceiptDetails } from './receiptDetails/receiptDetails.component';
import { goodsReceiptService } from './goodsReceipt.service';
//import { ScanComponent } from '../scan/scan.component';


@NgModule({
  imports: [
    RouterModule.forChild(GoodsReceiptRoutes),CommonModule
  ],
  exports: [],
  declarations: [
    ReceiptDetails
    //,ScanComponentPrePaidFreight,Order,SourceInfo,CancelGoods,CancelGoodsSuccess,ReceiptDetails
  ],
  providers: [goodsReceiptService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoodsReceiptModule  { }
