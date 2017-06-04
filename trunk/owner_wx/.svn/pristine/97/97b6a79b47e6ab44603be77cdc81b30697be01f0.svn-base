import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { saoyisaoService } from './saoyisao.service';
declare var mui: any;


@Component({
  selector: 'app-saoyisao',
  templateUrl: './saoyisao.component.html',
  styleUrls: ['./saoyisao.component.css']

})

export class Saoyisao implements OnInit{
   public data;
   isSpecial:number = 1;
  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
    public service : saoyisaoService
  ){
  }
  ngOnInit(): void{
      mui.alert("请认真核实司机证件信息与提供信息是否一致，如因信息不符所造成的损失，平台将不负相关责任","","知道了",function (){
       });
     // mui.alert(window.location.href.split("?childNo=")[1].split("&")[0])
        this.service.getOrderDetailsByChildNo(window.location.href.split("?childNo=")[1].split("&")[0])
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log(data)
            this.data=data.data
        }
        else{
                 mui.alert(data.msg)
               }}
         )  
  }
  //拒绝装车   +"?orderNo="+this.data.orderNo
  refuseZhuangche() {
    if(this.data.status==200){
      mui.alert("您已经拒绝过此单号装车，不能重复提交！")
      return
    }
    this.router.navigateByUrl("saoYiSao/RefuseZhuangche/"+this.data.childNo);
  }
  //装车信息
  ZhuangCheInfo() {
    let param= "1";
    this.service.ownerConfirmTruck(this.data.childNo,param).subscribe(
           data1 => {
          if(data1.code==0){
           // mui.alert(data1.msg+"code==0")
            this.router.navigateByUrl("saoYiSao/ZhuangCheInfo/"+this.data.childNo);
            }
          else{
            mui.alert(data1.msg)
          }
        })
  
  }
  isSpecial0=false;
  isSpecial1=false;
  isSpecial2=false;
  isSpecial3=false;
  isSpecial4=false;
  isSpecial5=false;
  //取消原因
  myGoods_cancle0(info){
    this.isSpecial0=false;
    this.isSpecial1=false;
    this.isSpecial2=false;
    this.isSpecial3=false;
    this.isSpecial4=false;
    this.isSpecial5=false;
    this[info]=true;
    console.log(info)
  }
}
