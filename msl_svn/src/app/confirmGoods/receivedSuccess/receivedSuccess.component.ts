import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;

@Component({
  selector: 'app-receivedSuccess',
  templateUrl: './receivedSuccess.component.html',
  styleUrls: ['./receivedSuccess.component.css']

})

export class ReceivedSuccess implements OnInit{
  public data: any;
  public submitlag: boolean;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service: confirmGoodsService
  ){}
  ngOnInit(): void{
    this.submitlag=false;//初始化为可以点击
    this.titleService.setTitle('提交成功');
    this.service.getOrderChildByChildNo(this.activatedRoute.snapshot.params['id'])
      .subscribe(data => {
          if(data.code==0){//成功
            this.data=data.data;
          }else{
            mui.alert(data.msg)
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
            mui.alert(data.msg)
          }
      this.submitlag=false;//可以点击
      }
    );
  
  }
}
