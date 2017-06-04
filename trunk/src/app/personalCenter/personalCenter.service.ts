import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api';
import { Ajax } from '../ajax';
//本地缓存
import { LocalStorage } from '../local_storage';
//md5 加密
import { Md5 } from "ts-md5/dist/md5";

declare var mui: any;
@Injectable()
export class personalCenterService{
  public local_Storage;
  public userId:string;//用户id :string
  public ajax: Ajax;
  constructor(
    public router: Router,
    public localStorage: LocalStorage,
    public http: Http
  ){
    this.ajax = new Ajax(this.http);
  }

  //查询个人信息
  public personalCenterInfo():Observable<any>{
    this.local_Storage=this.localStorage.getObject("data");
    this.userId=this.localStorage.getObject("data").userId+"";
    console.log(this.local_Storage);
    //return this.ajax.myget(Api.myself+'?userId='+this.userId);
    return this.ajax.myget(Api.myself+'?userId=67');

  }

  //查看认证信息接口
  public getAuthMessage():Observable<any>{
    this.userId=this.localStorage.getObject("data").userId+"";
    return this.ajax.myget(Api.getAuthMessage+'?userId='+this.userId);


  }


  //修改认证信息接口
  public updateAuthMessage(authInfoDTO):void{
    this.ajax.myPut(Api.updateAuthMessage,authInfoDTO)//+this.userId
      .subscribe(data=>{
        console.log(data);
        if(data.code==0){
          this.router.navigateByUrl("certification/checking?checking=2");//跳到审核界面
        }else{
          mui.toast(data.msg ,{ duration:'short', type:'div' });
        }

      });
  }

  //设置中的修改手机号码
  public changMobileTrue(data,setting):void{
    this.local_Storage=this.localStorage.getObject("data");
    this.local_Storage.mobile=data.newMobile;
    this.ajax.myPost(Api.changeMobile,data)
      .subscribe(data=>{
        if(data.code==0){
          this.localStorage.setObject("data",this.local_Storage);
          if(setting==1){//设置页面
            this.router.navigateByUrl("personalCenter/Setting");
          }else{//个人信息
            this.router.navigateByUrl("personalCenter/PersonalInfo");
          }
          mui.toast('修改成功',{ duration:'short', type:'div' });
        }else{
          mui.toast('手机号码已注册，请重新输入手机号码',{ duration:'short', type:'div' });
        }
      });
  }
  //设置中的修改密码
  public changPsw(data):void{
    data.userId=this.localStorage.getObject("data").userId+"";
    data.oldPwd=Md5.hashStr(data.oldPwd)+"";
    data.newPwd=Md5.hashStr(data.newPwd)+"";
    let params = new URLSearchParams();
    params.set("userId",data.userId);
    params.set("oldPwd",data.oldPwd);
    params.set("newPwd",data.newPwd);
    params.set("platform","3");
    this.ajax.myPost(Api.changePwd,params)
      .subscribe(data=>{
        if(data.code==0){
          this.router.navigateByUrl("personalCenter/Setting");
          mui.toast('修改成功',{ duration:'short', type:'div' });
        }else{
          mui.toast(data.msg,{ duration:'short', type:'div' });
        }

      });
  }
  //用户验证码 有权限
  public captcha(mobile):void{
    let params = new URLSearchParams();
    params.set("mobile",mobile);
    params.set("type","1");  //修改手机号码验证码  1
    this.ajax.myPost(Api.captcha,params)
      .subscribe(
        data => {
        if(data.code==0){//未注册
          mui.toast("验证码已发送到您的手机</br>请注意查收",{ duration:'short', type:'div' });
        }else{
          mui.toast(data.msg,{ duration:'short', type:'div' });
        }
      });
  }


  /*
  * 地址管理findDefault
  * */
  //查询收/发货地址
  public addressFindList(type):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId+"";
    console.log(this.localStorage.getObject("data").mobile);
    console.log(this.userId);
    let params = new URLSearchParams();
    params.set("userId","67");
    params.set("type",type);  //type 1发货   type 2收获

