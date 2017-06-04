import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { ImgWatch } from '../../../register/imgWatch';
//http
import { personalCenterService } from  '../../personalCenter.service';
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

  public oldPwd: string;//旧密码
  public newPwd: string;//新密码
  public reNewPwd: string;//再次输入新密码

  constructor(
    public router: Router,
    public service : personalCenterService
  ){
    this.imgWatch_img1=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_img2=new ImgWatch("password",true,"../assets/images/disWactch.png");
    this.imgWatch_imgRePwd=new ImgWatch("password",true,"../assets/images/disWactch.png");

  }

  ngOnInit(): void{

  }
//到修改手机号码
  submitForm(){
    if(this.newPwd==this.reNewPwd){
      this.service.changPsw({"oldPwd":this.oldPwd,"newPwd":this.newPwd});
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

