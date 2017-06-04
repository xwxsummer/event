import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']

})

export class Setting implements OnInit{
  public changeMobile:string;
  constructor(
    public router: Router

  ){

  }

  ngOnInit(): void{

  }

//到修改手机号码
  changePhone(){
    this.router.navigateByUrl("personalCenter/ChangePhone?setting=1");
  }
//黑名单
  Blacklist(){
    this.router.navigateByUrl("personalCenter/Blacklist");
  }
  //关于我们
  AboutUs(){
    this.router.navigateByUrl("personalCenter/AboutUs");
  }
  //修改密码
  ChangePassword(){
    this.router.navigateByUrl("personalCenter/ChangePassword");
  }

}
