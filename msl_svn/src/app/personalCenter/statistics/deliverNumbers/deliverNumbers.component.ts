import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { uploading } from '../../../fragment/uploading';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;
declare var $ : any;

@Component({
  selector: 'app-deliverNumbers',
  templateUrl: './deliverNumbers.component.html',
  styleUrls: ['./deliverNumbers.component.css']

})

export class DeliverNumbers implements OnInit{
  public beginTime:string;
  public flag:number;
  public endTime:string;
  public num;//数量
  public type:string;//1 发布货源数  2 已运货款
  public page:number;
  public data=[];
  public uploading:uploading;//点击加载更多

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
        this.service.countPublishOrder(this.beginTime,this.endTime,this.uploading.page,this.flag)
            .subscribe(data=>{
                $('.mui-scroll-wrapper').css('margin-top',"2rem");//设置距顶部高度
                if(data.code==0){//成功
                    this.data=data.data;
                    if(this.data.length==0){
                        this.uploading.noneIfno=2;
                    }else{
                        this.uploading.noneIfno=1;
                        this.uploading.page=this.uploading.page+1;
                    }
                }
            });
    }
  ngOnInit(): void{
      let self = this;
    this.titleService.setTitle('发布货源数');
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//订单数
    this.type=this.routeInfo.snapshot.queryParams["type"];//1 发布货源数  2 已运货款
    if(this.type=="1"){
      this.titleService.setTitle('发布货源数');
    }else{
      this.titleService.setTitle('已运货款');
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
              $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
              setTimeout(()=>{
                  $('.mui-pull-loading').remove();
                  mui.toast('刷新成功');
              },1000);
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

    //点击加载更多
    moreInfo(){
        this.uploading.isLoading=true;
        //查询货源列表
        this.service.countPublishOrder(this.beginTime,this.endTime,this.uploading.page,this.flag)
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.uploading.isLoading=false;
                    if(data.data.length==0){
                        this.uploading.loadingMore="已经到底了";
                    }else{
                        this.uploading.loadingMore="";
                        for(var i=0;i<data.data.length;i++){
                            this.data.push(data.data[i]);
                        }
                        this.uploading.page=this.uploading.page+1;
                    }
                }
            });
    }



}
