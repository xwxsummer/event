/**
 * by郭
 *
 * ******/
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;


@Component({
    selector: 'app-cancelGoods',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']


})

export class Success {
    constructor(public router:Router) {

    }
    ngOnInit(){
        console.log('success');
        //$('.mui-backdrop').trigger('tap');
    }

    back(){
        setTimeout(()=>{
            sessionStorage.removeItem('deliverGoodsInfo');
            this.router.navigateByUrl("deliverGoods");

        },200)



    }
    //货源信息
    sourceInfo() {
        //console.log(orderNo);
        this.router.navigateByUrl("myGoods/SourceInfo?number="+sessionStorage["OrderNo"]);
    }
    goBack(){

        setTimeout(()=>{
            sessionStorage.removeItem('deliverGoodsInfo');
            this.router.navigateByUrl("market/MyGoods?info=myGoods");

        },200)
    }
    home(){

        setTimeout(()=>{
            sessionStorage.removeItem('deliverGoodsInfo');
            this.router.navigateByUrl("market/MarketInfo?info=marketInfo");

        },200)
    }
}
