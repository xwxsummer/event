import {TopupComponent} from './my-wallet/topup/topup.component';
import {AccountDetailsComponent} from './my-wallet/account-details/account-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from "app/content/content.component";
import { MyGoodsComponent } from "app/content/my-goods/my-goods.component";
import { PersonalCenterComponent } from "app/content/personal-center/personal-center.component";
import { MapComponent } from "app/content/personal-center/map/map.component";
import { MyWalletComponent } from "app/content/my-wallet/my-wallet.component";
import { InvoiceDetailsComponent } from "app/content/my-goods/invoice-details/invoice-details.component";
import { OrderDetailsComponent } from "app/content/my-goods/order-details/order-details.component";
import { DeliverGoodsComponent } from "app/content/my-goods/deliver-goods/deliver-goods.component";
import {BusinessComponent} from "./personal-center/business/business.component";
import { AddressComponent } from './personal-center/address/address.component';
import { ReceivaddressComponent } from './personal-center/receivaddress/receivaddress.component';
import { PayComponent } from './my-goods/pay/pay.component';
import { PersonalMessageComponent } from "app/content/personal-center/personal-message/personal-message.component";
import { InvoiceDetailsInfoComponent } from "app/content/my-goods/invoice-details-info/invoice-details-info.component";
import { OrderDetailsInfoComponent } from "app/content/my-goods/order-details-info/order-details-info.component";
import { ConfirmgoodsComponent } from './my-goods/confirmgoods/confirmgoods.component';

import { TrajectoryMapComponent } from './my-goods/trajectory-map/trajectory-map.component';


import { OrderQueryComponent } from "app/content/my-goods/order-query/order-query.component";
import { PaymentsComponent } from "app/content/my-wallet/payments/payments.component";
import { ChangePwdComponent } from "app/content/my-wallet/change-pwd/change-pwd.component";
import { WithdrawalComponent } from "app/content/my-wallet/withdrawal/withdrawal.component";
import { CardManagementComponent } from "app/content/my-wallet/card-management/card-management.component";

export const ContnentRoutes: Routes = [
    {
        path: '',
        component:ContentComponent,children:[
            {path:'',component:MyGoodsComponent,
            children:[
                {path:'',component:InvoiceDetailsComponent},
                {path:'deliverGoods',component:DeliverGoodsComponent},
                {path:'invoiceDetails/:id',component:InvoiceDetailsComponent},
                {path:'orderDetails/:id',component:OrderDetailsComponent},
              ]
            },
            {path: 'myGoods',component:MyGoodsComponent,
            children:[
                {path:'',component:InvoiceDetailsComponent},
                {path:'deliverGoods/:type',component:DeliverGoodsComponent},
                {path:'invoiceDetails/:id',component:InvoiceDetailsComponent},
                {path:'orderDetails/:id',component:OrderDetailsComponent},
                {path:'orderDetailsInfo/:id',component:OrderDetailsInfoComponent},
                {path:'invoiceDetailsInfo/:id',component:InvoiceDetailsInfoComponent},
                {path:'pay/:id',component:PayComponent},
                {path:'confirmgoods',component:ConfirmgoodsComponent},
                {path: 'TrajectoryMap/:id',component:TrajectoryMapComponent},
                {path:'confirmgoods/:orderNo',component:ConfirmgoodsComponent},
                {path:'orderQuery/:id',component:OrderQueryComponent}
              ]
            },

            {path: 'myWallet',component:MyWalletComponent,
            children:[
                {path: '',component:AccountDetailsComponent},
                {path: 'accountDetails',component:AccountDetailsComponent},
                {path:'topup',component:TopupComponent},
                {path:'payments',component:PaymentsComponent},
                {path:'changePwd',component:ChangePwdComponent},
                {path:'withdrawal',component:WithdrawalComponent},
                {path:'cardManagement',component:CardManagementComponent},
              ]
            },


            {path: 'personalCenter',component:PersonalCenterComponent,
            children:[
              {path:'',component:PersonalMessageComponent},
              {path:'personalMessage',component:PersonalMessageComponent},
              {path:'address',component:AddressComponent},
              {path:'map',component:MapComponent},
              {path:'receivaddress',component:ReceivaddressComponent},
              {path:'business',component:BusinessComponent},
              {path:'invoiceDetailsInfo/:id',component:InvoiceDetailsInfoComponent},
              {path:'orderDetailsInfo/:id',component:OrderDetailsInfoComponent},
              {path:'TrajectoryMap/:id',component:TrajectoryMapComponent}
            ]}
        ]
    }
];
