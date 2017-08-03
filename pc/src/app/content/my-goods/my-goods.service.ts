import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Api } from "app/api";
import { Ajax } from "app/ajax";
import { SessionStorage } from "app/fragment/session_storage";
import { Observable } from 'rxjs';

@Injectable()
export class MyGoodsService {
  constructor(

    public sessionStorage:SessionStorage,
    public ajax:Ajax,
    public http:Http
    ) {
     }
  //子单收货历史
  public getOrderDetailListByParam(details): Observable<any> {
    console.log(details.childStatus);
    let  orderInfoTermDTO = {
          childStatus:details.childStatus,
          page:details.page,//调转到第几页
          pageSize:5,
          receiveId:this.sessionStorage.getObject("data").userId,
          childNo: details.childNo,
          truckNo:details.truckNo,
          sendCity:details.sendCity,
          receiveCity:details.receiveCity,
          receiveCompany: details.receiveCompany,
          beginTime:details.startTime,
          endTime:details.endTime
    }
      return this.ajax.myPost(Api.getOrderDetailListByParam,orderInfoTermDTO)
      .map((res:Response) => res);
  }
  // 主单货源明细
  public getOrderInfoListByParam(details) {
    let orderInfoTermDTO={
      // userId:this.sessionStorage.getObject("data").userId,
      // pageSize:5,
      // status:details.childStatus,
      // page:details.page,
      // orderNo: details.orderNo,
      // sendName:details.sendName,
      // sendCity:details.sendCity,
      // receiveCity:details.receiveCity,
      // receiveCompany: details.receiveCompany,
      // beginCreateTime:details.publishTime,
      // endCreateTime:details.endTime
      userId:this.sessionStorage.getObject("data").userId,
      pageSize:5,
      status:details.childStatus,
      page:details.page,
      orderNo: details.orderNo,
      sendName:details.sendName,
      sendProvince:details.sendProvince,
      sendCity:details.sendCity,
      sendCounty:details.sendCounty,
      sendTown:details.sendTown,
      receiveProvince:details.receiveProvince,
      receiveCity:details.receiveCity,
      receiveCounty:details.receiveCounty,
      receiveTown:details.receiveTown,
      receiveCompany: details.receiveCompany,
      publishTime:details.startTime,
      endTime:details.endTime
    }
    console.log(orderInfoTermDTO)
    return this.ajax.myPost(Api.getOrderInfoListByParam, orderInfoTermDTO);
  }
  //子单查看详细信息
  public getOrderDetailsByChildNo(childNo): Observable<any> {
    return this.ajax.myget(Api.getOrderDetailsByChildNo + "?childNo=" + childNo + "&userCode=" + this.sessionStorage.getObject("data").walletCode)
      .map((res: Response) => res);
  }
  //主单查看详细信息
  public getOrderInfoByOrderNo(OrderNo): Observable<any> {
    return this.ajax.myget(Api.getOrderInfoByOrderNo + "?orderNo=" + OrderNo);
  }
  //获取发布货源备注图片
  public getRemarkByOrderNo(OrderNo): Promise<any> {
    return this.ajax.myget(Api.getRemarkByOrderNo + "?orderNo=" + OrderNo).toPromise();
  }

  //查看拒绝原因
  public getCancelReasonByChildNo(childNo): Observable<any> {
    return this.ajax.myget(Api.getCancelReasonByChildNo + "?childNo=" + childNo)
      .map((res: Response) => res);
  }

