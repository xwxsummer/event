import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { Title } from '@angular/platform-browser';
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;

@Component({
  selector: 'app-personalInfo',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']

})

export class Statistics implements OnInit{
    public searchMonth;//月
    public searchDay;//日
    public beginTime:string;//开始时间
    public entTime:string;//结束时间
    public data={
        publishOrderCount:0,
        ordersCount:0,
        goodsCount:0,
        payFreight:0
    };
    constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
      this.titleService.setTitle('业务统计');
      this.routeInfo.snapshot.queryParams["type"];
      this.searchMonth=new Date().getMonth()+1;
      this.searchDay=new Date().getDate();
      if(this.searchMonth<10){//小于十添零
          this.searchMonth="0"+(this.searchMonth+"");
      }
      if(this.searchDay<10){//小于十添零
          this.searchDay="0"+(this.searchDay+"");
      }
      this.beginTime=new Date().getFullYear()+"-"+this.searchMonth+"-"+this.searchDay;
      this.entTime=new Date().getFullYear()+"-"+this.searchMonth+"-"+this.searchDay;
      document.getElementById('beginTime').innerHTML = this.beginTime;
      document.getElementById('entTime').innerHTML = this.entTime;
      //查询货源列表
      this.service.countOrders(this.beginTime,this.entTime)
          .subscribe(data=>{
              if(data.code==0){//成功
                  this.data=data.data;
              }
          });
        }
  search(){
        this.beginTime=document.getElementById('beginTime').innerHTML;
        this.entTime=document.getElementById('entTime').innerHTML;
        if(this.beginTime<=this.entTime){
            //查询货源列表
            this.service.countOrders(this.beginTime,this.entTime)
                .subscribe(data=>{
                    if(data.code==0){//成功
                        this.data=data.data;
                    }
                });
        }else{
            mui.toast("起始时间大于终止时间，请重新选择时间",{ duration:'short', type:'div' });

        }
    }

  //开始时间mui-btn
  myBeginTime():void{
    var dtPicker = new mui.DtPicker({
          "type": "date",
          beginDate: new Date(2017,1,1),//设置开始日期
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),//设置结束日期
          "customData": {
            "Mon": [
              { value: "Mon", text: "Day" }
            ]
          }
        }
    );
    dtPicker.show(function (selectItems) {
        this.beginTime=selectItems.value;
        document.getElementById('beginTime').innerHTML = this.beginTime;
           })
      }
//结束时间
  EndTime():void{
    var dtPicker = new mui.DtPicker({
          "type": "date",
          beginDate: new Date(2017,1,1),//设置开始日期
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),//设置结束日期
          "customData": {
            "Mon": [
              { value: "Mon", text: "Day" }
            ]
          }
        }
    );
    dtPicker.show(function (selectItems) {
        this.entTime=selectItems.value;
        document.getElementById('entTime').innerHTML = this.entTime;
    });
    //dtPicker.hide(function () {
    //    console.log(11111);
    //})
  }

  //到发布货源数
  deliverNumbers(num){
      this.router.navigateByUrl("personalCenter/DeliverNumbers?star="+this.beginTime+"&end="+this.entTime+"&num="+num);
  }
  //到接单数明细
  jiedanshu(num){
    this.router.navigateByUrl("personalCenter/Jiedanshu?star="+this.beginTime+"&end="+this.entTime+"&num="+num);
  }
  //已运货数量
  goodsNum(num,type){//type=1 已运货物 2支付
    this.router.navigateByUrl("personalCenter/GoodsNum?star="+this.beginTime+"&end="+this.entTime+"&num="+num+"&type="+type);
  }





}