    return this.ajax.myget(Api.addreFindList+"?userId="+this.userId+"&type="+type)



}
  //设置默认收/发货地址
  public addressSetDefault(id,type):void{
    this.userId=this.localStorage.getObject("data").userId+"";
    let params = new URLSearchParams();
    params.set("userId",this.userId);
    params.set("id",id);//地址ID
    params.set("type",type);  //1发货  2收货
    this.ajax.myPut(Api.addreSetDefault,params)
      .subscribe(
        data => {
        if(data.code==0){//未注册
          mui.toast("设置默认地址成功",{ duration:'short', type:'div' });
         }else{//设置默认收发货地址没有成功
          mui.toast(data.msg,{ duration:'short', type:'div' });
        }
      });
  }

  //删除收/发货地址
  public deleteAddress(id):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId+"";
    //let params = new URLSearchParams();
    //params.set("userId",this.userId);
    //params.set("id",id);
    return this.ajax.myDelete(Api.deleteAddres+"?userId="+this.userId+"&id="+id);
    }

  //根据ID查询地址
  public getAddress(id):Observable<any>{

    this.userId=this.localStorage.getObject("data").userId+"";
    console.log(this.userId);
    //
    //let params = new URLSearchParams();
    //params.set("userId",this.userId);
    //params.set("id",id);//地址ID
        return this.ajax.myget(Api.getAddres+"?userId="+this.userId+"&id="+id);

  }
  //修改收/发货地址
  public putAddress(address):void{
    this.ajax.myPut(Api.putAddres,address).subscribe(
        data => {
        if(data.code==0){//成功
          mui.toast("修改地址成功",{ duration:'short', type:'div' });
          //管理收货信息
          this.router.navigateByUrl("personalCenter/ManageReceive?type="+address.type);
        }else{
          mui.toast(data.msg,{ duration:'short', type:'div' });
        }
      }
    );
  }
  //添加收/发货地址
  public addAddress(address):void{
    address.userId=this.localStorage.getObject("data").userId;
    this.ajax.myPost(Api.putAddres,address).subscribe(
        data => {
        //if(data.json().code==0){//成功
        //  mui.toast("修改地址成功",{ duration:'short', type:'div' });
        //  //管理收货信息
        //  this.router.navigateByUrl("personalCenter/ManageReceive");
        //}else{
        //  mui.toast(data.json().msg,{ duration:'short', type:'div' });
        //}
          console.log(data);
      }
    );
  }

  //查询黑名单
  public blacklist():Observable<any>{
    return this.ajax.myget(Api.blacklist+"?userId=1");
  }
  //查询司机端详情
  public carUserInfo(userId):Observable<any>{
    return this.ajax.myget(Api.carUserInfo+"?userId="+userId);
  }
  //移除黑名单
  public removeBlackList(id):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myDelete(Api.removeBlackList+'?userId="+this.userId+"&id='+id);
  }
  //添加黑名单
  public addBlackList(blackList):Observable<any>{
    blackList.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myPost(Api.removeBlackList,blackList);
  }

  //获取员工列表
  public Management():Observable<any>{
    this.userId=this.localStorage.getObject("data").userId+"";
    console.log(this.userId);
  return this.ajax.myget(Api.getOwnerStaffMessage+"?page=1&userId="+this.userId+"&pageSize=10");


}
  //删除员工列表
  public deleteOwnerStaff(staffId):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myDelete(Api.deleteOwnerStaff+'?userId='+this.userId+'&staffId='+staffId);

   }

