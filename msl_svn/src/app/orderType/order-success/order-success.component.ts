import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {ordertypeService} from '../ordertype.service';
declare var mui: any;


@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit{
  public data: any;
  public submitlag: boolean;
  public status;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service: ordertypeService
  ){}
  ngOnInit(): void{
    this.submitlag=false;//初始化为可以点击
    this.titleService.setTitle('提交成功');
    this.service.getOrderChildByChildNo(this.activatedRoute.snapshot.params['id'])
      .subscribe(data => {
          if(data.code==0){
            this.data=data.data;
            this.status = data.data.status;
          }else{
            mui.toast(data.msg);
          }
      }
    );
  }
 DetailsInfo() {
  this.submitlag=true;//不可以点击
   this.service.getOrderChildByChildNo(this.activatedRoute.snapshot.params['id'])
    .subscribe(data => {
          if(data.code==0){//成功
            this.data=data.data;
            //status==101 货主确认收货  status==102司机确认收货  司机确认收货后才可以评价
            // alert(this.data.status)
            if(this.data.status==220){
              this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+this.activatedRoute.snapshot.params['id']);
            }
            if(this.data.driverEvaluate!=1&&this.data.status==151){
                this.router.navigateByUrl("confirmGoods/SuccessGoods/"+this.activatedRoute.snapshot.params['id']);
            }
            if(this.data.status==102){
                this.router.navigateByUrl("confirmGoods/SuccessGoods/"+this.activatedRoute.snapshot.params['id']);
             }
          }else{
            mui.toast(data.msg)
          }
      this.submitlag=false;//可以点击
      }
    );
  }
  backnev(){
     this.service.getOrderChildByChildNo(this.activatedRoute.snapshot.params['id'])
    .subscribe(data => {
          if(data.code==0){//成功
            this.data=data.data;
            this.status = data.data.status;
            if(this.data.status==102){
                this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+this.activatedRoute.snapshot.params['id']);
             }else{
                this.router.navigateByUrl("ordertype/confirmOrdertype/"+this.activatedRoute.snapshot.params['id']);
             }   
          }else{
            mui.toast(data.msg)
          }
      this.submitlag=false;//可以点击
      }
    );
    
  }
  lookInfo(){
     this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+this.activatedRoute.snapshot.params['id']);
  }
}
