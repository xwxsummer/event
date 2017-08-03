import {TopupComponent} from './my-wallet/topup/topup.component';
import {AccountDetailsComponent} from './my-wallet/account-details/account-details.component';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from "app/content/my-goods/order-details/order-details.component";
import { InvoiceDetailsComponent } from "app/content/my-goods/invoice-details/invoice-details.component";
import { MyWalletComponent } from "app/content/my-wallet/my-wallet.component";
import { PersonalCenterComponent } from "app/content/personal-center/personal-center.component";
import { MyGoodsComponent } from "app/content/my-goods/my-goods.component";
import { ContentComponent } from "app/content/content.component";
import { ContnentRoutes } from "app/content/content.routes";
import { DeliverGoodsComponent } from "app/content/my-goods/deliver-goods/deliver-goods.component";
//import { WaitingListComponent } from './my-goods/waiting-list/waiting-list.component';
//import { UnderwayGoingComponent } from './my-goods/underway-going/underway-going.component';
//import { AwaitOrdersComponent } from './my-goods/await-orders/await-orders.component';
//import { AwaitGoodsComponent } from './my-goods/await-goods/await-goods.component';
//import { HaveGoodsComponent } from './my-goods/have-goods/have-goods.component';
//import { NegotiationingComponent } from './my-goods/negotiationing/negotiationing.component';
import { PaginationComponent } from "app/pagination/pagination.component";
import { MyGoodsService } from "app/content/my-goods/my-goods.service";
import { MapComponent } from './personal-center/map/map.component';
import { AddressComponent } from './personal-center/address/address.component';
import {BusinessComponent} from "./personal-center/business/business.component";
import { ReceivaddressComponent } from './personal-center/receivaddress/receivaddress.component';
import { PayComponent } from './my-goods/pay/pay.component';
import { ConfirmgoodsComponent } from './my-goods/confirmgoods/confirmgoods.component';
import { PersonalMessageComponent } from './personal-center/personal-message/personal-message.component';
import { PersonalCenterService } from "app/content/personal-center/personal-center.service";
import { OrderDetailsInfoComponent } from './my-goods/order-details-info/order-details-info.component';
import { InvoiceDetailsInfoComponent } from './my-goods/invoice-details-info/invoice-details-info.component';
import { TrajectoryMapComponent } from './my-goods/trajectory-map/trajectory-map.component';
import { OrderQueryComponent } from './my-goods/order-query/order-query.component';
import { MyWalletService } from "app/content/my-wallet/my-wallet.service";
import { PaymentsComponent } from "app/content/my-wallet/payments/payments.component";
import { ChangePwdComponent } from './my-wallet/change-pwd/change-pwd.component';
import { CardManagementComponent } from './my-wallet/card-management/card-management.component';
import { WithdrawalComponent } from './my-wallet/withdrawal/withdrawal.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,HttpModule,ReactiveFormsModule,
    RouterModule.forChild(ContnentRoutes)
  ],
  declarations: [
    ContentComponent, MyGoodsComponent,  PersonalCenterComponent, MyWalletComponent, DeliverGoodsComponent, InvoiceDetailsComponent, OrderDetailsComponent,PaginationComponent, MapComponent, AddressComponent, ReceivaddressComponent, PayComponent, PersonalMessageComponent, OrderDetailsInfoComponent, InvoiceDetailsInfoComponent

    ,BusinessComponent, ConfirmgoodsComponent, TrajectoryMapComponent, OrderQueryComponent,AccountDetailsComponent,TopupComponent,PaymentsComponent, ChangePwdComponent, CardManagementComponent, WithdrawalComponent

  ],
   providers: [MyGoodsService,PersonalCenterService,MyWalletService],
})
export class ContentModule { }
