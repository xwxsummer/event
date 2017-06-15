/**
 * Created by CLX on 2017/6/13.
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
//本地缓存
import { LocalStorage } from '../../../local_storage';
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;
@Component({
    selector: 'app-fogetPsd',
    template : `
    <form (ngSubmit)="submitForm()" #Form="ngForm" name="submitForm" role="form">
      <div class="changePhone fonNormal col_333 b-b">请输入{{mobile}}收到的验证码</div>

      <div class="posi_relative b-b">
        <input class="input_org" type="tel" name="captcha" placeholder="请输入验证码" required [(ngModel)]="myCaptcha" #captcha="ngModel" maxlength="4"/>
        <div class="posi_abslotu ea5529 posi_right transformY50 fonSml" (click)="changCaptcha()"><span class="clo_ccc m-r16">|</span>{{yzm}}</div>
      </div>
      <div class="m0_auto" style="width: 80%;">
        <input type="submit" class="bindFinish text_center fff fonSml fon900 height_3" id="submit" value="下一步" [disabled]="submitlag"/>
      </div>
    </form>
 `,
    styles: [`select, textarea, input[type='text'], input[type='search'], input[type='password'], input[type='datetime'], input[type='datetime-local'], input[type='date'], input[type='month'], input[type='time'], input[type='week'], input[type='number'], input[type='email'], input[type='url'], input[type='tel'], input[type='color'] {
        line-height: 2.5rem;
        width: 100%;
        height: 2.5rem;
        margin-bottom: 0px;
        padding: 0;
        -webkit-user-select: text;
        border:none;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 5px;
        padding-left: 1.7rem;
        font-size: 15px;
        box-sizing: border-box;
        }

        input[type='submit'], .mui-btn-primary, .mui-btn-blue {
            color: #fff;
            border: none;
        }
        .changePhone{
            height: 2.5rem;
            padding-left: 1.7rem;
            line-height: 2.5rem;
        }
        input[type='button'], input[type='submit'], input[type='reset'], button, .mui-btn{
            border-radius: 10px;
        }
`]
})

export class FogetPsd implements OnInit{
    public ValidateMessage;//验证验证码
    public countdown:number;//timer倒计时
    public yzm:string;//验证码文字
    public timer;//定时器
    public isClick:boolean;//定时器
    public myCaptcha:boolean;//验证码
    public mobile:string;//电话号码
    public submitlag:boolean;//表单是否可以提交
    constructor(
        public router: Router,
        public routeInfo:ActivatedRoute,//页面间传值
        public localStorage: LocalStorage,
        public titleService: Title,
        public service : personalCenterService
    ){
        this.ValidateMessage = new ValidateMessage();

    }
    ngOnInit(): void{
        this.titleService.setTitle('找回交易密码');
        this.countdown=60;
        this.isClick=true;
        this.yzm="获取验证码";
        this.submitlag=false;
        this.mobile=this.localStorage.getObject("data").mobile;
        this.mobile=this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

    }
    submitForm() {
        //验证码walletCheckMobile
        //if(this.ValidateMessage.validateCaptchaReg(this.myCaptcha)==1){
           // this.submitlag=true;
            //this.service.walletCheckMobile(localStorage['walletCode'],this.myCaptcha)
            //    .subscribe(
            //        data => {
            //            this.submitlag=true;
            //        if(data.code==0){
            //            //this.router.navigateByUrl("personalCenter/ChangePhoneTrue?captcha="+this.change.captcha+"&setting="+this.setting);
            //        }else{
            //            mui.toast(data.msg,{ duration:'short', type:'div' });
            //
            //        }
            //    }
            //);
            //
      //  }
        this.router.navigateByUrl("personalCenter/BankCard");

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
