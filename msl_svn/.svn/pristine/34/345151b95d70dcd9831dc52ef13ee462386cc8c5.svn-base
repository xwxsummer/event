import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SaoyisaoRoutes } from './saoyisao.routes';
import { Saoyisao } from './saoyisao.component';
//拒绝装车
import { RefuseZhuangche } from './refuseZhuangche/refuseZhuangche.component';
//拒绝成功
import { RefuseSuccess } from './refuseSuccess/refuseSuccess.component';
//拒绝装车详细信息
import { DetailsInfo } from './detailsInfo/detailsInfo.component';
//拒绝装车原因
import { RefuseResult } from './refuseResult/refuseResult.component';
//装车信息
import { ZhuangCheInfo } from './zhuangCheInfo/zhuangCheInfo.component';

import { saoyisaoService } from './saoyisao.service';
import { FirstPage } from './firstPage/firstPage.component';

import {FormsModule} from '@angular/forms';
//装车成功
import { ZhuangcheSuccess } from './zhuangcheSuccess/zhuangcheSuccess.component';
@NgModule({
  imports: [
    RouterModule.forChild(SaoyisaoRoutes),CommonModule,FormsModule
  ],
  exports: [],
  declarations: [
    Saoyisao,RefuseZhuangche,RefuseSuccess,DetailsInfo,RefuseResult,ZhuangCheInfo,ZhuangcheSuccess,FirstPage
  ],
  providers: [saoyisaoService],
})

export class SaoyisaoModule { }
