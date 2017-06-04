import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { personalCenterService } from '../personalCenter.service';
import { OrderInfoTermDTO } from './OrderInfoTermDTO';

declare var mui: any;
declare var $: any;
@Component({
  selector: 'app-huwumingxi',
  templateUrl: './huwumingxi.component.html',
  styleUrls: ['./huwumingxi.component.css']

})
export class Huwumingxi implements OnInit{
  public OrderInfoTermDTO: OrderInfoTermDTO;
  public isLoading:boolean;//是否显示加载
  public data=[];//全部
  public dataForPay=[];//待付款
  public pageForPay=1;//待付款
  public dataing=[];//进行中
  public pageDataing=1;//进行中
  public dataFinish=[];//已完成
  public pageFinish=1;//已完成
  public isAll:number;//是不是全部 1全部 2部分
  public isDataForPay:number;//待付款
  public isDataing:number;//进行中
  public isDataFinish:number;//已完成
  public page:number;
  public isShow:boolean;
  public myloading:number;
  public status:number;//订单状态
  public cancelReason:string;//取消原因
  public goodsResidue:string;//剩余货单数
  public node;//元素
  public myOrderNo:string;//主单订单编号
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
    this.OrderInfoTermDTO=new OrderInfoTermDTO();
    this.OrderInfoTermDTO.page =1;
  }
  httpServe(data1,page){
    this.OrderInfoTermDTO.page =page;
    // 货源明细
    this.service.getOrderInfoListByParam(this.OrderInfoTermDTO)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            for(var i=0;i<data.data.length;i++){
              data1.push(data.data[i]);
            }
            if(data1.length==0){
              $("#infoMessage").hide();
              $("#infoNone").show();
            }else{
              $("#infoMessage").show();
              $("#infoNone").hide();
            }
          }
          page=page+1;
        });
  }
  ngOnInit(): void{
    this.titleService.setTitle('货物明细');
    //货物单号
    $("#infoNone").hide();//无信息提示
    //查询司机详情
    this.page=1;
    this.isAll=1;
    this.isShow=false;
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
  //发布货源
  PublicGoods(orderNo){
    this.router.navigateByUrl("deliverGoods/PublicGoods/"+orderNo);
  }
  //全部
  orderStatus(status) {
    this.myloading=status;
    this.OrderInfoTermDTO.status=status;
    this.isAll=1;
    this.httpServe(this.data,this.page);
  }
  //待付款
  orderDataForPay(status) {
    this.myloading=status;
    this.OrderInfoTermDTO.status=status;
    this.isAll=2;
    console.log(status);
    this.isDataForPay=status;
    console.log(this.isDataForPay);
    this.httpServe(this.dataForPay,this.pageForPay);
  }
  //进行中
  orderDataing(status) {
    this.myloading=status;
    this.OrderInfoTermDTO.status=status;
    this.isAll=2;
    console.log(status);
    this.isDataing=status;
    this.httpServe(this.dataing,this.pageDataing);
  }
  //已完成
  orderFinish(status) {
    this.myloading=status;
    this.OrderInfoTermDTO.status=status;
    this.isAll=2;
    console.log(status);
    this.isDataFinish=status;
    this.httpServe(this.dataFinish,this.pageFinish);
  }
  //运费查询
  order() {
    this.router.navigateByUrl("myGoods/Order");

  }
  //货源信息
  sourceInfo(orderNo) {
    console.log(orderNo);
    this.router.navigateByUrl("myGoods/SourceInfo?number="+orderNo);
  }

  //取消原因
  activate(status,orderNo,goodsResidue){
    this.goodsResidue=goodsResidue+"";
    this.myOrderNo=orderNo+"";
    this.node=mui(event.target)[0].parentNode.parentNode;
    mui('#sheet1').popover('toggle');
  }

  //确认取消
  goodsCancle(){
    if(this.isSpecial0){
      this.cancelReason="信息填写错误";
    }else if(this.isSpecial1){
      this.cancelReason="不想发货了";
    }else if(this.isSpecial2){
      this.cancelReason="时间超时";
    }else {
      this.cancelReason="其他原因";
    }
    if(this.isSpecial0||this.isSpecial1||this.isSpecial2||this.isSpecial4){
      ////根据主单编号取消主单剩余货源
      let sheet1=document.getElementById("sheet1");
      sheet1.style.display="none";
      let muiackdrop=document.getElementsByClassName("mui-backdrop")[0];
      let body=document.getElementsByTagName("body")[0];
      body.removeChild(muiackdrop);
      this.service.cancelInfoByMainOrder(this.myOrderNo,this.cancelReason)
          .subscribe(data=>{
            if(data.code==0){//成功
              this.node.remove();
              this.isSpecial0=false;
              this.isSpecial1=false;
              this.isSpecial2=false;
              this.isSpecial3=false;
              this.isSpecial4=false;
              this.isSpecial5=false;
              mui.toast("删除成功",{ duration:'short', type:'div' });
            }
          });
    }else{
      mui.toast("请选择取消原因",{ duration:'short', type:'div' });
    }

  }
  //不取消
  noCancel(){
    this.isShow=false;
  }
  //点击加载更多
  moreInfo(){
    if(this.myloading==1){//待付款
      this.orderDataForPay(1);
      console.log(1);
    }else if(this.myloading==3){//进行中
      this.orderDataing(3);
      console.log(3);
    }else if(this.myloading==5){//已完成
      this.orderFinish(5);
      console.log(5);
    }else{//全部
      this.orderStatus(null);
      console.log(null);
    }
    this.isLoading=true;
    //查询货源列表

  }
  //接单查询
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
  }
  isSpecial0=false;
  isSpecial1=false;
  isSpecial2=false;
  isSpecial3=false;
  isSpecial4=false;
  isSpecial5=false;
  //点击取消
  myGoods_cancle0(info){
    this.isSpecial0=false;
    this.isSpecial1=false;
    this.isSpecial2=false;
    this.isSpecial3=false;
    this.isSpecial4=false;
    this.isSpecial5=false;
    this[info]=true;
    console.log(info)
  }
//取消全部订单
  cancelOrder(info){
    this.isShow=false;
    if(info==0){
    }else{
      this.router.navigateByUrl("myGoods/CancelInfoOrderAll?info="+info+"&orderNo="+this.myOrderNo+"&goodsResidue="+this.goodsResidue);
    }
  }


}
