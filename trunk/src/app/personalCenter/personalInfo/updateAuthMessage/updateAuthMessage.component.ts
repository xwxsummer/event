/**
 * by于婷
 *
 * ******/

import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { authInfoDTO } from '../../../register/certification/fragment/authInfoDTO';//注册 认证
//http
import { personalCenterService } from  '../../personalCenter.service';

declare var mui: any;

@Component({
  selector: 'app-updateAuthMessage',
  templateUrl: '../../../register/certification/companyCertification.component.html',
  styleUrls: ['../../../register/certification/companyCertification.component.css'],
  providers:[ personalCenterService ]


})

export class UpdateAuthMessage implements OnInit{
  public certifi:string;//判断从哪个界面跳过来
  public authInfoDTO;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.authInfoDTO = new authInfoDTO();
  }

  ngOnInit(): void{
    this.certifi=this.routeInfo.snapshot.queryParams["certifi"];
    //this.certifi==1 认证    this.certifi==2 个人信息
    if(this.certifi=="2"){//this.certifi==1 个人信息
      this.service.getAuthMessage()
        .subscribe(
          data => {
          if(data.code==0){   //请求成功
            this.authInfoDTO=data.data;
            console.log(this.authInfoDTO);
          }
        }
      );
    }

  }

  submitForm():void {
    //跳到审核页面
    this.service.updateAuthMessage(this.authInfoDTO);

  }



}
