import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarketRoutes } from './market.routes';
import { Market } from './market.component';
import { MarketInfo } from './marketInfo/marketInfo.component';
import { MyGoods } from '../myGoods/myGoods.component';
import { GoodsReceipt } from '../goodsReceipt/goodsReceipt.component';
import { PersonalCenter } from '../personalCenter/personalCenter.component';
import {goodsLabels} from './marketInfo/goodsLabels/goodsLabels.component'
@NgModule({
  imports: [
    RouterModule.forChild(MarketRoutes),CommonModule
  ],
  exports: [],
  declarations: [
    Market,MarketInfo,MyGoods,GoodsReceipt,PersonalCenter,goodsLabels
  ],
  providers: [],
})
export class MarketModule { }
