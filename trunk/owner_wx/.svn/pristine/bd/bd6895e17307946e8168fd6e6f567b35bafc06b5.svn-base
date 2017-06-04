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
  public isShow:boolean;
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


      //货物单号
        //查询司机详情
    this.isShow=false;
    this.titleService.setTitle('货源信息');
    this.service.getOrderInfoByOrderNo(this.routeInfo.snapshot.queryParams["number"])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            this.data.freightPrice=this.data.freightPrice.toFixed(2);

            console.log(this.data);
            }
        }
    );
  }
  //取消原因
  activate(status,orderNo,goodsResidue){
    this.myOrderNo=orderNo+"";
    this.goodsResidue=goodsResidue+"";
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
    console.log(info);
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
      //根据主单编号取消主单剩余货源
      let sheet1=document.getElementById("sheet1");
      sheet1.style.display="none";
      let muiackdrop=document.getElementsByClassName("mui-backdrop")[0];
      let body=document.getElementsByTagName("body")[0];
      body.removeChild(muiackdrop);
      this.service.cancelInfoByMainOrder(this.myOrderNo,this.cancelReason)
          .subscribe(data=>{
            if(data.code==0){//成功
              mui.toast("删除成功",{ duration:'short', type:'div' });
              this.router.navigateByUrl("/market/MyGoods");
            }
          });
    }else{
      mui.toast("请选择取消原因",{ duration:'short', type:'div' });
    }

  }
  //查询订单
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
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
