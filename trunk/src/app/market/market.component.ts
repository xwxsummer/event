import 'rxjs/Rx'
import { Component,OnInit } from "@angular/core";
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//import {Jsonp, URLSearchParams} from 'angular2/http';
//http
import { marketService } from  './market.service';

declare var mui: any;
@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css'],
    providers:[ marketService ]

})

export class Market implements OnInit{
    public marketInfo:string;
    public myGoods:string;
    public goodsReceipt:string;
    public personalCenter:string;
    constructor(
        public router: Router,
        public service : marketService
    ){

    }
    ngOnInit(): void{
        this.marketInfo="changeFont";
    }
    //点击字体变大
    changeFont (info){
        this.marketInfo="";
        this.myGoods="";
        this.goodsReceipt="";
        this.personalCenter="";
        this[info]="changeFont";
    }

    //市场信息
    MarketInfo (info){
        this.changeFont(info);
    }
    //我的货源
    MyGoods (info){
        this.changeFont(info);
    }
    //我的收货
    GoodsReceipt (info){
        this.changeFont(info);
    }
    //个人中心
    PersonalCenter (info){
        this.changeFont(info);
    }


    //跳到发布货源
    toDeliverGoods(){
        this.router.navigateByUrl("deliverGoods");

    }

}
