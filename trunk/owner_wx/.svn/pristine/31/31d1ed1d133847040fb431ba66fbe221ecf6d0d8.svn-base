import 'rxjs/Rx'
import { Component,OnInit } from "@angular/core";
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//import {Jsonp, URLSearchParams} from 'angular2/http';
//http
import { marketService } from  './market.service';
import { Title } from '@angular/platform-browser';

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
    public certifi:string;//判断是否认证 1 没有认证 2审核中
    public isShow:boolean;//层显示
    public info:string;//显示哪个界面
    public message:string;//显示内容

    constructor(
        public router: Router,
        public routeInfo: ActivatedRoute,//页面传值
        public service : marketService,
        public titleService: Title
    ){

    }
    //验证手机号码
    checkPhone(checking,myFont){
                    if(sessionStorage['authed']==0){//尚未审核
                        this.message="尚未审核，请审核";
                        this.isShow=true;
                    }else if(sessionStorage['authed']==1){//审核失败
                        this.message="审核失败，请重新审核";
                        this.isShow=true;
                    }else if(sessionStorage['authed']==2){//审核通过
                        this.router.navigateByUrl(checking);
                        this.changeFont(myFont);
                    }else if(sessionStorage['authed']==3){//审核中
                        console.log(555555);
                        mui.toast('审核中，请等待',{ duration:'short', type:'div' });
                    }
    }
    ngOnInit(): void{
        this.titleService.setTitle('市场信息');
        this.marketInfo="changeFont";
        this.message="";
        this.isShow=false;
        if(this.routeInfo.snapshot.queryParams["info"]){
            this.changeFont(this.routeInfo.snapshot.queryParams["info"]);
        }
        if(sessionStorage['authed']==2){//判断有没有存anthed
            console.log(7777);
        }else{
            this.service.checkMobile()
                .subscribe(
                    data => {
                    if(data.code==0){
                        sessionStorage['authed']=data.data.authed;
                        console.log(sessionStorage['authed'])
                    }
                }
            );
        }

    }
    //点击字体变大
    changeFont (info){
        this.marketInfo="";
        this.myGoods="";
        this.goodsReceipt="";
        this.personalCenter="";
        this[info]="changeFont";
        console.log(this[info]);
    }

    //市场信息
    MarketInfo (info){
        this.changeFont("marketInfo");
        this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
    //我的货源
    MyGoods (info){
        this.checkPhone("market/MyGoods?info=myGoods","myGoods");
    }
    //我的收货
    GoodsReceipt (info){
        this.checkPhone("market/GoodsReceipt?info=goodsReceipt","goodsReceipt");
    }
    //个人中心
    PersonalCenter (info){
        this.changeFont("personalCenter");
        this.router.navigateByUrl("market/PersonalCenter?info=personalCenter");
    }
    //跳到发布货源
    toDeliverGoods(){
        this.checkPhone("deliverGoods","");
    }


    //取消认证
    isCancel(){
        this.isShow=false;
    }
    //去认证
    myShow(){
        this.isShow=false;
        this.router.navigateByUrl("certification");
    }

}
