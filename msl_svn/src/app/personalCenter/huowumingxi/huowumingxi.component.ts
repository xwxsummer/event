import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { personalCenterService } from '../personalCenter.service';
import { OrderInfoTermDTO } from './OrderInfoTermDTO';
declare var mui: any;
declare var $: any;
@Component({
  selector: 'app-huowumingxi',
  templateUrl: './huowumingxi.component.html',
  styleUrls: ['./huowumingxi.component.css']

})
export class Huowumingxi implements OnInit{
  public OrderInfoTermDTO: OrderInfoTermDTO;
  public isLoading:boolean;//是否显示加载
  public data=[];//全部
  public page:number;
  public noneIfno:number;
  public loadingMore:string;//正在加载
  public isShow:boolean;
  public status:number;//订单状态
  public cancelReason:string;//取消原因
  public goodsResidue:string;//剩余货单数
  public node;//元素
  public myOrderNo:string;//主单订单编号
  tablecontent=[false,false,false,false];
  AdditionalTip = [];//取消原因显示
  public dataRefuse=[];//取消原因
  contents=[];
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
    this.OrderInfoTermDTO=new OrderInfoTermDTO();
  }
    //刷新页面
    uploadInfo(){
        this.OrderInfoTermDTO.page =1;
        // 货源明细
        this.service.getOrderInfoListByParam(this.OrderInfoTermDTO)
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
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            });
    }
  ngOnInit(): void{
      let self = this;
    this.contents=[{ status:null,content:"全部"},{status:1,content:"待付款"},{status:10,content:"进行中"},{status:30,content:"已完成"}];
    this.tablecontent[0]=true;
    this.titleService.setTitle('货物明细');
    this.status=null;
    //查询司机详情
    this.page=1;
    this.loadingMore="";
    this.noneIfno=3;
    this.isShow=false;
    this.isLoading=false;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
      this.uploadInfo();
    //获取取消原因
    this.service.getSystemLabelByType(2)
        .subscribe(data=>{
          if(data.code==0){//成功
            for(let b=0;b<data.data.length;b++){
              this.AdditionalTip.push(false);
            }
            this.dataRefuse=data.data;
          }else{
              mui.toast(data.msg,{ duration:'short', type:'div' });
          }
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
  //发布货源
  PublicGoods(orderNo){
    this.router.navigateByUrl("deliverGoods/PublicGoods/"+orderNo);
  }
  //点击每一个
  orderData(i,status){
    $(".mui-scroll").css("transform","translate3d(0px, 0px, 0px)");
    for(let s=0;s<this.tablecontent.length;s++){
      this.tablecontent[s]=false;
    }
    this.tablecontent[i]=true;
      this.OrderInfoTermDTO.status =status;
      this.data =[];
      this.loadingMore="";
      this.uploadInfo();
    }
  //货源信息
  sourceInfo(orderNo) {
    console.log(orderNo);
    this.router.navigateByUrl("myGoods/SourceInfo?number="+orderNo);
  }
//点击取消
    goodsRefuse(){
        mui('#sheet1').popover('hide');
        this.clearResult();
        this.cancelReason="";
    }
  //取消原因
  activate(status,orderNo,goodsResidue){
    this.goodsResidue=goodsResidue+"";
    this.myOrderNo=orderNo+"";
    this.node=mui(event.target)[0].parentNode.parentNode;
    mui('#sheet1').popover('toggle');
  }

  //确认取消
  goodsCancle(){
      if(this.cancelReason){
          //根据主单编号取消主单剩余货源
          this.goodsRefuse();
          this.service.cancelInfoByMainOrder(this.myOrderNo,this.cancelReason)
              .subscribe(data=>{
                  if(data.code==0){//成功
                      this.node.remove();
                      this.clearResult();
                      mui.toast("取消成功",{ duration:'short', type:'div' });
                  }else{
                      mui.toast(data.msg,{ duration:'short', type:'div' });
                  }
              });
      }else{
          mui.toast("请选择取消原因",{ duration:'short', type:'div' });
      }
  }
  //不取消
  noCancel(){
    this.isShow=false;
  }
  //点击加载更多
  moreInfo(){
    this.isLoading=true;
    this.OrderInfoTermDTO.page =this.page;
    // 货源明细
    this.service.getOrderInfoListByParam(this.OrderInfoTermDTO)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            if(data.data.length==0){
              this.loadingMore="已经到底了";
            }else{
              this.loadingMore="";
              for(var i=0;i<data.data.length;i++){
                this.data.push(data.data[i]);
              }
              this.page=this.page+1;
            }
          }else{
            mui.toast(data.msg,{ duration:'short', type:'div' });
          }

        });

  }
  //接单查询
  Order(number){
    this.router.navigateByUrl("myGoods/Order?number="+number);
  }
    //取消原因清空
    clearResult(){
        for(let s=0;s<this.AdditionalTip.length;s++){
            this.AdditionalTip[s]=false;
        }
    }
    //点击取消
    myGoods_cancle0(index,refuseName){
        this.cancelReason=refuseName;
        this.clearResult();//取消原因清空
        this.AdditionalTip[index]=true;
    }
//取消全部订单
  cancelOrder(info){
    this.isShow=false;
    if(info==0){
    }else{
      this.router.navigateByUrl("myGoods/CancelInfoOrderAll?info="+info+"&orderNo="+this.myOrderNo+"&goodsResidue="+this.goodsResidue);
    }
  }


}
