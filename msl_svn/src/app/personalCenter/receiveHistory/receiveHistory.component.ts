import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { personalCenterService } from '../personalCenter.service';
import { orderChildTermDTO } from './orderChildTermDTO';
declare var mui: any;
declare var $: any;
@Component({
  selector: 'app-huowumingxi',
  templateUrl: './receiveHistory.component.html',
  styleUrls: ['./receiveHistory.component.css']
})

export class ReceiveHistory implements OnInit{
  public orderChildTermDTO: orderChildTermDTO;
  public isLoading:boolean;//是否显示加载
  public data=[];//全部
  public page:number;
  public noneIfno:number;
  public loadingMore:string;//正在加载
  public isShow:boolean;
  tablecontent=[false,false,false,false];
  contents=[];
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
    this.orderChildTermDTO=new orderChildTermDTO();
    this.orderChildTermDTO.page =1;
  }
  //刷新页面
  uploadInfo(){
    this.orderChildTermDTO.page =1;
    //查询货源列表
    this.service.getOrderChildListByParam(this.orderChildTermDTO)
        .subscribe(data=>{
          $('.mui-scroll-wrapper').css('margin-top',"2.5rem");//设置距顶部高度
          if(data.code==0){//成功
            this.data=data.data;
            if(this.data.length==0){
              this.noneIfno=2;
            }else{
              this.noneIfno=1;
              this.page=this.page+1;
            }

            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){//
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
    this.titleService.setTitle('收货历史');
    //货物单号
    this.contents=[{status:107,content:"全部"},{status:105,content:"待收货"},{status:106,content:"已收货"},{status:104,content:"协商中"}];
    this.tablecontent[0]=true;
    //查询司机详情
    this.page=1;
    this.orderChildTermDTO.childStatus=this.contents[0].status;
    this.loadingMore="";
    this.noneIfno=3;
    this.isShow=false;
    this.isLoading=false;
    this.uploadInfo();
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $('.mui-scroll-wrapper').on('touchend',function(){
      let viewH =$(this).height(),//内容可见高度
          contentH =$(this).get(0).scrollHeight,//滚动当前距底部高度
          totalHeight =$(this).children().height(),//内容总高度
          scrollTop =$(this).scrollTop();//滚动高度
      if(contentH - viewH - scrollTop <= 80) { //到达底部100px时,加载新内容
        //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
        // 这里加载数据..
        self.moreInfo();
      }else if(contentH-totalHeight >= 80){
        console.log('下拉刷新');
        self.uploadInfo();
        $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
        setTimeout(()=>{
          $('.mui-pull-loading').remove();
          mui.toast('刷新成功');
        },1000);

      }

    });
  }
  //点击每一个
  orderData(i,status){
    $(".mui-scroll").css("transform","translate3d(0px, 0px, 0px)");
    for(let s=0;s<this.tablecontent.length;s++){
      this.tablecontent[s]=false;
    }
    this.tablecontent[i]=true;
    this.orderChildTermDTO.childStatus =status;
    this.data =[];
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
    this.orderChildTermDTO.page =this.page;
    // 货源明细
    this.service.getOrderChildListByParam(this.orderChildTermDTO)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            if(data.data.length==0){
              this.loadingMore="已经到底了";
            }else{
              this.loadingMore="";
              for(var i=0;i<data.data.length;i++){
                if(data.data[i].headImg){
                  data.data[i].headImg=data.data[i].domain;+data.data[i].headImg;
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
  order() {
    this.router.navigateByUrl("myGoods/Order");
  }
  //货源信息
  receiptDetails(childNo) {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);
  }
  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }
  //轨迹查询
  trajectoryMap(childNo){
    this.router.navigateByUrl("trajectoryMap/"+childNo);
  }
}
