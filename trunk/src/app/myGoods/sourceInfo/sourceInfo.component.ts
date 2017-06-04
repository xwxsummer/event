import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { myGoodsService } from '../myGoods.service';
declare var mui: any;


@Component({
  selector: 'app-sourceInfo',
  templateUrl: './sourceInfo.component.html',
  styleUrls: ['./sourceInfo.component.css']

})

export class SourceInfo implements OnInit{
  public data;
  market_title="我的货源";
  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
    public service : myGoodsService
  ) {

  }
  ngOnInit(): void{
      //货物单号
        //查询司机详情
    this.service.getOrderInfoByOrderNo(this.routeInfo.snapshot.queryParams["number"])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(this.data);
            }
        }
    );
  }

  //查询订单
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
  }

}
