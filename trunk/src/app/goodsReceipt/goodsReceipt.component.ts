import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {goodsReceiptService } from './goodsReceipt.service'

declare var mui: any;


@Component({
  selector: 'app-GoodsReceipt',
  templateUrl: './goodsReceipt.component.html',
  styleUrls: ['./goodsReceipt.component.css'],
  providers:[goodsReceiptService]
})

export class GoodsReceipt{
  market_title="我的货源";
  public infos:any;

  constructor(
    public router: Router,
    public service:goodsReceiptService
  ){}

  goodsDetails(){
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails");

  }

  ngOnInit(){

    this.service.getOrderInfoById(63)
        // .then(data=>data.json().data)
        .then(data=>data.data)
        .then(data=>this.infos = data)
        .then(data=>console.log(data));
  }



}
