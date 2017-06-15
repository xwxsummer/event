import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { Title } from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';

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
  public noneIfno:number;
  public isLoading:boolean;//是否显示加载
  public page:number;
  public loadingMore:string;
  tablecontent=[true,false,false,false,false,false];
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  //刷新页面
  uploadInfo(){
    this.page=1;
    //查询货源列表
    //已经接单的数目列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime,this.status,this.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            if(this.data.length==0){
              this.noneIfno=2;
            }else{
              this.noneIfno=1;
              this.page=this.page+1;
            }
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){
                this.data[i].headImg=this.data[i].domain+this.data[i].headImg;
              }else{
                this.data[i].headImg="../assets/images/myDriver.png";
              }
            }
          }
        });
  }
  ngOnInit(): void{
    let self = this;
    this.titleService.setTitle('已接单数明细');
    this.status=0;
    this.page=1;
    this.loadingMore="";
    this.noneIfno=3;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.isLoading=false;
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//订单数
    // 《货主端》根据货主id获取各种订单的次数GET
    this.service.getOrderChildListByOwnerIdChild(this.beginTime,this.endTime)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.dataNumber=data.data;
          }
        });
    this.uploadInfo();
    $('.myMui-scroll-wrapper').on('touchend',function(){
      let viewH =$(this).height(),//内容可见高度
          contentH =$(this).get(0).scrollHeight,//滚动当前距底部高度
          totalHeight =$(this).children().height(),//内容总高度
          scrollTop =$(this).scrollTop();//滚动高度
      if(contentH - viewH - scrollTop <= 80) { //到达底部100px时,加载新内容
        //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
        // 这里加载数据..
        self.moreInfo();
      }else if(contentH-totalHeight >= 80){
        self.uploadInfo();
        $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
        setTimeout(()=>{
          $('.mui-pull-loading').remove();
          mui.toast('刷新成功');
        },1000);

      }

    });
  }
  //分类 status
  fenlei(info,isSpecial){
    this.status=info;
    for(let a=0;a<this.tablecontent.length;a++){
      this.tablecontent[a]=false;
    }
    this.tablecontent[isSpecial]=true;
    this.page=1;
    this.loadingMore="";
    this.uploadInfo();
  }
  //打电话
  call(phoneNumber){
    window.open('tel:'+phoneNumber);
  }
  //点击加载更多
  moreInfo(){
    this.isLoading=true;
    //查询货源列表
    this.service.countOrderChildsToList(this.beginTime,this.endTime,this.status,this.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            if(data.data.length==0){
              this.loadingMore="已经到底了";
            }else{
              this.loadingMore="";
              for(var i=0;i<data.data.length;i++){
                if(data.data[i].headImg){
                  data.data[i].headImg=data.data[i].domain+data.data[i].headImg;
                }else{
                  data.data[i].headImg="../assets/images/myDriver.png";
                }
                this.data.push(data.data[i]);
              }
              this.page=this.page+1;
            }
          }
        });
  }
  //轨迹查询
  trajectoryMap(childNo){
    this.router.navigateByUrl("trajectoryMap/"+childNo);
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
