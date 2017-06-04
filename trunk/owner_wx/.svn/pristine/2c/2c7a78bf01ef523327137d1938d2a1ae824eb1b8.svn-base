import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-deliverNumbers',
  templateUrl: './deliverNumbers.component.html',
  styleUrls: ['./deliverNumbers.component.css']

})

export class DeliverNumbers implements OnInit{
  public beginTime:string;
  public endTime:string;
  public num;//数量
  public data;
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('发布货源数');
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//订单数
      //查询货源列表
    this.service.countPublishOrder(this.beginTime,this.endTime)
        .subscribe(data=>{
            if(data.code==0){//成功
                this.data=data.data;
                for(let i=0;i<this.data.length;i++){
                    this.data[i].freightPrice=this.data[i].freightPrice.toFixed(2);
                }
                console.log(data.data);
            }
        });
  }

    //接单查询
    Order(number){
        this.router.navigateByUrl("myGoods/Order?number="+number);
    }
    //我的发货货源信息
  sourceInfo(number) {
    this.router.navigateByUrl("myGoods/SourceInfo?number="+number);
  }





}
