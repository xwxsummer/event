import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { personalCenterService } from '../personalCenter.service';
import { orderChildTermDTO } from './orderChildTermDTO';
declare var mui: any;
@Component({
  selector: 'app-huwumingxi',
  templateUrl: './receiveHistory.component.html',
  styleUrls: ['./receiveHistory.component.css']
})

export class ReceiveHistory implements OnInit{
  public orderChildTermDTO: orderChildTermDTO;
  public isLoading:boolean;//是否显示加载
  public data=[];//全部
  public dataForPay=[];//待收货
  public pageForPay=1;//待收货
  public dataing=[];//已收货
  public pageDataing=1;//已收货
  public dataFinish=[];//协商中
  public pageFinish=1;//已完成
  public isAll:number;//是不是全部 1全部 2部分
  public isDataForPay:number;//待收货
  public isDataing:number;//进行中
  public isDataFinish:number;//已完成
  public page:number;
  public myloading:number;
  public status:number;//订单状态

  constructor(
    public router: Router,
    public service : personalCenterService
  ){
    this.orderChildTermDTO=new orderChildTermDTO();
    this.orderChildTermDTO.receiveId=123;
    this.orderChildTermDTO.page =1;
  }
  httpServe(data1,page){
    this.orderChildTermDTO.page =page;
    //查询货源列表
    this.service.getOrderChildListByParam(this.orderChildTermDTO)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            for(var i=0;i<data.data.length;i++){
              data1.push(data.data[i]);
            }
          }
          page=page+1;
        });
  }
  ngOnInit(): void{
    //货物单号
    //查询司机详情
    this.page=1;
    this.isAll=1;
    this.isLoading=false;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.httpServe(this.data,this.page);
  }
//充值运费
  prePaidFreight() {
    this.router.navigateByUrl("myGoods/PrepaidFreight");

  }
  //全部
  orderStatus(status) {
    this.myloading=status;
    this.orderChildTermDTO.status=status;
    this.isAll=1;
    this.httpServe(this.data,this.page);
  }
  //待收货
  orderDataForPay(status) {
    this.myloading=status;
    this.orderChildTermDTO.status=status;
    this.isAll=2;
    this.isDataForPay=status;
    this.httpServe(this.dataForPay,this.pageForPay);
  }
  //进行中
  orderDataing(status) {
    this.myloading=status;
    this.orderChildTermDTO.status=status;
    this.isAll=2;
    this.isDataing=status;
    this.httpServe(this.dataing,this.pageDataing);
  }
  //已完成
  orderFinish(status) {
    this.myloading=status;
    this.orderChildTermDTO.status=status;
    this.isAll=2;
    this.isDataFinish=status;
    this.httpServe(this.dataFinish,this.pageFinish);
  }
  //运费查询
  //点击加载更多
  moreInfo(){
    if(this.myloading==105){//待收货
      this.orderDataForPay(105);
    }else if(this.myloading==106){//已收货
      this.orderDataing(106);
    }else if(this.myloading==104){//协商中
      this.orderFinish(104);
    }else{//全部
      this.orderStatus(null);
    }
    this.isLoading=true;
    //查询货源列表
  }
  order() {
    this.router.navigateByUrl("myGoods/Order");

  }
//货源信息
  sourceInfo(orderNo) {
    console.log(orderNo);
    this.router.navigateByUrl("myGoods/SourceInfo?number="+orderNo);
  }
  //货源信息
  receiptDetails() {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails");
  }


}
