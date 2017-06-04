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
import { Ajax } from '../ajax';
//import { deliver } from  './deliver';
import { LocalStorage } from '../local_storage';
declare var mui: any;
@Injectable()
export class deliverGoodsService{
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
    //默认收发货地址
    public findDefault(){
        this.userId=this.localStorage.getObject("data").userId;
        this.local_Storage=this.localStorage.getObject("data").userId;
        console.log(this.localStorage.getObject("data"));
        return this.ajax.myget(Api.findDefault+"?userId="+this.userId)
    }
    //创建货源
    public submitOrderInfo(myForm,sendlist,receivelist,AdditionalTipText):Promise<any>{
      console.log('调用');
      //如果没有获取到收发货信息，传空的过去
      if(!sendlist[0])sendlist[0]={};
      if(!receivelist[0])receivelist[0]={};
      let orderInfoDTO={
        "creditPrice": 500,
        "distance": 1000,
        "endTime": "2017-04-10 12:12:12",
        "freightPrice": myForm.freightPrice,
        "goodsAmount": myForm.goodsAmount,
        "goodsName": myForm.goodsName,
        "goodsPrice": myForm.goodsPrice,
        "goodsResidue": 18.2,
        "goodsUnit": "吨",
        "headImg": "http://xx.xx.xx.xx/xx.png",
        "insurance": 1,
        "insuranceFee": 100000,
        "labels": AdditionalTipText,
        "name": sendlist[0].name,
        "orderCount": 9999,
        "orderNo": "orderNo123456789",
        "orderStatus": 1,
        "phone": sendlist[0].phone,
        "publishTime": "1小时",
        "receiveAddress": receivelist[0].address,
        "receiveCity": receivelist[0].city,
        "receiveCompany": "XXX公司",
        "receiveCounty": receivelist[0].county,
        "receiveId": 456,
        "receiveLatitude": 90.12548,
        "receiveLongitude": 180.284769,
        "receiveName": receivelist[0].name,
        "receivePhone": receivelist[0].phone,
        "receiveProvince": "北京",
        "receiveTown": "",
        "remark": "速度来",
        "sendAddress": sendlist[0].address,
        "sendCity": sendlist[0].city,
        "sendCompany": "",
        "sendCounty": sendlist[0].county,
        "sendId": 123,
        "sendLatitude": 90.12548,
        "sendLongitude": 180.284769,
        "sendName": sendlist[0].name,
        "sendPhone": sendlist[0].phone,
        "sendProvince": sendlist[0].address,
        "sendTown": "XXX乡",
        "tradeNo": "E201604100008",
        "userCode": 1000004,

};
        return this.http.post(Api.submitOrderInfo,orderInfoDTO).toPromise();

    }

    public getOrderInfoByOrderNo(OrderNo:string):Promise<any>{
      return this.http.get(Api.getOrderInfoByOrderNo+`?orderNo=${OrderNo}`).toPromise()
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
