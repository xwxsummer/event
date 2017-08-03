import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {ordertypeService} from './ordertype.service';
declare var mui: any;
declare var $:any; 

@Component({
  selector: 'app-ordertype',
  templateUrl: './ordertype.component.html',
  styleUrls: ['./ordertype.component.css']
})
export class OrdertypeComponent implements OnInit {
 public data;
  public submitlag: boolean;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,//页面传值
    public titleService: Title,
    public service : ordertypeService
  ){
  }
  ngOnInit(): void{
    this.submitlag=false;
    this.titleService.setTitle('运单详情');
    this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
      .subscribe(
            data => {
              if(data){
                $(".wrap").show();
                $(".spinner").hide();
                mui.alert("请认真核实司机证件信息与提供信息是否一致，如因信息不符所造成的损失，平台将不负相关责任","","知道了",function (){
              });
                if(data.code==0){
                  console.log(data.data)
                  this.data=data.data;
                }
                else{
                  mui.toast(data.msg)
                }
              }else{
                $(".wrap").hide();
                $(".spinner").show();
              }
        })  
  }
  //装车信息
  confirmInfo() {
    this.submitlag=true;//不允许点击
    let param= "1";
    this.service.ownerConfirmTruck(this.data.childNo,param).subscribe(
      data1 => {
          this.submitlag=false;//允许点击
          if(data1.code==0){
            this.router.navigateByUrl("ordertype/confirmOrdertype/"+this.data.childNo);
            }
          else{
            mui.toast(data1.msg)
          }
      })
  } 
  //返回上一页
    goBack(){
        this.router.navigateByUrl("market/MyGoods?info=myGoods")
    }
    //返回主页
    goHome(){
        this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }

}
