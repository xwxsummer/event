import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { myGoodsService } from '../myGoods.service';
declare var mui: any;


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']

})

export class Order implements OnInit{
  public data;
  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
    public service : myGoodsService
  ){

  }
  ngOnInit(): void{
    //货物单号
    //查询司机详情
    this.service.getOrderChildListByParam(this.routeInfo.snapshot.queryParams["number"])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data);
          }
        }
    );
  }
//我的收货详情
  sourceInfo() {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails");
  }
  activate(){
    mui('#sheet1').popover('toggle');

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
