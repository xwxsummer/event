import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmGoodsRoutes } from './confirmGoods.routes';
import { ConfirmGoods } from './confirmGoods.component';
import { ReceivingConfirm } from './receivingConfirm/receivingConfirm.component';
import { ReceivedSuccess } from './receivedSuccess/receivedSuccess.component';
import { ExceptionHanding } from './exceptionHanding/exceptionHanding.component';
import { ExceptionSuccess } from './exceptionSuccess/exceptionSuccess.component';
import { confirmGoodsService } from './confirmGoods.service';
import { FormsModule } from '@angular/forms';
import { SuccessGoods } from './successGoods/successGoods.component';
import { DetailsPage } from './detailsPage/detailsPage.component';
@NgModule({
  imports: [
    RouterModule.forChild(ConfirmGoodsRoutes),CommonModule,FormsModule
  ],
  exports: [],
  declarations: [
    ConfirmGoods,ReceivingConfirm,ReceivedSuccess,ExceptionHanding,ExceptionSuccess,SuccessGoods,DetailsPage
  ],
  providers: [confirmGoodsService]
})
export class ConfirmGoodsModule{ }
