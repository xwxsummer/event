import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
    selector: 'app-bank',
    templateUrl: './success.child.html',
    styleUrls: ['./success.child.css']

})


export class SuccessChild implements OnInit {


    constructor(public router:Router) {

    }

    ngOnInit():void {


    }
    //跳回钱包
    Wallet(){
        this.router.navigateByUrl("personalCenter/Wallet");
    }
}

