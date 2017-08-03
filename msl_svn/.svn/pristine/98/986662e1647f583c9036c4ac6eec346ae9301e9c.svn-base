import { Component, OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
public money =parseFloat(sessionStorage["money"]) ;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
bank(){

  if(sessionStorage["payType"]==1){
    this.router.navigateByUrl("deliverGoods/PublicGoods/"+JSON.parse(sessionStorage['OrderNo']));
    // sessionStorage.removeItem('payType');
  }else this.router.navigateByUrl("personalCenter/Wallet");

}
}
