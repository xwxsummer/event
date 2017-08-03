//import {DetailsInfos} from '../confirmGoods/detailsInfos/detailsInfos.component';
import { RouterModule } from '@angular/router';
import { ConfirmGoods } from './confirmGoods.component';
import { ReceivingConfirm } from './receivingConfirm/receivingConfirm.component';
import { ReceivedSuccess } from './receivedSuccess/receivedSuccess.component';
import { ExceptionHanding } from './exceptionHanding/exceptionHanding.component';
import { ExceptionSuccess } from './exceptionSuccess/exceptionSuccess.component';
import { SuccessGoods } from './successGoods/successGoods.component';
import { DetailsPage } from './detailsPage/detailsPage.component';
//import { SubmitEvaluation } from './submitEvaluation/submitEvaluation.component';
import { EvaluationDetails } from './evaluationDetails/evaluationDetails.component';
import { NegotiateDetails } from './negotiateDetails/negotiateDetails.component';

export const ConfirmGoodsRoutes=[
  {
    path:'ConfirmGoods/:id',  
    component:ConfirmGoods
  },
   {
    path:'ReceivingConfirm/:id',
    component:ReceivingConfirm
  },
  
  {
    path:'ReceivedSuccess/:id',
    component:ReceivedSuccess
  },
 
  {
    path:'ExceptionHanding/:id',
    component:ExceptionHanding
  },
 
  {
    path:'ExceptionSuccess/:id',
    component:ExceptionSuccess
  },
   
  {
    path:'SuccessGoods/:id',
    component:SuccessGoods
  },
  
  {
    path:'DetailsPage/:id',
    component:DetailsPage
  },
   
  // {
  //   path:'DetailsInfos/:id',
  //   component:DetailsInfos
  // },
   {
    path:'EvaluationDetails/:id',
    component:EvaluationDetails
  },
   {
    path:'NegotiateDetails/:id',
    component:NegotiateDetails
  }
];
