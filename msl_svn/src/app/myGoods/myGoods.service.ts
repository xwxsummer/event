import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import  'rxjs/Rx';
import { Api } from '../api'
import { Ajax } from '../ajax';
//���ػ���
import { LocalStorage } from '../local_storage';
//md5 ����
import { Md5 } from "ts-md5/dist/md5";
declare var mui: any;
@Injectable()
export class myGoodsService{
    public local_Storage;
    public userId:string;//�û�id :string
    public ajax: Ajax;
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public http:Http
    ){
        this.ajax = new Ajax(this.http);
    }
    //��ѯ��Դ�б�
    public getOrderInfo(page):Observable<any>{
        return this.ajax.myget(Api.getOrderInfoListByUserId+"?page="+page+"&userId="+this.localStorage.getObject("data").userId+"&pageSize=10"+"");

    }
    //���ݶ�����Ų�ѯ
    public getOrderInfoByOrderNo(OrderNo):Observable<any>{
        return this.ajax.myget(Api.getOrderInfoByOrderNo+"?orderNo="+OrderNo);
    }
    //���ݶ�����Ų�ѯ myGoods/Order
    public getOrderChildListByParam(OrderNo,page):Observable<any>{
        let orderChildTermDTO={orderNo:OrderNo,childStatus:107,page:page};
        return this.ajax.myPost(Api.getOrderChildListByParam,orderChildTermDTO);
    }
    //���ݶ�����Ų�ѯ myGoods/Order
    public getOrderChildListByParamFlag(orderNo,flag):Observable<any>{
        let orderChildTermDTO={childStatus:107,flag:flag,orderNo:orderNo};
        return this.ajax.myPost(Api.getOrderChildListByParam,orderChildTermDTO);
    }
    //�����������ȡ������ʣ���Դthis.localStorage.getObject("data").userId
    public cancelInfoByMainOrder(OrderNo,cancelReason):Observable<any>{
        return this.ajax.myPut(Api.cancelInfoByMainOrder+OrderNo+"?userId="+this.localStorage.getObject("data").userId+"&cancelReason="+cancelReason,null);
    }
    //�������ˡ�����������Ż�ȡȡ��ȫ�������⳥��
    public compensationInfoByMainOrder(OrderNo):Observable<any>{
        return this.ajax.myget(Api.compensationInfoByMainOrder+OrderNo);
    }
    //销煤取消
    public compensation(OrderNo):Observable<any>{
        return this.ajax.myget(Api.compensation1+OrderNo);
    }
    //�������ˡ������ӵ���Ż�ȡȡ���Ӷ������⳥��GET
    public compensationOwnerCancel(childNo):Observable<any>{
        return this.ajax.myget(Api.compensationOwnerCancel+childNo);
    }
    //ȡ��ԭ��
    public getSystemLabelByType(type):Observable<any>{
        return this.ajax.myget(Api.getSystemLabelByType+"?type="+type);
    }
    //���������ˡ������ӵ����ȡ���Ӷ���, �����⳥���
    public orderChildOwnerCancel(childNo,cancelReason):Observable<any>{
        let params = new URLSearchParams();
        params.set("userId",this.localStorage.getObject("data").userId);
        params.set("cancelReason",cancelReason);
        return this.ajax.myPut(Api.orderChildOwnerCancel+childNo,params);
    }
    //销煤取消
    public ownerCancel(childNo,cancelReason):Observable<any>{
        let params = new URLSearchParams();
        params.set("userId",this.localStorage.getObject("data").userId);
        params.set("cancelReason",cancelReason);
        return this.ajax.myPut(Api.ownerCancel+childNo,params);
    }
    //���������ˡ�����������ŷ���ȡ��δװ��������ʣ�����
    public fenzuCancelorderChildOwner(childNo,timeIntervalList):Observable<any>{
        return this.ajax.myPut(Api.fenzuCancelorderChildOwner+childNo+"?userId="+this.localStorage.getObject("data").userId,timeIntervalList);
    }
    // getWeixinJsApiSign
    public getWeixinJsApiSign(url):Observable<any>{
        return this.ajax.myget(Api.getWeixinJsApiSign+"?url="+url)
            .map((res:Response)=>res);
    }

}
