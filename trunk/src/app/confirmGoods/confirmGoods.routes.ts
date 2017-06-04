import { RouterModule } from '@angular/router';
import { ConfirmGoods } from './confirmGoods.component';
import { ReceivingConfirm } from './receivingConfirm/receivingConfirm.component';
import { ReceivedSuccess } from './receivedSuccess/receivedSuccess.component';
import { ExceptionHanding } from './exceptionHanding/exceptionHanding.component';
import { ExceptionSuccess } from './exceptionSuccess/exceptionSuccess.component';
import { SuccessGoods } from './successGoods/successGoods.component';
import { DetailsPage } from './detailsPage/detailsPage.component';
export const ConfirmGoodsRoutes=[
  {
    path:'',  
    component:ConfirmGoods
  },
   {
    path:'ReceivingConfirm',
    component:ReceivingConfirm
  },
   {
    path:'ReceivingConfirm/:id',
    component:ReceivingConfirm
  },
  {
    path:'ReceivedSuccess',
    component:ReceivedSuccess
  },
  {
    path:'ReceivedSuccess/:id',
    component:ReceivedSuccess
  },
  {
    path:'ExceptionHanding',
    component:ExceptionHanding
  },
  {
    path:'ExceptionHanding/:id',
    component:ExceptionHanding
  },
  {
    path:'ExceptionSuccess',
    component:ExceptionSuccess
  },
   {
    path:'SuccessGoods',
    component:SuccessGoods
  },
  {
    path:'DetailsPage',
    component:DetailsPage
  }
];
