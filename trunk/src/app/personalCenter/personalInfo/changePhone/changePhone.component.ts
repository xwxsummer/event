/**
 * by于婷
 *
 * ******/
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
  selector: 'app-changePhone',
  templateUrl: './changePhone.component.html',
  styleUrls: ['./changePhone.component.css']

})

export class ChangePhone implements OnInit{

  public change:change;
  public setting:string;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public service : personalCenterService
  ) {

    this.change=new change();
  }


  ngOnInit(): void{
    this.change.mobile=this.localStorage.getObject("data").mobile;
    this.setting=this.routeInfo.snapshot.queryParams["setting"];//验证码
    console.log(this.change.mobile)
  }
  submitForm() {
        console.log(this.change);
      this.router.navigateByUrl("personalCenter/ChangePhoneTrue?captcha="+this.change.captcha+"&setting="+this.setting);

  }
  //用户验证码  有权限
  changCaptcha(){
      this.service.captcha(this.change.mobile);
  }


}


