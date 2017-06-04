import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//本地缓存
import { LocalStorage } from '../../../local_storage';

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

  public change:change;
  public setting:string;//跳转到个人信息页面，还是设置修改密码页面
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,
    public localStorage: LocalStorage,
    public service : personalCenterService
  ) {
    this.change=new change();
  }

  ngOnInit(): void{
    this.change.captcha=this.routeInfo.snapshot.queryParams["captcha"];//验证码
    this.setting=this.routeInfo.snapshot.queryParams["setting"];//验证码
    this.change.mobile=this.localStorage.getObject("data").mobile;//手机号码
    this.change.userId=this.localStorage.getObject("data").userId;//userId
  }

  //用户验证码  有权限
  changCaptcha(){
    if(this.change.newMobile&&this.change.newMobile.length==11){
      this.service.captcha(this.change.newMobile);
    }else{
      mui.toast('请填写正确的手机号码',{ duration:'short', type:'div' });
    }
  }
  submitForm() {
    if(this.change.mobile==this.change.newMobile){
      mui.toast('两次手机号码一样，请重新输入手机号',{ duration:'short', type:'div' });
      console.log("aaa");
    }else{
      this.service.changMobileTrue(this.change,this.setting);
    }

  }



}
