import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
import { Title } from '@angular/platform-browser';
import { ValidateMessage } from  '../../../fragment/validateMessage';//头像拼接
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
  public data;//数量
  public ValidateMessage;//图片拼接

  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.ValidateMessage=new ValidateMessage();
  }
  ngOnInit(): void{
    $("#infoNone");
    this.beginTime=this.routeInfo.snapshot.queryParams["star"];//开始时间
    this.endTime=this.routeInfo.snapshot.queryParams["end"];//开始时间
    this.num=this.routeInfo.snapshot.queryParams["num"];//数量
    this.type=this.routeInfo.snapshot.queryParams["type"];//1 已运吨数  2 已支付
    if(this.type=="1"){
      this.titleService.setTitle('已运货物数量');
    }else{
      this.titleService.setTitle('已支付运费');
    }
       // 已经运送的货物数量列表
    this.service.countCompleteOrderToList(this.beginTime,this.endTime)
        .subscribe(data=>{
          if(data.code==0){//成功
            console.log(data.data);
            this.data=data.data;
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




}
