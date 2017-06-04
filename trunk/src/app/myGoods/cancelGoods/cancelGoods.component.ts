import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-cancelGoods',
  templateUrl: './cancelGoods.component.html',
  styleUrls: ['./cancelGoods.component.css']

})

export class CancelGoods {
  constructor(
    public router: Router
  ){

  }
  sureCancel(){
    this.router.navigateByUrl("myGoods/CancelGoodsSuccess");

  }









}
