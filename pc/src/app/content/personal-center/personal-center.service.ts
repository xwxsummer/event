import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Api } from "app/api";
import { Ajax } from "app/ajax";
import { SessionStorage } from "app/fragment/session_storage";
import { Observable } from 'rxjs';

@Injectable()
export class PersonalCenterService {
  constructor(
    public sessionStorage: SessionStorage,
    public ajax: Ajax
  ) {
  }
  //查询个人信息
  public personalCenterInfo(): Observable<any> {
    return this.ajax.myget(Api.myself + '?userId=' + this.sessionStorage.getObject("data").userId);

  }
  //添加收/发货地址
  public addAddress(address): Observable<any> {
    address.userId = JSON.parse(sessionStorage["data"]).userId;
    return this.ajax.myPost(Api.putAddres, address);
  }
  //查询收/发货地址
  public addressFindList(type): Observable<any> {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    //  console.log(JSON.parse(sessionStorage["data"]).mobile);
    console.log(userId);
    //  let params = new URLSearchParams();
    //  params.set("userId","67");
    //  params.set("type",type);  //type 1发货   type 2收获
    return this.ajax.myget(Api.addreFindList + "?userId=" + userId + "&type=" + type)
  }
  //删除收/发货地址
  public deleteAddress(id): Observable<any> {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    return this.ajax.myDelete(Api.deleteAddres + "?userId=" + userId + "&id=" + id);
  }

  //修改收/发货地址
  public putAddress(address): Observable<any> {
    return this.ajax.myPut(Api.putAddres, address);
  }

  //设置默认收/发货地址
  public addressSetDefault(id, type): Observable<any> {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    let params = new URLSearchParams();
    params.set("userId", userId);
    params.set("id", id);//地址ID
    params.set("type", type);  //1发货  2收货
    return this.ajax.myPut(Api.addreSetDefault, params);

  }



}
