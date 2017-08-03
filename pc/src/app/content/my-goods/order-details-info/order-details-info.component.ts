import {Router, ActivatedRoute} from '@angular/router';
import {MyGoodsService} from '../my-goods.service';
import { Component, OnInit } from '@angular/core';
declare var layui:any;
declare var layer:any;
declare var $:any;

@Component({
  selector: 'app-order-details-info',
  templateUrl: './order-details-info.component.html',
  styleUrls: ['./order-details-info.component.css']
})
export class OrderDetailsInfoComponent implements OnInit {
  public data;
  public dbState;

  public isLoading:boolean;//是否显示加载
  public page:number;
  public noneIfno:number;
  public loadingMore:string;//正在加载
  public isShow:boolean;
  public status:number;//订单状态
  public cancelReason:string;//取消原因
  public goodsResidue:string;//剩余货单数
  public node;//元素
  public myOrderNo:string;//主单订单编号
  tablecontent=[false,false,false,false];
  AdditionalTip = [];//取消原因显示
  public dataRefuse=[];//取消原因
  contents=[];

  constructor(
    public activatedRoute:ActivatedRoute,
    public service:MyGoodsService,
    public router:Router
  ) { }
  
    showBg() { 
      var bh = $("body").height(); 
      var bw = $("body").width(); 
      $("#fullbg").css({ 
      height:bh, 
      width:bw, 
      display:"block" 
      }); 
    $("#dialog").show(); 
      } 
      //关闭灰色 jQuery 遮罩 
      closeBg() { 
      $("#fullbg,#dialog").hide(); 
    } 
  
  ngOnInit() {
    //获取取消原因
    this.service.getSystemLabelByType(2)
        .subscribe(data=>{
          if(data.code==0){//成功
            for(let b=0;b<data.data.length;b++){
              this.AdditionalTip.push(false);
            }
            this.dataRefuse=data.data;
          }else{
             alert(data.msg);
          }
        });
     //《货主端》根据子单编号取消子订单, 返回赔偿金额
      // this.service.orderChildOwnerCancel(this.routeInfo.snapshot.queryParams["childNo"],this.result)
      //     .subscribe(data=>{
      //       if(data.code==0){//成功
      //         this.router.navigateByUrl("myGoods/CancelGoodsSuccess?number="+this.routeInfo.snapshot.queryParams["number"]);
      //       }
      //     });
      this.service.getOrderInfoByOrderNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data.data);
            if(data.data.insuranceFee) {
                this.dbState = "已担保";
           }else{
             this.dbState = "未担保";
           }
          }
        else{
            alert(data.msg)
               }}
         ) 
  }
 //接单查询
  OrderQuery(number){
    this.router.navigateByUrl("content/myGoods/orderQuery/"+number);
  }
  //点击描述
    AdditionalTip_click(info){
        switch(this.AdditionalTip[info]){
          case true:
            this.AdditionalTip[info] = false;
            break;
          case false:
           //如果被激活的大于1个不操作
        if( this.AdditionalTip.filter(i=>i === true).length >= 1 )break;
            this.AdditionalTip[info]=true;  
        }
    }
    goodsCancle(orderNo){
      let label = Array.from(document.querySelectorAll('.special') as NodeListOf<HTMLElement>).map(i=>i.innerText)
      console.log(label);
      if(label){
       this.service.cancelInfoByMainOrder(orderNo,label)
          .subscribe(data=>{
            if(data.code==0){//成功
              layer.msg("取消成功");
              this.closeBg();
              this.router.navigateByUrl("content/myGoods/invoiceDetails/107");
            }else{
              layer.msg(data.msg)
            }
          });
      }else{
        layer.msg("请选择取消原因");
      }
    }
  //发布
  pay(orderNo){
    this.router.navigateByUrl("content/myGoods/pay/"+orderNo);
  }
  //返回
  back(){
    window.history.go(-1);
    //this.router.navigateByUrl("content/myGoods/invoiceDetails/107");
    }
}
 