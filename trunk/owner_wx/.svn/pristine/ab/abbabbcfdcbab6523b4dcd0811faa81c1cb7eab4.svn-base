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
export class confirmGoodsService {
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
    public getOrderDetailsByChildNo(childNo):Observable<any>{
        return this.ajax.myget(Api.getOrderDetailsByChildNo+"?childNo="+childNo+"&userCode="+ this.local_Storage.walletCode)     
    }
    public getOrderChildByChildNo(childNo):Observable<any>{
        return this.ajax.myget(Api.getOrderDetailsByChildNo+"?childNo="+childNo)      
    }
     //确认收货前，货主确认车辆信息
    public ownerConfirmTruck(OrderNo,param):Observable<any>{
        //mui.alert(OrderNo+param);
        // alert(this.local_Storage.userId)
         return this.ajax.myPut(Api.ownerConfirmTruck+"?userId="+this.local_Storage.userId+"&childNo="+OrderNo+"&param="+param,"")
        .map((res:Response) => res);
    }
      //货主确认收货核对重量
    public updateConfirmUnLoadByChildNo(myForms,imgList,data):Observable<any>{
        let orderChildDTO={
            "childNo": data.childNo,
            "orderNo": data.orderNo,
            "receiveRough":myForms.maozhong,
            "receiveTare":myForms.pizhong,
            "receiveNet":myForms.jingzhong,
            "userId":this.local_Storage.userId,
            "imageList": imgList,
        };
        return this.ajax.myPost(Api.updateConfirmUnLoadByChildNo,orderChildDTO)
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
    //提交异常原因
    public exception(myForms,imgList,data):Observable<any>{
        let body = JSON.stringify(myForms);
        let orderChildExceptionExceptionDTO = {
              "childNo": data.childNo,
              "compensationFee": 0,
              "fromBy": this.local_Storage.userId,
              "fromName": this.local_Storage.name,
              "fromPhone": this.local_Storage.mobile,
              "fromType": 1,
              "imageList": imgList,
              "reason": myForms.speaks,
        };
        return this.ajax.myPost(Api.exception,orderChildExceptionExceptionDTO) 
                .map((res: Response) => res);
      }   
    //货主提交评价
    public submitOwnerEvaluate(forms,arr,data,type,time):Observable<any>{
        console.log(arr)
        let att= JSON.parse(arr)
        let evaluateDTO={
              "comment": forms,
              "evaluateLabelDTOList":att,
              "fromId": data.driverId ,
              "headImg": data.headImg ,
              "labelNumDTOList": [{}],
              "mobile": this.local_Storage.fromPhone,
              "orderNo": data.orderNo,
              "time": time,
              "type": type,
              "userId": this.local_Storage.userId,
              "userName": this.local_Storage.name
        };
        //this.local_Storage.name  this.local_Storage.fromPhone
        return this.ajax.myPost(Api.submitOwnerEvaluate,evaluateDTO)
                
    }
       //上传图片
    public upBase64Image(base64FileList:any):Observable<any>{
        let type:string = 'order';
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(Api.base64Image,
            `base64FileList=${encodeURIComponent(base64FileList)}&type=${type}`,
            {headers : headers}
            ) .map((res: Response) => res.json());
    }
}
