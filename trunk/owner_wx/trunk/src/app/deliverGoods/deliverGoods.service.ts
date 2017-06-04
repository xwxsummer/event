/**
 * Created by 123 on 2017/4/18.
 */
import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
//import {headImgUrl} from'../fragment/validateMessage';
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
        //public headImgUrl:headImgUrl,
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
        //0:发货 1:收货
      console.log('调用');
      //如果没有获取到收发货信息，传空的过去
      if(!sendlist[0])sendlist[0]={};
      if(!receivelist[0])receivelist[0]={};
      let orderInfoDTO={
        "endTime": myForm.endTime,
        "freightPrice": myForm.freightPrice,
        "goodsAmount": myForm.goodsAmount,
        "goodsName": myForm.goodsName,
        "goodsPrice": myForm.goodsPrice,
        "latestArrivalTime" :myForm.latestArrivalTime,
        "goodsUnit": "吨",
        "headImg":localStorage["myTouxiang"],
        //"headImg": "http://clx-dev.oss-cn-beijing.aliyuncs.com/order/201705/FtCqfu4jatw0lX19V0diG39EvGSD.jpeg",
        "labels": AdditionalTipText,
        "imageList":imgList,
        "name": JSON.parse(localStorage['data'])['name'],
        //  JSON.parse(localStorage.data)["name"]
        "phone": receive[0].phone,
        "receiveAddress": receive[1].address,
        "receiveCity": receive[1].city,
        "receiveCompany": receive[1].company,
         // "receiveCompany": "德胜置业大厦",
        "receiveCounty": receive[1].county,
        "receiveId": receive[1].id,
          //"receiveId": 66,
        //"receiveLongitude": receive[1].latitude,
        //"receiveLatitude": receive[1].longitude,
          "receiveLatitude": receive[1].latitude,
          "receiveLongitude": receive[1].longitude,
          //"receiveLatitude": 39.969869,
          //"receiveLongitude":116.383331 ,
        "receiveName": receive[1].name,
        "receivePhone": receive[1].phone,
        "receiveProvince": receive[1].province,
        "receiveTown": receive[1].town,
        "remark": remarkText,
        "sendAddress": receive[0].address,
        "sendCity": receive[0].city,
        "sendCompany": receive[0].company,
         // "sendCompany": "分公司",
        "sendCounty": receive[0].county,
        "sendId":receive[0].id,
          //"sendId":62,
        "sendLongitude": receive[0].longitude,
        "sendLatitude": receive[0].latitude,
        //  "sendLatitude": receive[0].latitude,
        //  "sendLongitude": receive[0].longitude,
        //  "sendLatitude":39.938692,
        //  "sendLongitude": 116.482876,
        "sendName": receive[0].name,
        "sendPhone": receive[0].phone,
        "sendProvince": receive[0].province,
       //   "sendProvince":"北京市",
        "sendTown": receive[0].town,
        "userCode": localStorage['walletCode'],
        "userId":JSON.parse(localStorage["data"]).userId
};
        console.log(orderInfoDTO);
        let params = {};
        for(let key in orderInfoDTO){
            if(orderInfoDTO[key]!==''&&orderInfoDTO[key]!==undefined)
                params[key]=orderInfoDTO[key];
        }
        console.log(params);
        console.log(receive);
        return this.ajax.myPost(Api.submitOrderInfo,params).toPromise();

    }

    public getOrderInfoByOrderNo(OrderNo:string):Promise<any>{
      return this.ajax.myget(Api.getOrderInfoByOrderNo+`?orderNo=${OrderNo}&userCode=${localStorage['walletCode']}`).toPromise()
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
    public headImgUrl="http://clx-dev.oss-cn-beijing.aliyuncs.com/";

}
