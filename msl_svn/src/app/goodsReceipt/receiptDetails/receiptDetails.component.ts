import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import {goodsReceiptService } from '../goodsReceipt.service'
@Component({
  selector: 'app-receiptDetails',
  templateUrl: './receiptDetails.component.html',
  styleUrls: ['./receiptDetails.component.css']

})

export class ReceiptDetails implements OnInit{
  public data;
  public isJudge:boolean;
  constructor(
    public router: Router,
    public service: goodsReceiptService,
    public activatedRoute: ActivatedRoute
  ){}
ngOnInit(): void{
       this.isJudge=false;
      // alert(this.activatedRoute.snapshot.params['id'])
      this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
              console.log(data.data);
              // if(this.data.headImg){
              //     this.data.headImg=this.data.domain+this.data.headImg;
              // }
              if(this.data.status==102){
                    this.isJudge=true;
              }
              if(this.data.driverEvaluate!=1&&this.data.status==151){
                    this.isJudge=true;
              }
          }
        else{
            mui.alert(data.msg)
               }}
         )  
}
    Evaluation(){
         this.router.navigateByUrl("confirmGoods/SuccessGoods/"+this.activatedRoute.snapshot.params['id']);
    }
    //返回上一页
    goBack(){
        window.history.go(-1);
    }
    //返回主页
    goHome(){
        this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
    //确认收货
    Confirm(){
      this.router.navigateByUrl("confirmGoods/ReceivingConfirm/"+this.activatedRoute.snapshot.params['id']);
    }
    //打电话
    call(phoneNumber){
      window.open('tel:'+phoneNumber);
    }
  //查看明细
     SuccessGoods() {
      this.router.navigateByUrl("confirmGoods/DetailsPage/"+this.activatedRoute.snapshot.params['id']);
    }
  //协商详情
    NegotiateDetails(){
       this.router.navigateByUrl("confirmGoods/NegotiateDetails/"+this.activatedRoute.snapshot.params['id']);
    }
  //查看评价
     EvaluationDetails(){
    this.router.navigateByUrl("confirmGoods/EvaluationDetails/"+this.activatedRoute.snapshot.params['id']+"?driverId="+this.data.driverId)
  }
  //拒绝装车原因
  RefuseResults() {
    this.router.navigateByUrl("saoYiSao/RefuseResult/"+this.activatedRoute.snapshot.params['id']);
  }
 //轨迹查询
  maps(childNo){
     this.router.navigateByUrl("trajectoryMap/"+this.activatedRoute.snapshot.params['id']);
  }
  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }
}
