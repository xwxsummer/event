import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { confirmGoodsService } from '../confirmGoods.service';

@Component({
  selector: 'app-detailsInfos',
  templateUrl: './detailsInfos.component.html',
  styleUrls: ['./detailsInfos.component.css']

})

export class DetailsInfos implements OnInit {
  public data: any;
  public type:any;
   public num = window.location.href.split("num=")[1].split("&")[0];
  market_title="我的货源";
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
       public service : confirmGoodsService
  ){

  }
  ngOnInit(): void{
    this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data)
          }else{
            alert(data.msg)
          }
        }
    );  
  //      mui.plusReady(function(){
  // document.getElementById("telephone").addEventListener("tap",function(){
  //   var plus
  //   var btnArray=["呼叫","取消"]
  //   var phone=this.data.driverPhone
  //   mui.confirm("呼叫司机：" + this.data.driverName, " ",btnArray,function(e){
  //     if(e.index==0){
  //       plus.device.dial(phone,false)
  //     }
  //   })
  // })
  //  })
  }
  callTop(){
      var plus
    mui.confirm("呼叫司机：" + "this.data.driverName", " ", 
    new Array('取消', '呼叫'), function (e) {
    if(e.index==1){
        plus.device.dial("123456232",true)
    }
    })

}

//确认收货
TrackQuery() {
  this.router.navigateByUrl("confirmGoods/ReceivingConfirm"+this.activatedRoute.snapshot.params['id']);
 }
 //查看详细
 SuccessGoods() {
     this.router.navigateByUrl("confirmGoods/DetailsPage/"+this.activatedRoute.snapshot.params['id']);
}
//查看评价
EvaluationDetails(){
  this.router.navigateByUrl("confirmGoods/EvaluationDetails")
}
}
