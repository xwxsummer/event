import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { user } from './user';
import { ImgWatch } from './imgWatch';
import { RegiterService } from  './Register.service';
declare var mui: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegiterService]
})

export class Register implements OnInit{
  public user:user;
  public rePwd='';
  public pwd='';
  public imgWatch_img1:ImgWatch;//密码是否可见
  public imgWatch_img2:ImgWatch;//再次输入密码是否可见
  constructor(
    public router: Router,
    public service : RegiterService

  ) {
    this.user = new user();
    this.imgWatch_img1=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_img2=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.user.platform=3;
  }

  ngOnInit(): void{


  }

  //用户注册验证码
  captchaReg(){
    if(this.user.mobile&&this.user.mobile.length==11){
      this.service.captchaReg(this.user.mobile)
        .subscribe(
          data => {
            console.log(data);
            if(data.code==0){//未注册
                mui.toast("验证码已发送到您的手机</br>请注意查收",{ duration:'short', type:'div' });
              }else{
                mui.toast(data.msg,{ duration:'short', type:'div' });
              }
            }
          );
        }else{
          mui.toast('请填写正确的手机号码',{ duration:'short', type:'div' });
        }

  }


  //表单提交
  submitForm() {
    if(this.pwd===this.rePwd){
      this.user.pwd=this.pwd;
      this.service.getRegister(this.user);
    }else{
      mui.toast('两次密码不一样，请确认密码',{ duration:'short', type:'div' });
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
