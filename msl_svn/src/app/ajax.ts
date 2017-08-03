import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { LocalStorage } from './local_storage';

declare var mui:any;
declare var $:any;

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
        this.headers.append("userType","owner");
        this.headers.append("accessToken",this.local_Storage.accessToken);
    }


    // get
    public myget(url:string):Observable<any>{
        //return this.showLoading(this.http.get(url,{headers:this.headers})).map((res: Response) => res.json());
        return this.http.get(url,{headers:this.headers}).map((res: Response) => res.json());
    }
    // post
    public myPost(url:string,params):Observable<any>{
   
        return this.http.post(url,params,{headers:this.headers}).map((res: Response) => res.json());

        //return this.showLoading(this.http.post(url,params,{headers:this.headers})).map((res: Response) => res.json());

    }
     // put
    public myPut(url:string,params):Observable<any>{
        //return this.showLoading( this.http.put(url,params,{headers:this.headers}) ).map((res: Response) => res.json());
        return this.http.put(url,params,{headers:this.headers}).map((res: Response) => res.json());
    }
    // delete
    public myDelete(url:string):Observable<any>{

        //return this.showLoading( this.http.delete(url,{headers:this.headers}) ).map((res: Response) => res.json());
        return this.http.delete(url,{headers:this.headers}).map((res: Response) => res.json());
    }
}
