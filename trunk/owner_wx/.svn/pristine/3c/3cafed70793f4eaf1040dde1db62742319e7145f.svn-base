import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { myGoodsService } from './myGoods.service';
declare var mui: any;
declare var $ : any;


@Component({
  selector: 'app-myGoods',
  templateUrl: './myGoods.component.html',
  styleUrls: ['./myGoods.component.css'],
  providers:[ myGoodsService ]

})
export class MyGoods implements OnInit{
  market_title="我的货源";
  public node;//元素
  public isLoading:boolean;//是否显示加载
  public myOrderNo:string;//主单订单编号
  public cancelReason:string;//取消原因
  public goodsResidue:string;//剩余货单数
  public data=[];
  public page:number;
  public isShow:boolean;
  constructor(
    public router: Router,
    public titleService: Title,
     public service : myGoodsService
  ){

  }
  ngOnInit(): void {
    this.titleService.setTitle('我的货源');
    this.page=1;
    this.myOrderNo="";
    this.isShow=false;
    this.isLoading=false;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //查询货源列表
    this.service.getOrderInfo(this.page)
        .subscribe(data=>{
          if(data.code==0){//成功
              this.data=data.data;
            for(let i=0;i<this.data.length;i++){
              this.data[i].freightPrice=this.data[i].freightPrice.toFixed(2);
            }
              console.log(data);
        }
          this.page=this.page+1;
        });

  }
  //充值运费
  prePaidFreight(){
    this.router.navigateByUrl("myGoods/PrepaidFreight");
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
    if(status==2){
        mui('#sheet1').popover('toggle');
    }else if(status==10){
      this.isShow=true;
    }
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

   //点击加载更多
  moreInfo(){
    this.isLoading=true;
    //查询货源列表
    this.service.getOrderInfo(this.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            for(var i=0;i<data.data.length;i++){
              this.data.push(data.data[i]);
            }
          }
          this.page=this.page+1;
        });
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
