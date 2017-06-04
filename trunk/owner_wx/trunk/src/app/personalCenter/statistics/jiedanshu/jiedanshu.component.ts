import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { Title } from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
import { ValidateMessage } from  '../../../fragment/validateMessage';

declare var mui: any;
declare var $: any;


@Component({
  selector: 'app-deliverNumbers',
  templateUrl: './jiedanshu.component.html',
  styleUrls: ['./jiedanshu.component.css']

})

export class Jiedanshu implements OnInit{
  public beginTime:string;
  public endTime:string;
  public num;//数量
  public status=1;//订单状态
  public data=[];
  public dataNumber;
  public ValidateMessage;
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.ValidateMessage=new ValidateMessage();
  }
  ngOnInit(): void{
    this.titleService.setTitle('已接单数明细');
    this.status=0;
    $("#infoNone").hide();
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//订单数
    // 《货主端》根据货主id获取各种订单的次数GET
    this.service.getOrderChildListByOwnerIdChild(this.beginTime,this.endTime)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.dataNumber=data.data;
            console.log(this.dataNumber);
          }
        });
    //已经接单的数目列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime,this.status)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            console.log(this.data);
            if(this.data.length==0){
              $("#infoNone").show();
              console.log(333333)
            }else{
              $("#infoNone").hide();
              console.log(44444)
            }
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){
                this.data[i].headImg=this.ValidateMessage.ValidateMessage+this.data[i].headImg;
                console.log(this.data[i].headImg);
              }else{
                this.data[i].headImg="../assets/images/myDriver.png";
              }
            }
          }
        });
  }
  //分类 status
  fenlei(info){
    //已经接单的数目列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime,info)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            console.log(this.data);
            if(this.data.length==0){
              $("#infoNone").show();
            }else{
              $("#infoNone").hide();
            }
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){
                this.data[i].headImg=this.ValidateMessage.ValidateMessage+this.data[i].headImg;
                console.log(this.data[i].headImg);
              }else{
                this.data[i].headImg="../assets/images/myDriver.png";
              }
            }
            console.log(this.data);
          }
        });
  }
  //轨迹查询
  trajectoryMap(childNo){
    console.log(childNo);
  }
  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }
  //我的收货详情
  sourceInfo(childNo) {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);

  }





}
