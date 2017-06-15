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
  public dataRefuse=[];//取消原因
  AdditionalTip = [];//取消原因显示
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
    //获取取消原因
    this.service.getSystemLabelByType(2)
        .subscribe(data=>{
          if(data.code==0){//成功
            for(let b=0;b<data.data.length;b++){
              this.AdditionalTip.push(false);
            }
            this.dataRefuse=data.data;
          }
        });
  }
  sureCancel(){
    //this.router.navigateByUrl("myGoods/CancelGoodsSuccess");
   //《货主端》根据子单编号取消子订单, 返回赔偿金额
    if(this.result){
      this.service.orderChildOwnerCancel(this.routeInfo.snapshot.queryParams["childNo"],this.result)
          .subscribe(data=>{
            if(data.code==0){//成功
              this.router.navigateByUrl("myGoods/CancelGoodsSuccess?number="+this.routeInfo.snapshot.queryParams["number"]);
            }
          });
    }else{
      mui.toast("请选择拒绝原因" ,{ duration:'short', type:'div' });
    }
  }
  //点击取消
  myGoods_cancle0(index,result){
    //取消原因清空
    for(let s=0;s<this.AdditionalTip.length;s++){
      this.AdditionalTip[s]=false;
    }
    this.AdditionalTip[index]=true;
    this.result=result;
  }


}
