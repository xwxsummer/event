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
export class goodsReceiptService{
    public local_Storage;
    public userId:string;
    constructor(
        public router: Router,
        public http:Http,
        public localStorage: LocalStorage
    ) {
    }
    public getOrderInfoById(id:number):Promise<any>{
        // return this.http.get('http://139.129.194.245:8102/order-service/order/info/getOrderInfoById?id='+id,{}).toPromise()
        return new Promise((resolve,reject)=>resolve({
            "code": 0,
            "data": [
                {
                    "arriveTime": "2017-04-10 12:12:12",
                    "cancelReason": "有问题",
                    "capacity": 10,
                    "childNo": "22017041231447804",
                    "compensationFee": 100000,
                    "createTime": "2017-04-10 12:12:12",
                    "deposit": 100000,
                    "driverId": 456,
                    "driverName": "张三",
                    "driverPhone": "13888888888",
                    "driverRemark": "坏货",
                    "freight": 100000,
                    "headImg": "http://xxx.xxx/test.png",
                    "imageList": [
                        "string"
                    ],
                    "insuranceFee": 456,
                    "latestArrivalTime": "2017-04-10 12:12:12",
                    "loadTime": "2017-04-10 12:12:12",
                    "modifiedTime": "2017-04-10 12:12:12",
                    "orderId": 5486,
                    "orderNo": "12017041231447804",
                    "ownerId": 7896,
                    "ownerName": "哈哈",
                    "ownerRemark": "好货",
                    "payTime": "2017-04-10 12:12:12",
                    "receiveNet": 70,
                    "receiveRough": 50.2,
                    "receiveTare": 120.2,
                    "receiveTime": "2017-04-10 12:12:12",
                    "remainAmount": 120.2,
                    "sendNet": 70,
                    "sendRough": 50.2,
                    "sendTare": 120.2,
                    "status": 1,
                    "tradeNo": "E123456789",
                    "truckBrand": "大众",
                    "truckId": 123,
                    "truckLoad": 120.2,
                    "truckModel": "XXX",
                    "truckNo": "京A12456",
                    "truckOwnerId": 5486,
                    "unloadRemark": "一般",
                    "unloadTime": "2017-04-10 12:12:12",
                    "userId": 5486
                }
            ],
            "msg": "string"
        }))
    }

}