  //获取取消原因
  public getSystemLabelByType(type): Observable<any> {
    return this.ajax.myget(Api.getSystemLabelByType + "?type=" + type);
  }
  //取消主货单
  public cancelInfoByMainOrder(OrderNo, cancelReason): Observable<any> {
    return this.ajax.myPut(Api.cancelInfoByMainOrder + OrderNo + "?userId=" + this.sessionStorage.getObject("data").userId + "&cancelReason=" + cancelReason, null);
  }
  //接单查询
  public getOrderChildListByParam(OrderNo, page,params,childStatus): Observable<any> {

    let orderChildTermDTO =
    {
       orderNo: OrderNo,
       childStatus: childStatus,
       pageSize: 5 ,
       page:page,
       beginTime:params.beginTime,
       endTime:params.endTime,
       childNo:params.number,
       truckNo:params.truckNo
      };
      console.log(orderChildTermDTO)
    return this.ajax.myPost(Api.getOrderDetailListByParam, orderChildTermDTO);
  }
  // 获取子订单赔偿金支付金额
  public compensationOwnerCancel(childNo): Observable<any> {
    return this.ajax.myget(Api.compensationOwnerCancel + childNo);
  }
  //获取主订单赔偿金金额
  public compensationInfoByMainOrder(OrderNo): Observable<any> {
    return this.ajax.myget(Api.compensationInfoByMainOrder + OrderNo);
  }
  //取消子订单
  public orderChildOwnerCancel(childNo, cancelReason): Observable<any> {
    let params = new URLSearchParams();
    params.set("userId", this.sessionStorage.getObject("data").userId);
    params.set("cancelReason", cancelReason);
    return this.ajax.myPut(Api.orderChildOwnerCancel + childNo, params);
  }
  //默认收发货地址
  public findDefault() {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    // this.local_Storage=this.localStorage.getObject("data").userId;
    console.log(this.sessionStorage.getObject("data"));
    return this.ajax.myget(Api.findDefault + "?userId=" + userId)
  }
  //创建货源
  public submitOrderInfo(myForm, sendlist, receivelist, AdditionalTip, receive, imgList): Promise<any> {
    if (!sendlist[0]) sendlist[0] = {};
    if (!receivelist[0]) receivelist[0] = {};
    let orderInfoDTO = {
      "endTime": myForm.endTime,
      "freightPrice": myForm.freightPrice,
      "goodsAmount": myForm.goodsAmount,
      "goodsName": myForm.goodsName,
      "goodsPrice": myForm.goodsPrice,
      "goodsSale": myForm.goodsSale,
      "latestArrivalTime": myForm.latestArrivalTime,
      "goodsUnit": "吨",
      "headImg":JSON.parse(sessionStorage["data"]).headImg,
      "labels": AdditionalTip,
      "imageList": imgList,
      "name": JSON.parse(sessionStorage['data'])['name'],
      "phone": JSON.parse(sessionStorage['data'])['mobile'],
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
      "remark": myForm.remark,
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
      "userCode": JSON.parse(sessionStorage["data"]).walletCode+'',
      "userId": JSON.parse(sessionStorage["data"]).userId
    };
    console.log('发布货源:', orderInfoDTO);
    let params = {};
    for (let key in orderInfoDTO) {
      if(orderInfoDTO[key] instanceof Array && orderInfoDTO[key].length<1){
        delete orderInfoDTO[key];
      }
      if (orderInfoDTO[key] !== '' && orderInfoDTO[key] !== undefined)
        params[key] = orderInfoDTO[key];
    }
    console.log(params);
    console.log(receive);
    return this.ajax.myPost(Api.submitOrderInfo, params).toPromise();

  }

  //销货
  public submitOrder(myForm,sendlist,receivelist,AdditionalTipText,receive,imgList,remarkText):Promise<any>{
    if(!sendlist[0])sendlist[0]={};
    if(!receivelist[0])receivelist[0]={};
    let orderInfoDTO={
      "endTime": myForm.endTime,
      "freightPrice": myForm.freightPrice,
      "goodsAmount": myForm.goodsAmount,
      "goodsName": myForm.goodsName,
      "latestArrivalTime" :myForm.latestArrivalTime,
      "goodsUnit": "吨",
      "headImg":JSON.parse(sessionStorage["data"]).headImg,
      "labels": AdditionalTipText,
      "imageList":imgList,
      "name": JSON.parse(sessionStorage['data'])['name'],
      "phone": JSON.parse(sessionStorage['data'])['mobile'],
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
      "userCode": JSON.parse(sessionStorage["data"]).walletCode+'',
      "userId":JSON.parse(sessionStorage["data"]).userId
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


  public getOrderInfoByOrder(OrderNo:string):Promise<any>{
      return this.ajax.myget(Api.getOrderInfoByOrderNo+`?orderNo=${OrderNo}&userCode=${JSON.parse(sessionStorage["data"]).walletCode+''}`).toPromise()
    }

  //上传图片
  public upBase64Image(base64FileList:string):Observable<any>{
    let formData:FormData = new FormData();
    formData.append("type", 'order');
    formData.append("base64FileList", base64FileList);
    return this.ajax.myPost(Api.base64Image,formData );
  }

  //已发布货源
  public getOrderList(url: string, params: URLSearchParams): Observable<any> {
    return this.ajax.getByParams(url, params);
  }

  //获取订单数量
  public getOrderNum(params: URLSearchParams): Observable<any> {
    return this.ajax.getByParams(Api.countOrders, params);
  }
  //《《货主端》根据主单编号分组取消未装车订单及剩余货单
    public fenzuCancelorderChildOwner(childNo,timeIntervalList):Observable<any>{
        return this.ajax.myPut(Api.fenzuCancelorderChildOwner+childNo+"?userId="+this.sessionStorage.getObject("data").userId,timeIntervalList);
    }
  //获取每个省的下拉列表
  public getProvinceList(province): Observable<any> {
    var params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    return this.ajax.getByParams(Api.getProvinceList + province + ".json",params);
  }
}
