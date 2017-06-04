import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonalCenterRoutes } from './personalCenter.routes';
//个人信息
import { PersonalInfo } from './personalInfo/personalInfo.component';
import { ChangePhone } from './personalInfo/changePhone/changePhone.component';
import { ChangePhoneTrue } from './personalInfo/changePhoneTrue/changePhoneTrue.component';
import { ChangeheadImg } from './personalInfo/changeImgHead/changeheadImg.component';
import { UpdateAuthMessage } from './personalInfo/updateAuthMessage/updateAuthMessage.component';
//业务统计
import { Statistics } from './statistics/statistics.component';
import { DeliverNumbers } from './statistics/deliverNumbers/deliverNumbers.component';
import { Jiedanshu } from './statistics/jiedanshu/jiedanshu.component';
import { GoodsNum } from './statistics/goodsNum/goodsNum.component';

//import { Ng2Echarts }from 'ng2-echarts';
//货物明细
import { Huwumingxi } from './huwumingxi/huwumingxi.component';

//我的钱包
import { Wallet } from './wallet/wallet.component';
//充值
import { Recharge } from './wallet/recharge/recharge.component';
//明细
import { Detail } from './wallet/recharge/detail/detail.conponent';
//银行卡
import { Bank } from './wallet/recharge/detail/bank/bank.component';
//收货历史
import { ReceiveHistory } from './receiveHistory/receiveHistory.component';
//员工管理
import { Management } from './management/management.component';
import { AddEmployees } from './management/addEmployees/addEmployees.component';
import { EmployeInfo } from './management/employeInfo/employeInfo.component';
import { AddSuccess } from './management/addSuccess/addSuccess.component';
//我的消息
import { MyMessage } from './myMessage/myMessage.component';
import { SystemInfo } from './myMessage/systemInfo/systemInfo.component';
import { HuodanInfo } from './myMessage/huodanInfo/huodanInfo.component';
//详情
import { DetailChild} from './wallet/recharge/detail/bank/detail.child';
import { SuccessChild} from './wallet/recharge/detail/bank/success.child';
import { Withdrawals} from './wallet/recharge/withdrawals.component';
//设置/wallet/recharge/withdrawals.component.ts!
import { Setting} from './setting/setting.component';
import { Blacklist} from './setting/blacklist/blacklist.component';
import { AboutUs} from './setting/aboutUs/aboutUs.component';
import { ChangePassword } from './setting/changepassword/changepassword.component';
//地址管理
import { AddressManage } from './addressManage/addressManage.component';
import { ManageReceive } from './addressManage/manageReceive/manageReceive.component';
import { AddAddress } from './addressManage/addAddress/addAddress.component';
import { EditReceive } from './addressManage/editReceive/editReceive.component';
import { AddContact } from './addressManage/addContact/addContact.component';
import { WatchContact } from './addressManage/watchContact/watchContact.component';

import { Driverdetails} from './setting/blacklist/driverdetails/driverdetails.component';
import { See } from './setting/blacklist/driverdetails/see/see.component';
import { Mybank } from './wallet/mybank/mybank.component';
import { Mondify } from './wallet/modify/modify.component';
//提现

import { showCeng } from '../fragment/showCeng';//显示层
//http服务
import { personalCenterService } from  './personalCenter.service';
//意见反馈
import { OptionMind } from './optionMind/optionMind.component';
import { WacthOptionMind } from './wacthOptionMind/wacthOptionMind.component';

@NgModule({
  imports: [
    RouterModule.forChild(PersonalCenterRoutes),CommonModule,FormsModule
  ],
  exports: [],
  declarations: [

    PersonalInfo,ChangePhone,ChangePhoneTrue,Statistics,ChangeheadImg,UpdateAuthMessage,
    DeliverNumbers,Jiedanshu,GoodsNum,Huwumingxi,Wallet,Recharge,
    ReceiveHistory,Management,AddEmployees,EmployeInfo,AddSuccess,MyMessage,
    Detail,Bank,DetailChild,SuccessChild,ManageReceive,AddAddress,EditReceive,Driverdetails,
    See,Withdrawals,AddContact,WatchContact,OptionMind,WacthOptionMind,
    SystemInfo,HuodanInfo,Setting,Blacklist,AboutUs,ChangePassword,AddressManage,showCeng,
    Mybank,Mondify

  ],
  providers: [ personalCenterService ],
})
export class PersonalCenterModule { }