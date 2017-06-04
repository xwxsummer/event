import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-cancelGoods',
  templateUrl: './cancelGoodsSuccess.component.html',
  styleUrls: ['./cancelGoodsSuccess.component.css']

})

export class CancelGoodsSuccess {
  constructor(
    public router: Router
  ){

  }
  //跳到我的货源
  toMyGoods(){
    this.router.navigateByUrl("market/MyGoods");

  }
  //跳到发布货源
  toDeliverGoods(){
    this.router.navigateByUrl("deliverGoods");

  }


}
