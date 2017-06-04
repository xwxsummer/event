import { RouterModule } from '@angular/router';
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
//装车成功
import { ZhuangcheSuccess } from './zhuangcheSuccess/zhuangcheSuccess.component';

export const SaoyisaoRoutes=[
  {
    path:'',
    component:Saoyisao
  }
  ,{
    path:'RefuseZhuangche',
    component:RefuseZhuangche
  }
   ,{
    path:'RefuseZhuangche/:id',
    component:RefuseZhuangche
  }
  ,{
    path:'RefuseSuccess',
    component:RefuseSuccess
  }
  ,{
    path:'RefuseSuccess/:id',
    component:RefuseSuccess
  }
  ,{
    path:'DetailsInfo',
    component:DetailsInfo
  },
  {
    path:'DetailsInfo/:id',
    component:DetailsInfo
  }
  ,{
    path:'RefuseResult',
    component:RefuseResult
  }
   ,{
    path:'RefuseResult/:id',
    component:RefuseResult
  }
  ,{
    path:'ZhuangCheInfo',
    component:ZhuangCheInfo
  },
  {
    path:'ZhuangCheInfo/:id',
    component:ZhuangCheInfo
  },
  {
    path:'ZhuangcheSuccess',
    component:ZhuangcheSuccess
  },
  {
    path:'ZhuangcheSuccess/:id',
    component:ZhuangcheSuccess
  },
  {
     path:'RefuseSuccess',
    component:RefuseSuccess
  },
  {
     path:'RefuseSuccess/:id',
    component:RefuseSuccess
  }
];
