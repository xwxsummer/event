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
    //其他描述
    public getSystemLabelByType():Observable<any>{
        return this.ajax.myget(Api.getSystemLabelByType+"?type=1")

    }
    //创建货源
    public submitOrderInfo(myForm,sendlist,receivelist,AdditionalTipText,receive,imgList,remarkText):Promise<any>{
      if(!sendlist[0])sendlist[0]={};
      if(!receivelist[0])receivelist[0]={};
      let orderInfoDTO={
        "endTime": myForm.endTime+":00",
        "freightPrice": myForm.freightPrice,
        "goodsAmount": myForm.goodsAmount,
        "goodsName": myForm.goodsName,
        "goodsPrice": myForm.goodsPrice,
        "goodsSale": myForm.goodsSale,
        "latestArrivalTime" :myForm.latestArrivalTime+":00",
        "goodsUnit": "吨",
        "headImg":localStorage["myTouxiang"],
        "labels": AdditionalTipText,
        "imageList":imgList,
        "name": JSON.parse(localStorage['data'])['name'],
        "phone": JSON.parse(localStorage['data'])['mobile'],
        "receiveAddress": receivelist[0].address || receive[1].address,
        "receiveCity": receivelist[0].city || receive[1].city,
        "receiveCompany": receivelist[0].company || receive[1].company,
        "receiveCounty": receivelist[0].county || receive[1].county,
        "receiveId": receivelist[0].handlerId || receive[1].handlerId,
          "receiveLatitude": receivelist[0].latitude || receive[1].latitude,
          "receiveLongitude": receivelist[0].longitude || receive[1].longitude,
        "receiveName": receivelist[0].name || receive[1].name,
        "receivePhone": receivelist[0].phone || receive[1].phone,
        "receiveProvince": receivelist[0].province || receive[1].province,
        "receiveTown": receivelist[0].town || receive[1].town,
        "remark": remarkText,
        "sendAddress": sendlist[0].address || receive[0].address,
        "sendCity": sendlist[0].city || receive[0].city,
        "sendCompany": sendlist[0].company || receive[0].company,
        "sendCounty": sendlist[0].county || receive[0].county,
        "sendId": sendlist[0].handlerId || receive[0].handlerId,
        "sendLongitude": sendlist[0].longitude || receive[0].longitude,
        "sendLatitude": sendlist[0].latitude || receive[0].latitude,
        "sendName": sendlist[0].name || receive[0].name,
        "sendPhone": sendlist[0].phone || receive[0].phone,
        "sendProvince": sendlist[0].province || receive[0].province,
        "sendTown": sendlist[0].town || receive[0].town,
        "userCode": localStorage['walletCode'],
        "userId":JSON.parse(localStorage["data"]).userId
};
        console.log('发布货源:',orderInfoDTO);
        let params = {};
        for(let key in orderInfoDTO){
            if(orderInfoDTO[key]!==''&&orderInfoDTO[key]!==undefined)
                params[key]=orderInfoDTO[key];
        }
        console.log(params);
        console.log(receive);
        return this.ajax.myPost(Api.submitOrderInfo,params).toPromise();

    }
    //销货
    public submitOrder(myForm,sendlist,receivelist,AdditionalTipText,receive,imgList,remarkText):Promise<any>{
      if(!sendlist[0])sendlist[0]={};
      if(!receivelist[0])receivelist[0]={};
      let orderInfoDTO={
        "endTime": myForm.endTime+":00",
        "freightPrice": myForm.freightPrice,
        "goodsAmount": myForm.goodsAmount,
        "goodsName": myForm.goodsName,
        "latestArrivalTime" :myForm.latestArrivalTime+":00",
        "goodsUnit": "吨",
        "headImg":localStorage["myTouxiang"],
        "labels": AdditionalTipText,
        "imageList":imgList,
        "name": JSON.parse(localStorage['data'])['name'],
        "phone": JSON.parse(localStorage['data'])['mobile'],
        "remark": remarkText,
        "sendAddress": sendlist[0].address || receive[0].address,
        "sendCity": sendlist[0].city || receive[0].city,
        "sendCompany": sendlist[0].company || receive[0].company,
        "sendCounty": sendlist[0].county || receive[0].county,
        "sendId": sendlist[0].handlerId || receive[0].handlerId,
        "sendLongitude": sendlist[0].longitude || receive[0].longitude,
        "sendLatitude": sendlist[0].latitude || receive[0].latitude,
        "sendName": sendlist[0].name || receive[0].name,
        "sendPhone": sendlist[0].phone || receive[0].phone,
        "sendProvince": sendlist[0].province || receive[0].province,
        "sendTown": sendlist[0].town || receive[0].town,
        "userCode": localStorage['walletCode'],
        "userId":JSON.parse(localStorage["data"]).userId
};
        console.log('销售货源:',orderInfoDTO);
        let params = {};
        for(let key in orderInfoDTO){
            if(orderInfoDTO[key]!==''&&orderInfoDTO[key]!==undefined)
                params[key]=orderInfoDTO[key];
        }
        console.log(params);
        console.log(receive);
        return this.ajax.myPost(Api.submitOrder,params).toPromise();
    }
    public getOrderInfoByOrderNo(OrderNo:string):Promise<any>{
      return this.ajax.myget(Api.getOrderInfoByOrderNo+`?orderNo=${OrderNo}&userCode=${localStorage['walletCode']}`).toPromise()
    }
    //上传图片
    public upBase64Image(base64FileList:string): Observable<any>{
            let formData:FormData = new FormData();
            formData.append("type", 'order');
            formData.append("base64FileList", base64FileList);
            return this.ajax.myPost(Api.base64Image,formData );
    }


}
