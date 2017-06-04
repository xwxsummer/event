import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-goodsNum',
  templateUrl: './goodsNum.component.html',
  styleUrls: ['./goodsNum.component.css']

})

export class GoodsNum implements OnInit{
  public beginTime:string;
  public endTime:string;
  public type:number;//1 已运吨数  2 已支付
  public num;//数量
  public data;//数量

  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//数量
    this.type=this.routeInfo.snapshot.queryParams["type"];//1 已运吨数  2 已支付

    //查询货源列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime)
        .subscribe(data=>{
          if(data.code==0){//成功
            console.log(data.data);
            this.data=data.data

          }
        });
  }

//货源信息
  receiptDetails() {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails");
  }





}
