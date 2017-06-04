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
declare var mui: any;
@Injectable()
export class marketService{
    public local_Storage;
    public userId:string;
    constructor(
        public router: Router,
        public http:Http,
        public localStorage: LocalStorage
    ){
    }
    // public rtn = {
    //   "data": [
    //     {
    //       "userId": 5486,
    //       "name": "张三",
    //       "phone": "13888888888",
    //       "headImg": null,
    //       "orderNo": "12017042019809952",
    //       "goodsName": "蜂窝煤",
    //       "goodsAmount": 120.2,
    //       "goodsResidue": 18.2,
    //       "goodsUnit": "吨",
    //       "goodsPrice": 100000,
    //       "freightPrice": 100000,
    //       "insurance": 1,
    //       "insuranceFee": 0,
    //       "tradeNo": "E201604100008",
    //       "endTime": "2017-04-10 12:12:12",
    //       "latestArrivalTime": null,
    //       "orderStatus": 1,
    //       "sendId": 123,
    //       "sendName": "李四",
    //       "sendPhone": "15222222222",
    //       "sendCompany": "山西大同XXX霉",
    //       "sendProvince": "山西",
    //       "sendCity": "大同",
    //       "sendCounty": "运城",
    //       "sendTown": "XXX乡",
    //       "sendAddress": "山西大同运城XXX乡",
    //       "sendLongitude": 180.284769,
    //       "sendLatitude": 90.12548,
    //       "receiveId": 456,
    //       "receiveName": "王五",
    //       "receivePhone": "1577777777",
    //       "receiveCompany": "XXX公司",
    //       "receiveProvince": "北京",
    //       "receiveCity": "北京",
    //       "receiveCounty": "昌平",
    //       "receiveTown": "回龙观东大街XXX小区",
    //       "receiveAddress": "北京昌平回龙观东大街XXX小区",
    //       "receiveLongitude": 180.284769,
    //       "receiveLatitude": 90.12548,
    //       "distance": 1000,
    //       "labels": "路上滑|路好走",
    //       "remark": "速度来",
    //       "orderCount": 14,
    //       "publishTime": null,
    //       "creditPrice": 0,
    //       "createTime": "2017-04-20 14:44:04"
    //     },
    //     {
    //       "userId": 5486,
    //       "name": "张三",
    //       "phone": "13888888888",
    //       "headImg": null,
    //       "orderNo": "12017042044008168",
    //       "goodsName": "蜂窝煤",
    //       "goodsAmount": 120.2,
    //       "goodsResidue": 18.2,
    //       "goodsUnit": "吨",
    //       "goodsPrice": 100000,
    //       "freightPrice": 100000,
    //       "insurance": 1,
    //       "insuranceFee": 0,
    //       "tradeNo": "E201604100008",
    //       "endTime": "2017-04-10 12:12:12",
    //       "latestArrivalTime": null,
    //       "orderStatus": 1,
    //       "sendId": 123,
    //       "sendName": "李四",
    //       "sendPhone": "15222222222",
    //       "sendCompany": "山西大同XXX霉",
    //       "sendProvince": "山西",
    //       "sendCity": "大同",
    //       "sendCounty": "运城",
    //       "sendTown": "XXX乡",
    //       "sendAddress": "山西大同运城XXX乡",
    //       "sendLongitude": 180.284769,
    //       "sendLatitude": 90.12548,
    //       "receiveId": 456,
    //       "receiveName": "王五",
    //       "receivePhone": "1577777777",
    //       "receiveCompany": "XXX公司",
    //       "receiveProvince": "北京",
    //       "receiveCity": "北京",
    //       "receiveCounty": "昌平",
    //       "receiveTown": "回龙观东大街XXX小区",
    //       "receiveAddress": "北京昌平回龙观东大街XXX小区",
    //       "receiveLongitude": 180.284769,
    //       "receiveLatitude": 90.12548,
    //       "distance": 1000,
    //       "labels": "路上滑|路好走",
    //       "remark": "速度来",
    //       "orderCount": 14,
    //       "publishTime": null,
    //       "creditPrice": 0,
    //       "createTime": "2017-04-21 00:49:35"
    //     }
    //   ]
    // }
    //
    public getOrderInfoListByParam(params:Object):Promise<any>{
    //
    // return new Promise((resolve,reject)=>{resolve(this.rtn)})


    if( !Object.keys(params).length ) params = {
                // "endTime": "2017-04-10 12:12:12",
                // "page": 1,
                // "pageSize": 10,
                // "receiveCity": "北京",
                // "receiveCounty": "昌平",
                // "receiveProvince": "北京",
                // "receiveTown": "回龙观东大街XXX小区",
                // "residueBegin": 10,
                // "residueEnd": 20,
                // "sendCity": "大同",
                // "sendCounty": "运城",
                // "sendProvince": "山西",
                // "sendTown": "XXX乡",
                // "status": 2,
                "userId": 5486
            };
    return this.http.post(Api.getOrderInfoListByParam,params).toPromise()
    }

}
