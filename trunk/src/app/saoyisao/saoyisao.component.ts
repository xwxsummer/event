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
        console.log("sure");
      });
    //mui.confirm('您已超过时间','取消需要违约金',['确认','取消'],function(){
    //
    //  console.log("hahahha");
    //  //location.href='http://localhost:4200/myGoods/CancelGoods'
    //},'div');

    this.service.getOrderDetailsByChildNo(22017042494632250)
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log(data)
            this.data=data.data;
          }
        }
    );
  }
   //查询订单
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
  }
  //拒绝装车
  refuseZhuangche() {
    this.router.navigateByUrl("saoYiSao/RefuseZhuangche");
  }
  //装车信息
  ZhuangCheInfo() {
    // console.log(this.data.childNo)
    
    this.router.navigateByUrl("saoYiSao/ZhuangCheInfo/"+this.data.childNo);
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
