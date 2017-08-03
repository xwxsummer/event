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
export class saoyisaoService {
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
    //扫一扫进入页面取值 判断
    public getOrderByChildNo(childNo):Observable<any>{
       // alert(this.local_Storage.userCode)
        return this.ajax.myget(Api.getOrderByChildNo+"?childNo="+childNo+"&userId="+ this.local_Storage.userId)
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
    //确认装车信息
    public updateConfirmLoadByChildNo(myForms,pushImg,data):Observable<any>{
      let orderInfoDTO={      
          "childNo": data.childNo,
          "orderNo": data.orderNo,
          "ownerRemark": myForms.beizhu,
          "sendNet": myForms.jingzhong,
          "sendRough": myForms.maozhong,
          "sendTare": myForms.pizhong,
          "userId":this.local_Storage.userId,
           "imageList": pushImg
        }
        return this.ajax.myPost(Api.updateConfirmLoadByChildNo,orderInfoDTO)
                        .map((res:Response)=>res);
    }
    //获取订单状态http://47.92.136.150:8101/order-service/order/child/getStatusByChildNo?childNo=12017051039071631
    public getStatusByChildNo(childNo):Observable<any>{
        return this.ajax.myget(Api.getStatusByChildNo+"?childNo="+childNo)
            .map((res: Response) => res);
    }
    //提交拒绝原因
     public refuseLoad(pushImg,remark,childNo):Observable<any>{
       
         let orderImageListDTO= {
            //   "domain": "http://clx-dev.oss-cn-beijing.aliyuncs.com",
              "imageList":pushImg,
              "number": childNo,
              "remark": remark
            }
        return this.ajax.myPut(Api.refuseLoad,orderImageListDTO)
                        .map((res:Response)=>res);
    }
    //查看拒绝原因
    public getCancelReasonByChildNo(childNo):Observable<any>{
         return this.ajax.myget(Api.getCancelReasonByChildNo+"?childNo="+childNo)
            .map((res: Response) => res);
    }

    //上传图片
    public upBase64Image(base64FileList:any):Observable<any>{
        let type:string = 'order';
        let headers = new Headers();
        headers.append("userId",this.local_Storage.userId);
        headers.append("userType","owner");
        headers.append("accessToken",this.local_Storage.accessToken);
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(Api.base64Image,
            `base64FileList=${encodeURIComponent(base64FileList)}&type=${type}`,
            {headers : headers}
            ) .map((res: Response) => res.json());
    }
}
