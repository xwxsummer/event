import { Component,OnInit } from '@angular/core';
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
  public isLoading:boolean;//是否显示加载
  public data=[];
  public page:number;
  public isShow:boolean;
  constructor(
    public router: Router,
     public service : myGoodsService
  ){

  }
  ngOnInit(): void {
    this.page=1;
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
  activate(status){
    //if(status==2){
    //  mui('#sheet1').popover('toggle');
    //  let a=1;
    //  //mui('#sheet1').on('tap','.sureCancle',function(){ console.log(a++) });
    //}else
    if(status==1){
      this.isShow=true;
    }

  }
   //确认取消
  goodsCancle(){

    let sheet1=document.getElementById("sheet1");
    sheet1.style.display="none";
    let muiackdrop=document.getElementsByClassName("mui-backdrop")[0];
    let body=document.getElementsByTagName("body")[0];
    body.removeChild(muiackdrop);
  }

  //不取消
  noCancel(){
    this.isShow=false;
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




}
