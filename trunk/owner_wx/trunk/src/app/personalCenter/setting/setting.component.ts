import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']

})

export class Setting implements OnInit{
  public changeMobile:string;
  public isShow:boolean;//层显示
  public message:string;//显示内容
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService

  ){

  }
//验证手机号码
  checkPhone(checking){
    this.service.checkNOMobile()
        .subscribe(
            data => {
          if(data.code==0){
            if(data.data.authed==0){//尚未认证
              this.message="尚未认证，请认证";
              this.isShow=true;
            }else if(data.data.authed==1){//审核失败
              this.message="审核失败，请重新认证";
              this.isShow=true;
            }else if(data.data.authed==2){//审核通过
              this.router.navigateByUrl(checking);
            }else if(data.data.authed==3){//审核中
              console.log(555555);
              mui.toast('审核中，请等待',{ duration:'short', type:'div' });
            }
          }
        }
    );
  }
  ngOnInit(): void{
    this.message="";
    this.titleService.setTitle('设置');
    this.isShow=false;
  }

//到修改手机号码
  changePhone(){
    this.router.navigateByUrl("personalCenter/ChangePhone?setting=1");
  }
//黑名单
  Blacklist(){
    this.checkPhone("personalCenter/Blacklist");
  }
  //关于我们
  AboutUs(){
    this.router.navigateByUrl("personalCenter/AboutUs");
  }
  //修改密码
  ChangePassword(){
    this.router.navigateByUrl("personalCenter/ChangePassword");
  }
  //取消认证
  isCancel(){
    this.isShow=false;
  }
  //去认证
  myShow(){
    this.isShow=false;
    this.router.navigateByUrl("certification");
  }

}
