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
import { Ajax } from '../ajax';

@Injectable()
export class RegiterService{
   public userId;//
   public ajax: Ajax;
    constructor(
      public router: Router,
      public localStorage: LocalStorage,
      public http:Http
    ){
      this.ajax = new Ajax(this.http);
    }


  //用户注册
  public getRegister(user):Observable<any>{
    user.pwd=Md5.hashStr(user.pwd).toString();//加密
    user.openid=this.localStorage.getObject("data").openid ;//openid
    return this.http.post(Api.register,user);

  }

  //企业认证
  public conpanyCertifi(authInfoDTO):Observable<any>{
    authInfoDTO.userId=this.localStorage.getObject("data").userId ;
    return this.ajax.myPost(Api.submitAuth,authInfoDTO);
  }

  //用户注册验证码
  public captchaReg(mobile):Observable<any>{
    let params = new URLSearchParams();
    params.set("mobile",mobile);
    return this.http.post(Api.captchaReg,params)
      .map((res: Response) => res.json());
  }
  //上传图片
  public upBase64Image(base64FileList:string):Promise<any>{
    let type:string = 'order';
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(Api.base64Image,
        //JSON.stringify({base64FileList,type}),
        `base64FileList=${encodeURIComponent(base64FileList)}&type=${type}`,
        {headers : headers}
    ).toPromise();
  }

}