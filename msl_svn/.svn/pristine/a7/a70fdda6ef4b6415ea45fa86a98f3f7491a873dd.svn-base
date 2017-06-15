/**
 * Created by 123 on 2017/4/18.
 */
import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api';
import { LocalStorage } from '../local_storage';
import { Ajax } from '../ajax';
declare var mui: any;
@Injectable()
export class marketService{
    public local_Storage;
    public userId:string;
    public ajax: Ajax;
    constructor(
        public router: Router,
        public http:Http,
        public localStorage: LocalStorage

    ){
        this.ajax = new Ajax(this.http);
    }

    public getOrderInfoLocationList(coordinate,publishTime?,page?,pageSize?,receiveCity?,receiveCounty?,receiveProvince?,receiveTown?,sendCity?,sendCounty?,sendProvince?,sendTown?):Promise<any>{
    // return new Promise((resolve,reject)=>{resolve(this.rtn)})

    let args = {
        "coordinate": coordinate,
        "publishTime": publishTime,
        "statusParam":101,
        "page": page,
        "pageSize": 10,
        "receiveCity": receiveProvince,
        "receiveCounty": receiveCounty,
        "receiveProvince": receiveCity,
        "receiveTown": receiveTown,
        "sendCity":sendProvince ,
        "sendCounty": sendCounty,
        "sendProvince": sendCity,
        "sendTown": sendTown,
    };
        let params = {};
        for(let key in args){
            if( typeof args[key] ==='number'
                || ['', undefined, '请选择'].indexOf(args[key])<0
                && args[key].length >0 )//过滤无效值
                params[key]=args[key];
        }
    console.log(params);
    return this.ajax.myPost(Api.getOrderInfoLocationList,params).toPromise()
    }

//验证手机号
    public checkMobile():Observable<any>{
        return this.ajax.myget(Api.checkMobile+'?mobile='+this.localStorage.getObject("data").mobile);
    }
    // getWeixinJsApiSign
    public getWeixinJsApiSign(url):Observable<any>{
        return this.ajax.myget(Api.getWeixinJsApiSign+"?url="+url)
            .map((res:Response)=>res);
    }
}
