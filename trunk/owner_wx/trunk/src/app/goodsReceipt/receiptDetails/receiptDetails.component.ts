import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import {goodsReceiptService } from '../goodsReceipt.service'
@Component({
  selector: 'app-receiptDetails',
  templateUrl: './receiptDetails.component.html',
  styleUrls: ['./receiptDetails.component.css']

})

export class ReceiptDetails implements OnInit{
  public data;
  public img = this.data.domain+this.data.headImg
  constructor(
    public router: Router,
    public service: goodsReceiptService,
    public activatedRoute: ActivatedRoute
  ){}
ngOnInit(): void{
      this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log("详细信息")
            console.log(data)
            this.data=data.data;}
        else{
            mui.alert(data.msg)
               }}
         )  
}




}
