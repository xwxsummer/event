import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-deliverNumbers',
  templateUrl: './jiedanshu.component.html',
  styleUrls: ['./jiedanshu.component.css']

})

export class Jiedanshu implements OnInit{
  public beginTime:string;
  public endTime:string;
  public num;//数量
  public isAll=1;//1所有
  public data=[];


  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//订单数
    //查询货源列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data);
          }
        });
  }
  //分类 status
  fenlei(info){
    this.isAll=info;
    console.log(info);
  }

//我的发货货源信息
  sourceInfo(number) {
    console.log(number);
    this.router.navigateByUrl("myGoods/SourceInfo?number="+number);
  }





}
