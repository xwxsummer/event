/**
 * Created by Administrator on 2017/5/2 0002.
 */
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
//本地缓存
import { LocalStorage } from './local_storage';
export class Ajax{
    local_Storage:any;
    headers:Headers;
    public localStorage:LocalStorage;
    constructor(
        public http:Http
    ){
        this.localStorage =new LocalStorage();
        this.headers = new Headers();
        this.local_Storage=this.localStorage.getObject("data");
        this.headers.append("userId",this.local_Storage.userId);
        this.headers.append("accessToken",this.local_Storage.accessToken);
    }
    //参数拼接到后面的形式 get
    public myget(url:string):Observable<any>{
        return this.http.get(url,{headers:this.headers}).map((res: Response) => res.json());
    }

    //参数拼接到后面的形式 get
    //public myget11(url:string):Observable<any>{
    //    return this.http.get(url,{headers:this.headers}).map((res: Response) => res.json());
    //}


    //参数parmarse post
    public myPost(url:string,params):Observable<any>{
        return this.http.post(url,params,{headers:this.headers}).map((res: Response) => res.json());
    }
     // put
    public myPut(url:string,params):Observable<any>{
        return this.http.put(url,params,{headers:this.headers}).map((res: Response) => res.json());
    }
    // delete
    public myDelete(url:string):Observable<any>{
        return this.http.delete(url,{headers:this.headers}).map((res: Response) => res.json());
    }
    //public mypost1(url:string,params):Observable<any>{
    //    return this.http.post(url,{headers:this.headers},params);
    //}
}