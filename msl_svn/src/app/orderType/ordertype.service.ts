import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response,RequestOptions } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import { Api } from '../api'
import { LocalStorage } from '../local_storage';
import { Md5 } from "ts-md5/dist/md5";
import { Ajax } from '../ajax';
declare var mui: any;

@Injectable()
export class ordertypeService {
    handleError: any;
    public local_Storage;
    public userId:string;
    public Contact: object;
    public ajax: Ajax;
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public http:Http
    ){
        this.ajax = new Ajax(this.http);
        this.localStorage =new LocalStorage();
        this.local_Storage=this.localStorage.getObject("data");
    }
    //页面取值
    public getOrderDetailsByChildNo(childNo):Observable<any>{
       // alert(this.local_Storage.userCode)
        return this.ajax.myget(Api.getOrderDetailsByChildNo+"?childNo="+childNo+"&userCode="+ this.local_Storage.walletCode)
            .map((res: Response) => res);
    }
    //确认装车前货主确认车辆信息
    public ownerConfirmTruck(childNo,param):Observable<any>{
        //mui.alert(OrderNo+param);
        //alert(this.local_Storage.userId)
        console.log(childNo)
         return this.ajax.myPut(Api.ownerConfirmTruck+"?userId="+this.local_Storage.userId+"&childNo="+childNo+"&param="+param,"")
        .map((res:Response) => res);
    }
    //货主提交赔偿金
    public compensation(myForm,dedList,data):Observable<any>{
        let orderChildCompensationDTO={
            "compensationRemark": myForm.spk,
            "orderChildCompensationDTOItemList":dedList
            }
    return this.ajax.myPost(Api.compensation+"/"+data.childNo+"?userId="+this.local_Storage.userId,orderChildCompensationDTO);
    }
    //货主修改赔偿金
     public compensationUpdata(myForm,dedList,data):Observable<any>{
        let orderChildCompensationDTO={
            "compensationRemark": myForm.spk,
            "orderChildCompensationDTOItemList":dedList
            }
    return this.ajax.myPut(Api.compensation+"/"+data.childNo+"?userId="+this.local_Storage.userId,orderChildCompensationDTO);
    }  
    //货主确认收货核对重量
    public updateConfirmUnLoadByChildNo1(myForms,imgList,data):Observable<any>{
        let orderChildDTO={
            "childNo": data.childNo,
            "orderNo": data.orderNo,
            "sendRough":myForms.maozhong,
            "sendTare":myForms.pizhong,
            "sendNet":myForms.jingzhong,
            "userId":this.local_Storage.userId,
            "imageList": imgList,
        };
        return this.ajax.myPost(Api.updateConfirmUnLoadByChildNo1,orderChildDTO)
         .map((res:Response) => res);
      }
    //上传图片
    public upBase64Image(base64FileList:any):Observable<any>{
        let type:string = 'order';
        let headers = new Headers();

        this.local_Storage=this.localStorage.getObject("data");
        headers.append("userId",this.local_Storage.userId);
        headers.append("userType","owner");
        headers.append("accessToken",this.local_Storage.accessToken);
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(Api.base64Image,
            `base64FileList=${encodeURIComponent(base64FileList)}&type=${type}`,
            {headers : headers}
            ) .map((res: Response) => res.json());
    }
    //获取司机状态
    public getOrderChildByChildNo(childNo):Observable<any>{
        return this.ajax.myget(Api.getOrderChildByChildNo+"?childNo="+childNo)      
    }
}
