import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {goodsReceiptService } from './goodsReceipt.service';
import { uploading } from '../fragment/uploading';
import { Scan } from'../fragment/scan';
declare var mui: any;
declare var $ : any;
declare var wx: any;


@Component({
  selector: 'app-goodsReceipt',
  templateUrl: './goodsReceipt.component.html',
  styleUrls: ['./goodsReceipt.component.css'],
  providers:[ goodsReceiptService ]
})
export class GoodsReceipt implements OnInit{
  market_title="我的收货";
  public node;//元素
  public uploading:uploading;//点击加载更多
  public infos=[];
  public Scan ;
  public isShow:boolean;


  constructor(
      public router: Router,
      public titleService: Title,
      public service : goodsReceiptService
  ){
    this.uploading=new uploading(1,false,3,"");
    //this.Scan = new Scan();
  }
  //刷新页面
  uploadInfo(){
    this.uploading.page=1;
    //查询货源列表
    console.log("quzhi")
    this.service.getOrderChildListByReceiveId(this.uploading.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            console.log(data.data.length);
            this.infos=data.data;
            if(this.infos.length==0){
              this.uploading.noneIfno=2;
            }else{
              this.uploading.noneIfno=1;
              // for(let i=0;i<this.infos.length;i++){
              //   this.infos[i].freightPrice=this.infos[i].freightPrice.toFixed(2);
              // }
              this.uploading.page=this.uploading.page+1;
            }
          }else{
            mui.alert(data.msg)
          }
        });
  }
  ngOnInit(): void {
    let self = this;
    this.titleService.setTitle('我的收货');
    this.isShow=false;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.uploadInfo();
     console.log("1111233")
    //$('.mui-scroll-wrapper').css('margin-top',$('.mui-content').offset().top-20);//设置距顶部高度
    $('.mui-scroll-wrapper').on('touchend',function(){
      let viewH =$(this).height(),//内容可见高度
          contentH =$(this).get(0).scrollHeight,//滚动当前距底部高度
          totalHeight =$(this).children().height(),//内容总高度
          scrollTop =$(this).scrollTop();//滚动高度
      if(contentH - viewH - scrollTop <= 80) { //到达底部100px时,加载新内容
        //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
        // 这里加载数据..
        self.moreInfo();
        console.log('上拉加载');
        $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin:0 auto;').insertBefore('#scrollBottom');
        setTimeout(()=>$('.mui-pull-loading').remove(),2000);
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
  //货源信息
  sourceInfo(childNo) {
    console.log(childNo);
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);
  }
  //打电话
  call(phoneNumber){
    window.open('tel:'+phoneNumber);
  }
  //点击加载更多
  moreInfo(){
    this.uploading.isLoading=true;
    //查询货源列表
    this.service.getOrderChildListByReceiveId(this.uploading.page)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.uploading.isLoading=false;
            if(data.data.length==0){
              this.uploading.loadingMore="已经到底了";
            }else{
              this.uploading.loadingMore="";
              for(var i=0;i<data.data.length;i++){
                this.infos.push(data.data[i]);
              }
              this.uploading.page=this.uploading.page+1;
            }
          }
        });
  }
   //轨迹查询
   maps(childNo){
     this.router.navigateByUrl("trajectoryMap/"+childNo);
  }
  //确认收货
  skip(childNo){
    this.router.navigateByUrl("confirmGoods?childNo="+childNo);
 }
  //扫一扫
  scan(){ 
    this.Scan.saoYiSao();
    }
  }

