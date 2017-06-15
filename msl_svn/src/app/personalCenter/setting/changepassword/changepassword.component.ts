import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { ImgWatch } from '../../../register/imgWatch';
//http
import { personalCenterService } from  '../../personalCenter.service';
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';
declare var mui: any;
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']

})

export class ChangePassword implements OnInit{
  public  imgWatch_img1:ImgWatch;//旧密码
  public  imgWatch_img2:ImgWatch;//新密码
  public  imgWatch_imgRePwd:ImgWatch;//再次输入密码
  public ValidateMessage;//验证验证码
  public oldPwd: string;//旧密码
  public newPwd: string;//再次输入新密码
  public reNewPwd: string;//新密码
  public submitlag: boolean;//按钮是否可点

  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
    this.imgWatch_img1=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_img2=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_imgRePwd=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.ValidateMessage = new ValidateMessage();
  }

  ngOnInit(): void{
    this.submitlag=false;
    this.titleService.setTitle('修改登录密码');
      this.newPwd="";
  }
  //点击值为空
  ValueNone(info){
    this[info]="";
  }
  //到修改密码
  submitForm(){
    if(this.ValidateMessage.validatePsd(this.oldPwd)==1){
      if(this.ValidateMessage.validatePsd(this.reNewPwd)==1){
        if(this.ValidateMessage.validatePsd(this.newPwd)==1){
          if(this.newPwd==this.reNewPwd){
            if(this.newPwd!=this.oldPwd){
              this.submitlag=true;
              this.service.changPsw({"oldPwd":this.oldPwd,"newPwd":this.newPwd})
                  .subscribe(data=>{
                    this.submitlag=false;
                    if(data.code==0){
                      this.router.navigateByUrl("personalCenter/Setting");
                      mui.toast('修改成功',{ duration:'short', type:'div' });
                    }else{
                      mui.toast(data.msg,{ duration:'short', type:'div' });
                    }
                  });
            }else{
              mui.toast('新旧密码相同，请重新输入',{ duration:'short', type:'div' });
            }
          }else{
            mui.toast('两次密码不一致，请确认新密码',{ duration:'short', type:'div' });
          }
        }
      }
    }
  }
//点击旧密码可见
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
  //点击新密码可见
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
  //再次输入密码
  changeImg_RePwd(){
    if(this.imgWatch_imgRePwd.flag){
      this.imgWatch_imgRePwd.ImgType="text";
      this.imgWatch_imgRePwd.imgSrc="../assets/images/watch.png";
      this.imgWatch_imgRePwd.flag=!this.imgWatch_imgRePwd.flag;
    }else{
      this.imgWatch_imgRePwd.ImgType="password";
      this.imgWatch_imgRePwd.imgSrc="../assets/images/disWactch.png";
      this.imgWatch_imgRePwd.flag=!this.imgWatch_imgRePwd.flag;
    }
  }

}

