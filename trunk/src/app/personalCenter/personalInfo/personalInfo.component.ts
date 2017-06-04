import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;
@Component({
  selector: 'app-personalInfo',
  templateUrl: './personalInfo.component.html',
  styleUrls: ['./personalInfo.component.css']
})

export class PersonalInfo implements OnInit{
    public data;
    constructor(
    public router: Router,
    public service : personalCenterService
  ){}
  ngOnInit(): void{
    this.service.personalCenterInfo()
      .subscribe(
        data => {
          if(data.code==0){
            this.data=data.data;
          }
      }
    );

  }

  //提示去认证框
  toCertifi(){
    mui.confirm('','尚未提交认证',['取消','去认证'],function(value){
      if(value.index){
        location.href='http://localhost:4200/certification';
      }else{
        return true
      }
    },'div');
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
    this.router.navigateByUrl("personalCenter/ChangeheadImg");
  }
   //已认证
  FinishCertif(){
    this.router.navigateByUrl("personalCenter/UpdateAuthMessage?certifi=2");
  }





}
