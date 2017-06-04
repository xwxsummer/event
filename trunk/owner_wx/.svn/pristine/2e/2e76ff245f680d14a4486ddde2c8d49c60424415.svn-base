import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//本地缓存
import { Title } from '@angular/platform-browser';
import { LocalStorage } from '../../../local_storage';
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';
//修改手机号码
import { change } from '../fragment/personalInfo';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;
@Component({
  selector: 'app-changePhoneTrue',
  templateUrl: './changePhoneTrue.component.html',
  styleUrls: ['./changePhoneTrue.component.css']

})

export class ChangePhoneTrue implements OnInit{
  public ValidateMessage;//验证验证码
  public change:change;
  public setting:string;//跳转到个人信息页面，还是设置修改密码页面
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,
    public titleService: Title,
    public localStorage: LocalStorage,
    public service : personalCenterService
  ) {
    this.change=new change();
    this.ValidateMessage = new ValidateMessage();
  }

  ngOnInit(): void{
    this.titleService.setTitle('修改手机号');
    this.change.captcha=this.routeInfo.snapshot.queryParams["captcha"];//验证码
    this.setting=this.routeInfo.snapshot.queryParams["setting"];//验证码
    this.change.mobile=this.localStorage.getObject("data").mobile;//手机号码
    this.change.userId=this.localStorage.getObject("data").userId;//userId
  }

  //用户验证码  有权限
  changCaptcha(){
    //验证手机号码
    if(this.ValidateMessage.validateMobile(this.change.newMobile)==1){
      this.service.captcha(this.change.newMobile);
    }
  }
  submitForm() {
    if(this.change.mobile==this.change.newMobile){
      mui.toast('两次手机号码一样，请重新输入手机号',{ duration:'short', type:'div' });
    }else{
      //验证新手机号码
      if(this.ValidateMessage.validateMobile(this.change.newMobile)==1){
        //验证码
        if(this.ValidateMessage.validateCaptchaReg(this.change.newCaptcha)==1){
          this.service.changMobileTrue(this.change,this.setting);
        }
      }
    }


  }



}
