import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api'
//���ػ���
import { LocalStorage } from '../local_storage';
//md5 ����
import { Md5 } from "ts-md5/dist/md5";
declare var mui: any;
@Injectable()
export class myGoodsService{
    public local_Storage;
    public userId:string;//�û�id :string
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public http:Http
    ){
    }

    //��ѯ��Դ�б�
    public getOrderInfo(page):Observable<any>{
        //this.userId=this.localStorage.getObject("data").userId;
        //let params = new URLSearchParams();
        //params.set("userId",this.userId);
        return this.http.get(Api.getOrderInfoListByUserId+"?page="+page+"&userId=5486&pageSize=5")
            .map((res: Response) => res.json());
    }

    //���ݶ�����Ų�ѯ
    public getOrderInfoByOrderNo(OrderNo):Observable<any>{
        //this.userId=this.localStorage.getObject("data").userId;
        //let params = new URLSearchParams();
        //params.set("userId",this.userId);
        return this.http.get(Api.getOrderInfoByOrderNo+"?orderNo="+OrderNo)
            .map((res: Response) => res.json());
    }
    //���ݶ�����Ų�ѯ myGoods/Order
    public getOrderChildListByParam(OrderNo):Observable<any>{
        //this.userId=this.localStorage.getObject("data").userId;
        //let params = new URLSearchParams();
        //params.set("orderNo",OrderNo);
        let orderChildTermDTO={orderNo:OrderNo};
        return this.http.post(Api.getOrderChildListByParam,orderChildTermDTO)
            .map((res: Response) => res.json());
    }


}
