import { RouterModule } from '@angular/router';
//个人信息
import { PersonalInfo } from './personalInfo/personalInfo.component';
import { ChangePhone } from './personalInfo/changePhone/changePhone.component';
import { ChangePhoneTrue } from './personalInfo/changePhoneTrue/changePhoneTrue.component';
import { ChangeheadImg } from './personalInfo/changeImgHead/changeheadImg.component';
import { UpdateAuthMessage } from './personalInfo/updateAuthMessage/updateAuthMessage.component';
import { Statistics } from './statistics/statistics.component';
import { DeliverNumbers } from './statistics/deliverNumbers/deliverNumbers.component';
import { Jiedanshu } from './statistics/jiedanshu/jiedanshu.component';
import { GoodsNum } from './statistics/goodsNum/goodsNum.component';
import { Huowumingxi } from './huowumingxi/huowumingxi.component';
import { Wallet } from './wallet/wallet.component';
import { Recharge } from './wallet/recharge/recharge.component';
import { Detail } from './wallet/recharge/detail/detail.conponent';
import { ReceiveHistory } from './receiveHistory/receiveHistory.component';
import { Management } from './management/management.component';
import { AddEmployees } from './management/addEmployees/addEmployees.component';
import { EmployeInfo } from './management/employeInfo/employeInfo.component';
import { AddSuccess } from './management/addSuccess/addSuccess.component';
import { MyMessage } from './myMessage/myMessage.component';
import { Bank } from './wallet/recharge/detail/bank/bank.component';
//忘记秘密
import { FogetPsd } from './wallet/fogetPsd/fogetPsd.component';
import { BankCard } from './wallet/bankCard/bankCard.component';
import { DetailChild} from './wallet/recharge/detail/bank/detail.child';
import { SuccessChild} from './wallet/recharge/detail/bank/success.child';
//我的消息 系统消息
import { SystemInfo } from './myMessage/systemInfo/systemInfo.component';
import { HuodanInfo } from './myMessage/huodanInfo/huodanInfo.component';
//设置
import { Setting } from './setting/setting.component';
import { Blacklist} from './setting/blacklist/blacklist.component';
import { AboutUs} from './setting/aboutUs/aboutUs.component';
import { ChangePassword } from './setting/changepassword/changepassword.component';
//地址管理
import { AddressManage } from './addressManage/addressManage.component';
import { ManageReceive } from './addressManage/manageReceive/manageReceive.component';
import { AddAddress } from './addressManage/addAddress/addAddress.component';
import { EditReceive } from './addressManage/editReceive/editReceive.component';
//意见反馈
import { OptionMind } from './optionMind/optionMind.component';
import { WacthOptionMind } from './wacthOptionMind/wacthOptionMind.component';

import { Driverdetails} from './setting/blacklist/driverdetails/driverdetails.component';
import { See } from './setting/blacklist/driverdetails/see/see.component';
import { Mybank } from './wallet/mybank/mybank.component';
import { Mondify } from './wallet/modify/modify.component';
import { SetPwdComponent } from './wallet/set-pwd/set-pwd.component';
import { DepositComponent } from './wallet/deposit/deposit.component';
import { NoteComponent } from './wallet/deposit/note/note.component';
import { SuccessComponent } from './wallet/deposit/note/success/success.component';
import { MobileComponent } from './wallet/mybank/mobile/mobile.component';
import { SuccessmobileComponent } from './wallet/mybank/mobile/successmobile/successmobile.component';
export const PersonalCenterRoutes=[

  {
    path:'PersonalInfo',
    component:PersonalInfo
  },
  {
    path:'MobileComponent',
    component:MobileComponent
  },
  {
    path:'SuccessmobileComponent',
    component:SuccessmobileComponent
  },
  {
    path:'NoteComponent',
    component:NoteComponent
  },
  {
    path:'SuccessComponent',
    component:SuccessComponent
  },
  {
    path:'DepositComponent',
    component:DepositComponent
  },
  {
    path:'ChangeheadImg',
    component:ChangeheadImg
  },
  {
    path:'UpdateAuthMessage',
    component:UpdateAuthMessage
  },
  {
    path:'ChangePhone',
    component:ChangePhone
  },
   {
    path:'ChangePhoneTrue',
    component:ChangePhoneTrue
  },
   {
    path:'Statistics',
    component:Statistics
  }
   ,{
    path:'DeliverNumbers',
    component:DeliverNumbers
  }
   ,{
    path:'Jiedanshu',
    component:Jiedanshu
  }
   ,{
    path:'GoodsNum',
    component:GoodsNum
  }
   ,{
    path:'Huowumingxi',
    component:Huowumingxi
  }
   ,{
    path:'ReceiveHistory',
    component:ReceiveHistory
  }
    ,{
        path:'Wallet',
        component:Wallet
    },{
        path:'BankCard',
        component:BankCard
    }
    ,{
        path:'Recharge',
        component:Recharge
    }
    ,{
        path:'Detail',
        component:Detail
    }
    ,{
        path:'Management',
        component:Management
    }
    ,{
        path:'AddEmployees',
        component:AddEmployees
    }
    ,{
        path:'EmployeInfo',
        component:EmployeInfo
    }
    ,{
        path:'AddSuccess',
        component:AddSuccess
    }
    ,{
        path:'MyMessage',
        component:MyMessage
    }
    ,{
        path:'Bank',
        component:Bank
    }
    ,{
        path:'DetailChild',
        component:DetailChild
    }
    ,{
        path:'SuccessChild',
        component:SuccessChild
    }
    ,{
        path:'SystemInfo',
        component:SystemInfo
    }
    ,{
        path:'HuodanInfo',
        component:HuodanInfo
    }
    ,{
        path:'Setting',
        component:Setting
    }
    ,{
        path:'Blacklist',
        component:Blacklist
    },
    {
        path:'AboutUs',
        component:AboutUs
    },
    {
        path:'ChangePassword',
        component:ChangePassword
    },
    {
        path:'AddressManage',
        component:AddressManage
    },
    {
        path:'ManageReceive',
        component:ManageReceive
    },
    {
        path:'AddAddress',
        component:AddAddress
    },
    {
        path:'EditReceive',
        component:EditReceive
    },
    {
        path:'OptionMind',
        component:OptionMind
    },
    {
        path:'WacthOptionMind',
        component:WacthOptionMind
    },
    {
    path:'Driverdetails',
    component:Driverdetails
    },
    {
        path:'See',
        component:See
    }
    ,
    {
        path:'Mybank',
        component:Mybank
    },
    {
        path:'FogetPsd',
        component:FogetPsd
    },
    {
        path:'Mondify',
        component:Mondify
    },
    {
        path:'SetPwd',
        component:SetPwdComponent

    }
];
