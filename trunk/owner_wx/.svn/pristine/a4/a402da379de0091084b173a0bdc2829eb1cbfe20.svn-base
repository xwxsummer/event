import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {goodsReceiptService } from './goodsReceipt.service'
import { ValidateMessage } from  '../fragment/validateMessage';
import { Title } from '@angular/platform-browser';
import {Scan} from '../fragment/scan';

declare var mui: any;
declare var wx: any;


@Component({
  selector: 'app-GoodsReceipt',
  templateUrl: './goodsReceipt.component.html',
  styleUrls: ['./goodsReceipt.component.css'],
  providers:[goodsReceiptService]
})

export class GoodsReceipt implements OnInit{
  market_title="我的收货";
  public infos:any;
  public pageSize;
  public data;
  public isLoading:boolean;//是否显示加载
  public page:number;
  public isShow:boolean;
  public Scan;
  constructor(
    public router: Router,
    public service:goodsReceiptService,
    public titleService: Title
  ){
    //this.Scan = new scan();
  }
 //货源信息
  goodsDetails(childNo){
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);
  }
  //轨迹查询
   maps(childNo){
     this.router.navigateByUrl("trajectoryMap/"+childNo);
  }
//呼叫司机
call(){
  console.log(this.data.driverPhone)
  mui.confirm("呼叫司机：" + this.data.driverName, " ", 
  new Array('取消', '<a href="tel:this.data.driverPhone" style="color:#ea5529">呼叫</a>'), function (e) {})
}
skip(childNo){
  this.router.navigateByUrl("confirmGoods?childNo="+childNo);
}
  ngOnInit(): void{
    this.titleService.setTitle('我的收货');
    this.page=1;
    this.pageSize=5;
    this.isShow=false;
    this.isLoading=false;
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //查询货源列表
    this.service.getOrderChildListBySendId(this.page,this.pageSize)
        .subscribe(data=>{
          if(data.code==0){//成功        
              this.infos=data.data;
              console.log(data);
        }
          this.page=this.page+1;
        });
  }
  scan(){
    console.log("扫一扫")
    //console.log(wx)
     this.service.getWeixinJsApiSign(window.location.href)
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log(data.data)
            this.data=data.data
        }
        else{
             mui.alert(data.msg)
               }
        })  
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:this.data.appId, // 必填，公众号的唯一标识
            timestamp: this.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.data.nonceStr, // 必填，生成签名的随机串
            signature: this.data.signature,// 必填，签名，见附录1
            jsApiList: ["scanQRCode","getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(res){
            console.log("config信息验证成功后会执行ready方法")
        })
        wx.error(function(res){
            console.log("config信息验证失败会执行error函数")
        })
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        });
    
  }
 
    //点击加载更多
  moreInfo(){
    this.isLoading=true;
    //查询货源列表
    this.service.getOrderChildListBySendId(this.page,this.pageSize)
        .subscribe(data=>{
          if(data.code==0){//成功
            this.isLoading=false;
            for(var i=0;i<data.data.length;i++){
              this.infos.push(data.data[i]);
            }
          }
          this.page=this.page+1;
        });
  }
}
