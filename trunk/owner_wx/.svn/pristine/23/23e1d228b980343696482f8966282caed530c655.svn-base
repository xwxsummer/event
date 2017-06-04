import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api'
import { Ajax } from '../ajax';
//本地缓存
import { LocalStorage } from '../local_storage';
//md5 加密
import { Md5 } from "ts-md5/dist/md5";
declare var mui: any;
@Injectable()
export class myGoodsService{
    public local_Storage;
    public userId:string;//用户id :string
    public ajax: Ajax;
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public http:Http
    ){
        this.ajax = new Ajax(this.http);
    }
    //查询货源列表
    public getOrderInfo(page):Observable<any>{
        return this.ajax.myget(Api.getOrderInfoListByUserId+"?page="+page+"&userId="+this.localStorage.getObject("data").userId+"&pageSize=10"+"");

    }
    //根据订单编号查询
    public getOrderInfoByOrderNo(OrderNo):Observable<any>{
        return this.ajax.myget(Api.getOrderInfoByOrderNo+"?orderNo="+OrderNo);
    }
    //根据订单编号查询 myGoods/Order
    public getOrderChildListByParam(OrderNo):Observable<any>{
        let orderChildTermDTO={orderNo:OrderNo,childStatus:107};
        return this.ajax.myPost(Api.getOrderChildListByParam,orderChildTermDTO);
    }
    //根据订单编号查询 myGoods/Order
    public getOrderChildListByParamFlag(orderNo,flag):Observable<any>{
        let orderChildTermDTO={childStatus:107,flag:flag,orderNo:orderNo};
        return this.ajax.myPost(Api.getOrderChildListByParam,orderChildTermDTO);
    }
    //根据主单编号取消主单剩余货源this.localStorage.getObject("data").userId
    public cancelInfoByMainOrder(OrderNo,cancelReason):Observable<any>{
        return this.ajax.myPut(Api.cancelInfoByMainOrder+OrderNo+"?userId="+this.localStorage.getObject("data").userId+"&cancelReason="+cancelReason,null);
    }
    //《货主端》根据主单编号获取取消全部货单赔偿金
    public compensationInfoByMainOrder(OrderNo):Observable<any>{
        return this.ajax.myget(Api.compensationInfoByMainOrder+OrderNo);
    }
    //《货主端》根据子单编号获取取消子订单的赔偿金GET
    public compensationOwnerCancel(childNo):Observable<any>{
        return this.ajax.myget(Api.compensationOwnerCancel+childNo);
    }

    //《《货主端》根据子单编号取消子订单, 返回赔偿金额
    public orderChildOwnerCancel(childNo,cancelReason):Observable<any>{
        let params = new URLSearchParams();
        params.set("userId",this.localStorage.getObject("data").userId);
        params.set("cancelReason",cancelReason);
        return this.ajax.myPut(Api.orderChildOwnerCancel+childNo,params);
    }
    //《《货主端》根据主单编号分组取消未装车订单及剩余货单
    public fenzuCancelorderChildOwner(childNo,timeIntervalList):Observable<any>{
        return this.ajax.myPut(Api.fenzuCancelorderChildOwner+childNo+"?userId="+this.localStorage.getObject("data").userId,timeIntervalList);
    }


}
