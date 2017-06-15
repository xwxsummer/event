import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { uploading } from '../../../fragment/uploading';
//http
import { personalCenterService } from  '../../personalCenter.service';
import { Title } from '@angular/platform-browser';
declare var mui: any;
declare var $: any;

@Component({
  selector: 'app-goodsNum',
  templateUrl: './goodsNum.component.html',
  styleUrls: ['./goodsNum.component.css']
})

export class GoodsNum implements OnInit{
  public beginTime:string;
  public endTime:string;
  public type:string;//1 已运吨数  2 已支付
  public num;//数量
  public uploading:uploading;//点击加载更多
  public data=[];//数量
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.uploading=new uploading(1,false,3,"");
  }
  //刷新页面
  uploadInfo(){
    this.uploading.page=1;
    //查询货源列表
    // 已经运送的货物数量列表
    this.service.countCompleteOrderToList(this.beginTime,this.endTime,this.uploading.page)
        .subscribe(data=>{
          $('.mui-scroll-wrapper').css('margin-top',"2rem");//设置距顶部高度
          if(data.code==0){//成功
            this.data=data.data;
            if(this.data.length==0){
              this.uploading.noneIfno=2;
            }else{
              this.uploading.noneIfno=1;
              this.uploading.page=this.uploading.page+1;
              console.log(this.data);
              for(let i=0;i<this.data.length;i++){
                if(this.data[i].headImg){
                  this.data[i].headImg=this.data[i].domain+this.data[i].headImg;
                  console.log(this.data[i].headImg);
                }else{
                  this.data[i].headImg="../assets/images/myDriver.png";
                }
              }
            }

          }
        });
  }
  ngOnInit(): void{
    let self = this;
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//数量
    this.type=this.routeInfo.snapshot.queryParams["type"];//1 已运吨数  2 已支付
    if(this.type=="1"){
      this.titleService.setTitle('已运货物数量');
    }else{
      this.titleService.setTitle('已支付运费');
    }
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.uploadInfo();
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
        console.log(222222);
        $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
        setTimeout(()=>{
          $('.mui-pull-loading').remove();
          mui.toast('刷新成功');
          console.log(11111);
        },1000);
      }
    });
  }

  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }
  //我的收货详情
  sourceInfo(childNo) {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);

  }
  //点击加载更多
  moreInfo(){
    this.uploading.isLoading=true;
    //查询货源列表
    this.service.countCompleteOrderToList(this.beginTime,this.endTime,this.uploading.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.uploading.isLoading=false;
            if(data.data.length==0){
              this.uploading.loadingMore="已经到底了";
            }else{
              this.uploading.loadingMore="";
              for(var i=0;i<data.data.length;i++){
                if(data.data[i].headImg){
                  data.data[i].headImg=data.data[i].domain+data.data[i].headImg;
                  }else{
                  data.data[i].headImg="../assets/images/myDriver.png";
                }
                this.data.push(data.data[i]);
              }
              this.uploading.page=this.uploading.page+1;
            }
          }
        });
  }



}
