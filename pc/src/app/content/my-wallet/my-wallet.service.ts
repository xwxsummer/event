import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Api } from "app/api";
import { Ajax } from "app/ajax";
import { SessionStorage } from "app/fragment/session_storage";
import { Observable } from 'rxjs';
declare var md5: any;
declare var layer: any;

@Injectable()
export class MyWalletService {
  constructor(
    public sessionStorage:SessionStorage,
    public ajax:Ajax,
    public http:Http
    ) {
     }
//钱包余额
  public wallet():Observable<any>{
    return this.ajax.myget(Api.wallet+"?userCode="+this.sessionStorage.getObject("data").walletCode);
  }
 //查询收支明细
  public tradeFindList(pageSize,page,fund):Observable<any>{
    let UserCode = "?userCode="+this.sessionStorage.getObject("data").walletCode;
    let Fund = fund? "&fund="+ fund :'';
    return this.ajax.myget(Api.findList+UserCode+Fund+"&page="+page+"&pageSize=5");
  }
  //按时间查询收支明细
  public findDateList(params):Observable<any>{
    let findDto = {
        "date": params.date,
        "endDate": params.endDate,
        "fund": params.payType,
        "page": params.tzpageNum,
        "pageSize": 5,
        "type": 3,
        "userCode":this.sessionStorage.getObject("data").walletCode
      }
    return this.ajax.myPost(Api.findDateList,findDto)
  }

  //网银支付 cpcnDirect
  public cpcnDirect(posts):Observable<any>{
    let rechargeCpcnDirectDTO={
      "accountType": posts.accountType,
      "amount": posts.money,
      "bankID": posts.cardId,
      "payerName": this.sessionStorage.getObject("data").name,
      "userCode": this.sessionStorage.getObject("data").walletCode
    }
    return this.ajax.myPost(Api.cpcnDirect,rechargeCpcnDirectDTO);
  }
  //调用银行接口
  public zhongjin(data):Observable<any>{
    console.log(data)
    let zfDTO={
      "message":data.message,
      "signature":data.signature
    }
    return this.ajax.myPost(data.action,zfDTO);
  }
  //查询银行卡列表
  public bankCardFindList():Observable<any>{
    return this.ajax.myget(Api.bankCardFindList+"?userCode="+this.sessionStorage.getObject("data").walletCode);
  }
  //绑定银行卡
   public bankCard(posts):Observable<any>{
    let seveDTO={
      "accountType": parseInt(posts.accountType),
      "bank":posts.bank,
      "bankCode":posts.bankCode,
      "cardNo":posts.cardNo,
      "faster":posts.faster,
      "idNo":posts.idNo,
      "idType":posts.idType,
      "mobile":posts.mobile,
      "name": posts.name,
      "type":"10",
      "userCode": this.sessionStorage.getObject("data").walletCode
    }
    return this.ajax.myPost(Api.addbankCard,seveDTO);
  }
  //开通快捷支付，检验验证码
  public binding(serialNumber,smsCode):Observable<any>{
    let params = new URLSearchParams();
    params.set("serialNumber",serialNumber);
    params.set("smsCode",smsCode);
    return this.ajax.myPost(Api.addbankCard,params);
  }
  //解绑银行卡
  public unBinding(id,pwd):Observable<any>{
    let pwds=md5(pwd);
    let params = new URLSearchParams();
    params.set("userCode",this.sessionStorage.getObject("data").walletCode);
    params.set("id",id);
    params.set("pwd",pwds)
    return this.ajax.myPut(Api.unBinding,params)
  }
  //查询有快捷支付的银行卡列表
  public findFasterList():Observable<any>{
    return this.ajax.myget(Api.findFasterList+"?userCode="+this.sessionStorage.getObject("data").walletCode);
  }
  //快捷支付发送短信验证
  public fasterPay(snBingding,figure,pwd):Observable<any>{
    let pwds=md5(pwd);
    let params = new URLSearchParams();
    params.set("userCode",this.sessionStorage.getObject("data").walletCode);
    params.set("snBingding",snBingding);
    params.set("figure",figure);
    params.set("pwd",pwds)
    return this.ajax.myPost(Api.fasterPay,params);
  }
  //快捷支付验证码输入
  public fasterPayVerify(serialNumber,smsCode):Observable<any>{
    let params = new URLSearchParams();
    params.set("serialNumber",serialNumber);
    params.set("smsCode",smsCode);
    return this.ajax.myPost(Api.fasterPayVerify,params);
  }
  //提现
  public settlement(money,bankCardId,pwd):Observable<any>{
    let pwds=md5(pwd);
    let cpcnSettlementDTO = {
        "bankCardId": bankCardId,
        "figure": money,
        "pwd": pwds,
        "userCode":this.sessionStorage.getObject("data").walletCode
      }
    return this.ajax.myPost(Api.settlement,cpcnSettlementDTO)
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
          layer.msg("验证码已发送到您的手机,请注意查收");
        }else{
          layer.msg(data.msg);
        }
    });
  }
  //重置密码第一步 验证验证码
  public checkMobile(yzm):Observable<any>{
    let params = new URLSearchParams();
    params.set("userCode",this.sessionStorage.getObject("data").walletCode);
    params.set("captcha",yzm);
    return this.ajax.myPost(Api.checkMobilePwd,params)
  }
  //重置密码第二步 验证银行卡
  public checkBankCard(bankCardId,token,cardNo,idCard):Observable<any>{
    let checkBankCardDTO = {
        "bankCardId": bankCardId,
        "cardNo": cardNo,
        "idCard": idCard,
        "token": token,
        "userCode": this.sessionStorage.getObject("data").walletCode
      }
      console.log(checkBankCardDTO);
    return this.ajax.myPost(Api.checkBankCard,checkBankCardDTO)
  }
  //重置密码第三步 输入修改的密码
  public resetPwd1(pwd,token):Observable<any>{
    let pwds = md5(pwd);
    console.log(pwd);
    console.log(token);
    return this.ajax.myPost(Api.resetPwd1 +'?userCode='+this.sessionStorage.getObject("data").walletCode + '&pwd='+pwds + '&token='+token ,'')
  }
}