//验证手机号
  public checkMobile(mobile):Observable<any>{
   return this.ajax.myget(Api.checkMobile+'?mobile='+mobile);
  }

  //添加员工
  public submitOwnerStaff(OwnerStaffDTO):Observable<any>{
    OwnerStaffDTO.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myPost(Api.submitOwnerStaff,OwnerStaffDTO);
  }

  //添加意见反馈
  public addFeedBack(content):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    let params = new URLSearchParams();
    params.set("userId",this.userId);
    params.set("mobile",this.localStorage.getObject("data").mobile);
    params.set("type","1");
    params.set("content",content);
    return this.ajax.myPost(Api.addFeedBack,params);
  }
  //查询意见反馈
  public optionFindList():Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myget(Api.optionFindList+"?userId="+this.userId+"&page=1&pageSize=10");
  }

  /*
  * 业务统计
  * */
  //获取订单次数
  public countOrders(beginTime,endTime):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    return this.ajax.myget(Api.countOrders+"?userId=5486&beginTime=2017-4-2&endTime=2017-4-20");

  }
  //查询已完成的货单列表countPublishOrder
  public countPublishOrder(beginTime,endTime):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    let params = new URLSearchParams();
    params.set("userId","5486");
    params.set("beginTime","2017-2-2");
    params.set("endTime","2017-2-2");

    return this.ajax.myget(Api.countPublishOrder+"?userId=5486&beginTime=2017-4-2&endTime=2017-4-20");

  }
  //已经接单的数目列表
  public countOrderChildsToList(beginTime,endTime):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    let params = new URLSearchParams();
    params.set("userId","5486");
    params.set("beginTime","2017-2-2");
    params.set("endTime","2017-2-2");

    return this.ajax.myget(Api.countOrderChildsToList+"?userId=5486&beginTime=2017-4-2&endTime=2017-4-20");

  }
  // 已经运送的货物数量列表，已支付运费的列表
  public countCompleteOrderToList(beginTime,endTime):Observable<any>{
    this.userId=this.localStorage.getObject("data").userId;
    let params = new URLSearchParams();
    params.set("userId","5486");
    params.set("beginTime","2017-2-2");
    params.set("endTime","2017-2-2");

    return this.ajax.myget(Api.countCompleteOrderToList+"?userId=5486&beginTime=2017-4-2&endTime=2017-4-20");

  }

  //货源明细
  //public getOrderInfoListByParam(orderInfoTermDTO){
  //    return this.ajax.myPost(Api.getOrderInfoListByParam,orderInfoTermDTO);
  //}

  public getOrderInfoListByParam(orderInfoTermDTO){
    //return this.ajax.myPost(Api.getOrderInfoListByParam,orderInfoTermDTO);
      return this.http.post(Api.getOrderInfoListByParam,orderInfoTermDTO).map((res: Response) => res.json());
  }
  //收货历史
  //public getOrderChildListByParam(orderInfoTermDTO){
  //  return this.ajax.myPost(Api.getOrderChildListByParam,orderInfoTermDTO);
  //}

  public getOrderChildListByParam(orderInfoTermDTO){
    return this.http.post(Api.getOrderChildListByParam,orderInfoTermDTO).map((res: Response) => res.json());
  }

  //public wallet(userCode:Number):Observable<any>{
  //  return this.http.get(Api.wallet+"?userCode"+userCode).map((res: Response) => res.json());
  //}
  //钱包余额
  public wallet(userCode:Number):Observable<any>{
    return this.ajax.myget(Api.wallet+"?userCode="+userCode);
  }

  //查询银行卡列表
  public bankCardFindList(userCode:Number):Observable<any>{
    //return this.ajax.myget(Api.wallet+"?userCode="+userCode);
    return this.ajax.myget(Api.bankCardFindList+"?userCode=10000005");
  }
  //添加银行卡
  public addbankCard(saveDTO):Observable<any>{

    saveDTO.bankCode="CMB";
    saveDTO.userCode=10000005;
    //return this.ajax.myget(Api.wallet+"?userCode="+userCode);
    //return this.ajax.myPost(Api.bankCardFindList,saveDTO);
    return this.http.post(Api.addbankCard,saveDTO).map((res: Response) => res.json());
  }
  //查询收支明细
  public tradeFindList(userCode:Number,fund:string):Observable<any>{
    let UserCode = "?userCode="+userCode;
    let Fund = fund? "&fund="+ fund :'';
    return this.ajax.myget(Api.findList+UserCode+Fund);
  }

  public findDateList(date:string,fund:string,type:number):Observable<any>{
      let data = {
          date,
          "page": 1,
          "pageSize": 10,
          "type": 1,
          "userCode": 10000005
      };
      if(fund)data['fund']=fund;
      return this.http.post('http://139.129.194.245:8301/payment-service/trade/findDateList',data).map((res: Response) => res.json());
  }

}
