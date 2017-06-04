import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { myGoodsService } from '../myGoods.service';
declare var mui: any;


@Component({
  selector: 'app-cancelGoods',
  templateUrl: './cancelGoods.component.html',
  styleUrls: ['./cancelGoods.component.css']

})

export class CancelGoods implements OnInit{
  public myMoney:string;//赔偿金额
  public result:string;//取消原因
  constructor(
      public router: Router,
      public titleService: Title,
      public routeInfo: ActivatedRoute,//页面传值
      public service : myGoodsService
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('取消货单');
    this.myMoney=this.routeInfo.snapshot.queryParams["money"];
    //this.myMoney=this.routeInfo.snapshot.queryParams["childNo"];
    console.log(this.myMoney);
    //货物单号
  }
  sureCancel(){
    //this.router.navigateByUrl("myGoods/CancelGoodsSuccess");
   //《货主端》根据子单编号取消子订单, 返回赔偿金额
    if(this.result){
      this.service.orderChildOwnerCancel(this.routeInfo.snapshot.queryParams["childNo"],this.result)
          .subscribe(data=>{
            if(data.code==0){//成功
              this.router.navigateByUrl("myGoods/CancelGoodsSuccess");
            }

          });
    }else{
      mui.toast("请选择拒绝原因" ,{ duration:'short', type:'div' });
    }
  }
  isSpecial0=false;
  isSpecial1=false;
  isSpecial2=false;
  isSpecial3=false;
  //点击取消
  myGoods_cancle0(info,result){
    this.isSpecial0=false;
    this.isSpecial1=false;
    this.isSpecial2=false;
    this.isSpecial3=false;
    this[info]=true;
    this.result=result;
  }


}
