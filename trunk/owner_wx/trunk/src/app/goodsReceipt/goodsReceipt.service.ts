/**
 * Created by xia on 2017/4/18.
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
export class goodsReceiptService{
    public local_Storage;
    public userId:string;
      public ajax: Ajax;
    constructor(
        public router: Router,
        public http:Http,
        public localStorage: LocalStorage
    ) {
        this.ajax = new Ajax(this.http);
        this.localStorage =new LocalStorage();
        this.local_Storage=this.localStorage.getObject("data");
    }
   
    public getOrderChildListBySendId(page,pageSize):Observable<any>{
        //http://192.168.1.230:8100/order-service/order/child/getOrderChildListBySendId?page=1&sendId=93&pageSize=5+this.local_Storage.userId
         return this.ajax.myget(Api.getOrderChildListBySendId+"?page="+page+"&sendId="+this.local_Storage.userId+"&pageSize="+pageSize)
            .map((res: Response) => res);
    }
   public getOrderDetailsByChildNo(OrderNo):Observable<any>{
        return this.ajax.myget(Api.getOrderDetailsByChildNo+"?childNo="+OrderNo)
            .map((res: Response) => res);
    }

// getWeixinJsApiSign
    public getWeixinJsApiSign(url):Observable<any>{
         return this.ajax.myget(Api.getWeixinJsApiSign+"?url="+url)
           .map((res:Response)=>res);
    }
}