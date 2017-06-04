import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  './personalCenter.service';

declare var mui: any;

@Component({
  selector: 'app-personalCenter',
  templateUrl: './personalCenter.component.html',
  styleUrls: ['./personalCenter.component.css'],
  providers:[ personalCenterService ]


})

export class PersonalCenter implements OnInit{
  public data;//查看用户信息
  constructor(
    public router: Router,
    public service : personalCenterService
  ){
  }
  ngOnInit(): void{
    this.service.personalCenterInfo()
      .subscribe(
        data => {
        if(data.code==0){
          this.data=data.data;
          console.log(this.data);
        }
      }
    );
  }
  //跳到个人信息
  personalInfo(){
    this.router.navigateByUrl("personalCenter/PersonalInfo");
  }
  //跳到业务统计
  yewutongji(){
    this.router.navigateByUrl("personalCenter/Statistics");
  }

  //跳到货物明细
  huwumingxi(){
    this.router.navigateByUrl("personalCenter/Huwumingxi");
  }
  //跳到收货历史
  receiveHistory(){
    this.router.navigateByUrl("personalCenter/ReceiveHistory");
  }

  //跳到我的钱包
  wallet(){
  this.router.navigateByUrl("personalCenter/Wallet");
}
  //明细
  detail(){
    this.router.navigateByUrl("personalCenter/Detail");
  }
  //跳到员工管理
  Management(){
    this.router.navigateByUrl("personalCenter/Management");
  }
  //跳到我的消息
  MyMessage(){
    this.router.navigateByUrl("personalCenter/MyMessage");
  }
  //跳到我的消息
  Setting(){
    this.router.navigateByUrl("personalCenter/Setting");
  }
  //跳到地址管理
  AddressManage(){
    this.router.navigateByUrl("personalCenter/AddressManage");
  }
  //意见反馈
  OptionMind(){
    this.router.navigateByUrl("personalCenter/OptionMind");
  }




}
