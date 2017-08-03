import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { myGoodsService } from '../myGoods.service';
import { cancelOrderInfo } from '../fragment/cancelOrderInfo';

declare var mui: any;
declare var $ : any;
@Component({
  selector: 'app-sourceInfo',
  templateUrl: './sourceInfo.component.html',
  styleUrls: ['./sourceInfo.component.css','../myGoods.component.css']
})

export class SourceInfo implements OnInit{
  public data;
  market_title="我的货源";
  public cancelReason:string;//取消原因
  public myOrderNo:string;//主单订单编号
  public goodsResidue:string;//剩余单数
  public dataRefuse=[];//取消原因
  public isShow:boolean;
  public orderType;
  AdditionalTip = [false,false,false,false];//取消原因
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo: ActivatedRoute,//页面传值
    public service : myGoodsService
  ) {

  }
  //截取金额
  fmoney(s:any, n?:number) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
  ngOnInit(): void{
        //查询司机详情
    this.isShow=false;
    this.titleService.setTitle('货源信息');
    this.service.getOrderInfoByOrderNo(this.routeInfo.snapshot.queryParams["number"])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            this.data.freightPrice=this.data.freightPrice.toFixed(2);

            }
        }
    );
    //获取取消原因
    this.service.getSystemLabelByType(2)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.dataRefuse=data.data;
          }
        });
  }
  //取消原因清空
  clearResult(){
    for(let s=0;s<this.AdditionalTip.length;s++){
      this.AdditionalTip[s]=false;
    }
  }
  //取消原因
  activate(status,orderNo,goodsResidue,orderType){
    this.myOrderNo=orderNo+"";
    this.goodsResidue=goodsResidue+"";//剩余单数
    this.orderType=orderType+"";
    if(status==1||status==2){
      mui('#sheet1').popover('toggle');
    }else if(status==10){
      this.isShow=true;
    }
  }
  //发布货源
  PublicGoods(orderNo){
    this.router.navigateByUrl("deliverGoods/PublicGoods/"+orderNo);
  }
  //点击取消
  goodsRefuse(){
    mui('#sheet1').popover('hide');
    this.clearResult();
    this.cancelReason="";
  }
  //点击取消原因
  myGoods_cancle0(index,refuseName){
    this.cancelReason=refuseName;
    console.log(refuseName);
    this.clearResult();//取消原因清空
    this.AdditionalTip[index]=true;
  }
  //确认取消
  goodsCancle(){
    if(this.cancelReason){
      this.clearResult();
      this.service.cancelInfoByMainOrder(this.myOrderNo,this.cancelReason)
          .subscribe(data=>{
            if(data.code==0){//成功
              this.clearResult();
              mui.toast("取消成功",{ duration:'short', type:'div' });
              this.router.navigateByUrl("/market/MyGoods?info=myGoods");
            }
          });
      this.goodsRefuse();
    }else{
      mui.toast("请选择取消原因",{ duration:'short', type:'div' });
    }

  }
  //查询订单
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
  }

  //取消全部订单和剩余货单
  cancelOrder(info){
    this.isShow=false;
    if(info==0){
    }else if(info==1){
       this.router.navigateByUrl("myGoods/CancelInfoOrderAll?info="+info+"&orderNo="+this.myOrderNo+"&goodsResidue="+this.goodsResidue+"&orderType="+this.orderType);
    }
    else if(info==3){
      this.service.compensationInfoByMainOrder(this.myOrderNo)
          .subscribe(data=>{
              if(data.code==0){//成功
                  this.router.navigateByUrl("myGoods/CancelInfoOrderAll?info="+info+"&orderNo="+this.myOrderNo+"&goodsResidue="+this.goodsResidue+"&orderType="+this.orderType);
                }else{
                  mui.toast(data.msg ,{ duration:'short', type:'div' });
                  this.router.navigateByUrl("myGoods/SourceInfo?number="+this.myOrderNo);//跳到详情页面
              }
          });
    }
  }
  //返回上一页
  goBack(){
    window.history.go(-1);
  }
  //返回主页
  goHome(){
    sessionStorage.removeItem('deliverGoodsInfo');
    this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
  }
}
