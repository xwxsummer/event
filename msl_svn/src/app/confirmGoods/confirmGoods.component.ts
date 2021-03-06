import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from './confirmGoods.service';
import { Title } from '@angular/platform-browser';
declare var mui: any;

@Component({
  selector: 'app-confirmGoods',
  templateUrl: './confirmGoods.component.html',
  styleUrls: ['./confirmGoods.component.css']

})

export class ConfirmGoods  implements OnInit{
  public submitlag: boolean;
  public data;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,//页面间传值
    public titleService: Title,
    public service:confirmGoodsService
   
  ){
    
  }
ngOnInit():void{
  this.submitlag=false;//初始化为可以点击
  this.titleService.setTitle('运单详情');
  mui.alert("请认真核实司机证件信息与提供信息是否一致，如因信息不符所造成的损失，平台将不负相关责任","","知道了",function (){
    });
      // mui.alert(window.location.href.split("?childNo=")[1].split("&")[0])
  this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
    .subscribe(data => {
      if(data.code==0){//成功
        console.log(data.data)
        this.data=data.data;
      }else{
        alert(data.msg)
      }
    })    
}
//返回上一页
    goBack(){
        this.router.navigateByUrl("market/GoodsReceipt?info=GoodsReceipt")
    }
    //返回主页
    goHome(){
        this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
confirmGoods() {
    let param= "2";
    this.submitlag=true;//不可以点击
    this.service.ownerConfirmTruck(this.data.childNo,param).subscribe(
      data1 => {
        if(data1.code==0){
          this.router.navigateByUrl("confirmGoods/ReceivingConfirm/"+this.data.childNo);
        }else{
          alert(data1.msg);
        }
        this.submitlag=false;//可以点击
      }
    );
   
}
}
