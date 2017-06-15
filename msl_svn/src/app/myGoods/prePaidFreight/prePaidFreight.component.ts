import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-prePaidFreight',
  templateUrl: './prePaidFreight.component.html',
  styleUrls: ['./prePaidFreight.component.css']


})

export class PrePaidFreight {
  market_title="我的货源";
  constructor(
    public router: Router
  ){

  }
  payMoney(){
    this.router.navigateByUrl("personalCenter/Recharge");
  }


}
