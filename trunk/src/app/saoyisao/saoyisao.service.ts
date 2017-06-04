import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response,RequestOptions } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api'
import { LocalStorage } from '../local_storage';
import { Md5 } from "ts-md5/dist/md5";

declare var mui: any;

@Injectable()
export class saoyisaoService {
        handleError: any;
    public local_Storage;
    public userId:string;
    public Contact: object;
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public http:Http
    ){
    }

    public getOrderDetailsByChildNo(OrderNo):Observable<any>{
        return this.http.get(Api.getOrderDetailsByChildNo+"?childNo="+OrderNo)
            .map((res: Response) => res.json());
    }

    public updateConfirmLoadByChildNo(myForms):Observable<any>{
        let body = JSON.stringify(myForms);
        console.log(body)
        return this.http.post(Api.updateConfirmLoadByChildNo,myForms);
      
    }

  
// http://139.129.194.245:8101/order-serviceorder/child/updateConfirmLoadByChildNo

}
