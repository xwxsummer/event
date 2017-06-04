import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { Title } from '@angular/platform-browser';
import { personalCenterService } from  '../personalCenter.service';
import { ValidateMessage } from  '../../fragment/validateMessage';

declare var mui: any;

@Component({
  selector: 'app-personalInfo',
  templateUrl: './personalInfo.component.html',
  styleUrls: ['./personalInfo.component.css']
})

export class PersonalInfo implements OnInit{
    public data;
    public isShow:boolean;//层显示
    public message:string;//显示内容
    public ValidateMessage;//照片
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
    this.ValidateMessage=new ValidateMessage();
  }

  ngOnInit(): void{
    this.titleService.setTitle('个人信息');
    this.isShow=false;//层显示
    this.message="";//显示内容
    this.service.personalCenterInfo()
      .subscribe(
        data => {
          if(data.code==0){
            this.data=data.data;
            console.log( this.data);
            if(this.data.name){
            }else{
              this.data.name=this.data.mobile;
            }
            if(this.data.name.length==11){
              this.data.name=this.data.name.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            this.data.mobile=this.data.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
           }
          if(this.data.headImg){
            this.data.headImg=this.ValidateMessage.ValidateMessage+this.data.headImg;
          }else{
            console.log(3333);
          }
      }
    );
  }
  //提示去认证框
  toCertifi(){
    this.isShow=true;
    if(sessionStorage['authed']==0){//判断有没有存anthed
      this.message="尚未认证";//显示内容
    }else if(sessionStorage['authed']==1){
      this.message="认证失败";//显示内容
    }
  }
  //到认证的页面
  goCertifi(){
    this.router.navigateByUrl("certification");
  }
  //修改手机号码
  changePhone(){
    this.router.navigateByUrl("personalCenter/ChangePhone?setting=2");
  }
  //修改头像
  ChangeheadImg(){
    if(this.data.headImg){
      console.log(1111111);
      this.router.navigateByUrl("personalCenter/ChangeheadImg?headImg="+this.data.headImg);
    }else{
      this.data.headImg="../../assets/images/headImg.png";
      this.router.navigateByUrl("personalCenter/ChangeheadImg?headImg="+this.data.headImg);
    }

  }
   //已认证
  FinishCertif(){
    this.router.navigateByUrl("personalCenter/UpdateAuthMessage?certifi=2");
  }

}
