/**
 * by于婷
 *
 * ******/
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//本地缓存
import { LocalStorage } from '../../../local_storage';
//修改手机号码
import { Title } from '@angular/platform-browser';
import { change } from '../fragment/personalInfo';
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';
//http
import { personalCenterService } from  '../../personalCenter.service';

declare var mui: any;
@Component({
  selector: 'app-changePhone',
  templateUrl: './changePhone.component.html',
  styleUrls: ['./changePhone.component.css']

})

export class ChangePhone implements OnInit{
  public change:change;
  public ValidateMessage;//验证验证码
  public setting:string;
  public countdown:number;//timer倒计时
  public yzm:string;//验证码
  public timer;//定时器
  public isClick:boolean;//定时器
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public titleService: Title,
    public service : personalCenterService
  ) {
    this.change=new change();
    this.ValidateMessage = new ValidateMessage();
  }


  ngOnInit(): void{
    this.titleService.setTitle('修改手机号');
    this.countdown=60;
    this.isClick=true;
    this.yzm="获取验证码";
    this.change.mobile=this.localStorage.getObject("data").mobile;
    this.change.mobile=this.change.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    this.setting=this.routeInfo.snapshot.queryParams["setting"];//验证码

  }
  submitForm() {
    //验证码
    if(this.ValidateMessage.validateCaptchaReg(this.change.captcha)==1){

      this.router.navigateByUrl("personalCenter/ChangePhoneTrue?captcha="+this.change.captcha+"&setting="+this.setting);
    }

  }
  //用户验证码  有权限
  changCaptcha(){
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
      this.service.captcha(this.localStorage.getObject("data").mobile);
  }
  }
}


