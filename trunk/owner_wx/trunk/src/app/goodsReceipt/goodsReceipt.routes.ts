import { RouterModule } from '@angular/router';
import { ReceiptDetails } from './receiptDetails/receiptDetails.component';
//import { Saoyisao } from '../sayisao/saoyisao.component';


export const GoodsReceiptRoutes=[
  {
    path:'ReceiptDetails',
    component:ReceiptDetails
  },
  {
    path:'ReceiptDetails/:id',
    component:ReceiptDetails
  },
   {
    path:'saoyisao/:id',
    component:ReceiptDetails
  }
];