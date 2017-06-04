/**
 * by郭
 *
 * ******/
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
    selector: 'app-cancelGoods',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']


})

export class Success {
    constructor(public router:Router) {

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
}
