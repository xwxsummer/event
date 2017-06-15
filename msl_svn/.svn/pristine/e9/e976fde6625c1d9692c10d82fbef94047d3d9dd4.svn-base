import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-cancelGoods',
  templateUrl: './cancelGoodsSuccess.component.html',
  styleUrls: ['./cancelGoodsSuccess.component.css']

})

export class CancelGoodsSuccess implements OnInit{
  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
    public titleService: Title
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('取消货单');

  }
  //跳到我的货源
  toMyGoods(){
    this.router.navigateByUrl("market/MyGoods?info=myGoods");

  }
  //跳到订单详情
  toOrder(){
    this.router.navigateByUrl("myGoods/Order?number="+this.routeInfo.snapshot.queryParams["number"]);

  }


}
