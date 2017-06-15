import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { user } from './user';
import { ImgWatch } from './imgWatch';
import { RegiterService } from  './Register.service';
//本地缓存
import { LocalStorage } from '../local_storage';
import { ValidateMessage } from  '../fragment/validateMessage';
declare var mui: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegiterService]
})

export class Register implements OnInit{
  public user:user;
  public ValidateMessage;
  public rePwd='';
  public pwd='';
  public imgWatch_img1:ImgWatch;//密码是否可见
  public imgWatch_img2:ImgWatch;//再次输入密码是否可见
  public countdown:number;//timer倒计时
  public yzm:string;//验证码
  public timer;//定时器
  public isClick:boolean;//定时器
  public submitlag:boolean;//表单是否可以提交
  constructor(
    public router: Router,
    public titleService: Title,
    public service : RegiterService,
    public localStorage: LocalStorage
  ) {
    this.user = new user();
    this.ValidateMessage = new ValidateMessage();
    this.imgWatch_img1=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_img2=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.user.platform=3;
  }

  ngOnInit(): void{
    this.titleService.setTitle('绑定手机');
    this.countdown=60;
    this.isClick=true;
    this.submitlag=false;
    this.yzm="获取验证码";
  }

  //用户注册验证码
  captchaReg(){
    if(this.ValidateMessage.validateMobile(this.user.mobile)==1){
    if(this.isClick){
      this.isClick=false;
      this.service.captchaReg(this.user.mobile)
                  .subscribe(
                    data => {
                      if(data.code==0){//未注册
                        this.isClick=true;
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
                          mui.toast("验证码已发送到您的手机</br>请注意查收",{ duration:'short', type:'div' });
                        }else{
                        this.isClick=true;
                          mui.toast(data.msg,{ duration:'short', type:'div' });
                        }
                      }
                    );
    }
    }
  }
  //点击值为空
  ValueNone(info){
    this.user[info]="";
  }
  //密码
  ValueNonePwd(info){
    this[info]="";
  }
  //表单提交
  submitForm() {
    //手机号码
    if(this.ValidateMessage.validateMobile(this.user.mobile)==1){
     //验证码
      if(this.ValidateMessage.validateCaptchaReg(this.user.captcha)==1){
        //密码
        if(this.ValidateMessage.validatePsd(this.pwd)==1){
          //两次密码相等
          if(this.rePwd){
            if(this.pwd===this.rePwd){
              this.user.pwd=this.pwd;
              this.submitlag=true;
              this.service.getRegister(this.user).subscribe(data=>{
                this.submitlag=false;
                if(data.json().code==0){
                  // 写入LocalStorage
                  this.localStorage.setObject("data",data.json().data) ;
                  this.router.navigateByUrl("certification");

                }else{
                  mui.toast(data.json().msg ,{ duration:'short', type:'div' });
                }

              });
            }else{//再次密码不能为空
              mui.toast('两次密码不一致，请确认密码',{ duration:'short', type:'div' });
            }
          }else{
            mui.toast('再次密码不能为空，请输入再次密码',{ duration:'short', type:'div' });

          }
        }
      }

    }

    }

  //点击密码可见
  changeImg_img1(){
    if(this.imgWatch_img1.flag){
      this.imgWatch_img1.ImgType="text";
      this.imgWatch_img1.imgSrc="../assets/images/watch.png";
      this.imgWatch_img1.flag=!this.imgWatch_img1.flag;
    }else{
      this.imgWatch_img1.ImgType="password";
      this.imgWatch_img1.imgSrc="../assets/images/disWactch.png";
      this.imgWatch_img1.flag=!this.imgWatch_img1.flag;
    }
  }
  //点击再次输入密码可见
  changeImg_img2(){
    if(this.imgWatch_img2.flag){
      this.imgWatch_img2.ImgType="text";
      this.imgWatch_img2.imgSrc="../assets/images/watch.png";
      this.imgWatch_img2.flag=!this.imgWatch_img2.flag;
    }else{
      this.imgWatch_img2.ImgType="password";
      this.imgWatch_img2.imgSrc="../assets/images/disWactch.png";
      this.imgWatch_img2.flag=!this.imgWatch_img2.flag;
    }
  }




}
