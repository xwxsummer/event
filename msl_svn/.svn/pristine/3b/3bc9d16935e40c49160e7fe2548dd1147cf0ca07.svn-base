import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title }from '@angular/platform-browser';
declare var mui: any;
@Component({
    selector: 'app-recharge',
    templateUrl: './recharge.component.html',
    styleUrls: ['./recharge.component.css']

})
export class Recharge implements OnInit {
    public myMoeny:number;
    constructor(
        public router:Router,
        public titleService: Title
    ) {
    }
    ngOnInit():void {
        this.titleService.setTitle('充值');
    }
    bank(){
        this.router.navigateByUrl("personalCenter/Bank");
    }
    SuccessChild(){
        if(this.myMoeny){
            this.router.navigateByUrl("personalCenter/SuccessChild?money="+this.myMoeny);
        }else{
            mui.toast('请输入金额');
        }
    }
}