import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { Title } from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
import { ValidateMessage } from  '../../../fragment/validateMessage';
declare var mui: any;
declare var $: any;
@Component({
  selector: 'app-myGoods',
  templateUrl: './employeInfo.component.html',
  styleUrls: ['./employeInfo.component.css']
})

export class EmployeInfo implements OnInit{
  public name:string;
  public phone:string;
  public staffId:string;
  public headImg:string;
  public myStatus:number;
  public ValidateMessage;
  public data=[];
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.ValidateMessage=new ValidateMessage();
  }
  //判断是否传头像
  isHeadImg(data){
    for(let i=0;i<data.length;i++){
      if(data[i].headImg){
        data[i].headImg=this.ValidateMessage.ValidateMessage+data[i].headImg;
      }else{
        data[i].headImg="../assets/images/myDriver.png";
      }
    }
    if(data.length==0){
      $("#infoNone").show();
      $(".Lists").hide();
    }else{
      $("#infoNone").hide();
      $(".Lists").show();
    }
  }
  ngOnInit(): void{
    this.titleService.setTitle('查看明细');
    this.name=this.routeInfo.snapshot.queryParams["name"];
    this.phone=this.routeInfo.snapshot.queryParams["phone"];
    this.staffId=this.routeInfo.snapshot.queryParams["staffId"];
    this.headImg=this.routeInfo.snapshot.queryParams["headImg"];
    this.myStatus=1;
    //《货主端》根据发货人id查询发货列表
    this.service.mygetOrderChildListBySendId(this.staffId)
        .subscribe(
            data => {
          if(data.code==0){
            this.data=data.data;
            this.isHeadImg(this.data);
          }
        }
    );
  }
  zhuangche="employeActive";
  shouhuo="employeNone";
  //点击改变状态
  changeInfo(info) {
    if(info==1){
      this.myStatus=1;
      this.zhuangche="employeActive";
      this.shouhuo="employeNone";
      //《货主端》根据发货人id查询发货列表
      this.service.mygetOrderChildListBySendId(this.staffId)
          .subscribe(
              data => {
            if(data.code==0){
              this.data=data.data;
              this.isHeadImg(this.data);
            }
          }
      );
    }else{
      this.myStatus=2;
      //《货主端》根据收货人id查询发货列表
      this.service.getOrderChildListByReceiveId(this.staffId)
          .subscribe(
              data => {
            if(data.code==0){
              this.data=data.data;
              this.isHeadImg(this.data);
            }
          }
      );
      this.zhuangche="employeNone";
      this.shouhuo="employeActive";
    }
  }
  //货源信息
  receiptDetails(childNo) {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);
  }
  //轨迹查询
  trajectoryMap(childNO){
    this.router.navigateByUrl("trajectoryMap?childNO="+childNO);

  }
  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }


}
