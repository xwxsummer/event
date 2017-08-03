import { Component, OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
//本地缓存
import { LocalStorage } from '../../../../local_storage';
//验证
import { ValidateMessage } from '../../../../fragment/validateMessage';
//http
import { personalCenterService } from  '../../../personalCenter.service';
declare var mui: any;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  public ValidateMessage;//验证验证码
  public countdown:number;//timer倒计时
  public yzm:string;//验证码文字
  public timer;//定时器
  public isClick:boolean;//定时器
  public myCaptcha:string;//验证码
  public mobile:string;//电话号码
  public submitlag:boolean;//表单是否可以提交

  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public titleService: Title,
    public service : personalCenterService
  ) {
this.ValidateMessage = new ValidateMessage();
   }

  ngOnInit() {
    this.titleService.setTitle('绑定快捷支付');
    this.countdown=60;
    this.isClick=true;
    this.yzm="获取验证码";
    this.submitlag=false;
    this.mobile=sessionStorage.get('saveDTO')['mobile'];
    this.mobile=this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    console.log(this.mobile);
    this.changCaptcha(true);
  }
  //用户验证码  有权限
  changCaptcha(onlyCountdown:boolean=false){
      if(this.isClick){
          this.isClick=false;
          this.timer=setInterval(() => {
              if (this.countdown == 0) {
                  this.yzm="获取验证码";
                  this.countdown = 60;
                  this.isClick=true;
                  clearInterval(this.timer);
              } else {
                  this.yzm="重新发送(" + this.countdown + ")";
                  this.countdown--;
                  return false;
              }
          }, 1000);
          if(onlyCountdown)return;
          this.service.addbankCard(sessionStorage['saveDTO'])
            .subscribe(data => {
              console.log('个人添加银行卡:',data);
            if (data.code == 0) {//成功
              sessionStorage['serialNumber']=data.data;
              } else {
                mui.toast(data.msg, { duration: 'short', type: 'div' });
              }
            });
      }
  }
  success(){
     this.service.binding(sessionStorage['serialNumber'],this.myCaptcha).subscribe(
       data=>{
         if(data.code==0){
           this.router.navigateByUrl("personalCenter/SuccessmobileComponent");
         }else{
           mui.toast(data.msg)
         }
       }
     );

  }
}
