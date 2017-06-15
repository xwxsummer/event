import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
@Component({
    selector: 'app-bank',
    templateUrl: './success.child.html',
    styleUrls: ['./success.child.css']
})

export class SuccessChild implements OnInit {
    public money:string;//金额
    //this.type=this.routeInfo.snapshot.queryParams["type"];//收发货
    //
    constructor(
        public router:Router,
        public routeInfo:ActivatedRoute//页面间传值
    ) {

    }

    ngOnInit():void {
        this.money=this.routeInfo.snapshot.queryParams["money"];
        console.log(this.money);
        console.log(typeof this.money);

    }
    //跳回钱包
    Wallet(){
        this.router.navigateByUrl("personalCenter/Wallet");
    }
}

