import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from './confirmGoods.service';
declare var mui: any;

@Component({
  selector: 'app-confirmGoods',
  templateUrl: './confirmGoods.component.html',
  styleUrls: ['./confirmGoods.component.css']

})

export class ConfirmGoods  implements OnInit{
  public data;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,//页面间传值
    public service:confirmGoodsService
   
  ){}
ngOnInit():void{
  // mui.alert("请认真核实司机证件信息与提供信息是否一致，如因信息不符所造成的损失，平台将不负相关责任","","知道了",function (){
  //   });
      // mui.alert(window.location.href.split("?childNo=")[1].split("&")[0])

  this.service.getOrderDetailsByChildNo(window.location.href.split("?childNo=")[1].split("&")[0])
    .subscribe(data => {
      if(data.code==0){//成功
      console.log(data)
      this.data=data.data;
      }else{
      alert(data.msg)
          }
    })    
}
confirmGoods() {
    let param= "2";
    this.service.ownerConfirmTruck(this.data.childNo,param).subscribe(
      data1 => {
        if(data1.code==0){
          this.router.navigateByUrl("confirmGoods/ReceivingConfirm/"+this.data.childNo);
        }else{
          alert(data1.msg);
        }
      }
    );
   
}
}
