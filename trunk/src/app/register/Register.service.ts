import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx'
import {Md5} from "ts-md5/dist/md5";//md5 加密
//本地缓存
import { LocalStorage } from '../local_storage';
import { Api } from '../api'
declare var mui: any;

@Injectable()
export class RegiterService{
   public userId;//
    constructor(
      public router: Router,
      public localStorage: LocalStorage,
      public http:Http
    ){

    }
//Observable<ResultCode>
  //用户注册
  public getRegister(user):void{
    user.pwd=Md5.hashStr(user.pwd).toString();//加密
    this.http.post(Api.register,user)
      .subscribe(data=>{
        if(data.json().code==0){
          // 写入LocalStorage
          this.localStorage.setObject("data",data.json().data) ;
          this.router.navigateByUrl("certification");

        }else{
          mui.toast(data.json().msg ,{ duration:'short', type:'div' });
        }

      });
  }

  //企业认证
  public conpanyCertifi(authInfoDTO):void{
    authInfoDTO.userId=this.localStorage.getObject("data").userId ;
    console.log(authInfoDTO);
    this.http.post(Api.submitAuth,authInfoDTO)
      .subscribe(data=>{
        if(data.json().code==0){
          this.router.navigateByUrl("certification/checking?checking=1");//跳到审核界面
        }else{
          mui.toast(data.json().msg ,{ duration:'short', type:'div' });
        }

      });
  }

  //用户注册验证码
  public captchaReg(mobile):Observable<any>{
    let params = new URLSearchParams();
    params.set("mobile",mobile);
    return this.http.post(Api.captchaReg,params)
      .map((res: Response) => res.json());
  }

}
