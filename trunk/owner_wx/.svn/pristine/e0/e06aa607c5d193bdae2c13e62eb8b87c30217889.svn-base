import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { myGoodsService } from '../myGoods.service';
import { ValidateMessage } from  '../../fragment/validateMessage';
declare var mui: any;


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']

})

export class Order implements OnInit{
  public data;
  public myShow:boolean;//层显示
  public myMoney:string;//赔偿金额
  public childNo:string;//子订单号码
  public result:string;//取消原因
  public searchValue:string;//搜索框值
  public ValidateMessage;//照片
  public node;//元素
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo: ActivatedRoute,//页面传值
    public service : myGoodsService
  ){
    this.ValidateMessage=new ValidateMessage();
  }
  ngOnInit(): void{
    this.titleService.setTitle('接单查询');
    this.myShow=false;
    this.myMoney="";
    this.childNo="";
    this.searchValue="";
    //货物单号
    //查询接单详情
    this.service.getOrderChildListByParam(this.routeInfo.snapshot.queryParams["number"])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){
                this.data[i].headImg=this.ValidateMessage.headImgUrl+this.data[i].headImg;
              }else{
              }
            }
            console.log(data);
          }
        }
    );
  }
  //我的收货详情
  sourceInfo(childNo) {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+childNo);

  }
  //取消原因
  activate(status,childNo,goodsResidue){
    this.childNo=childNo+"";
    this.node=mui(event.target)[0].parentNode.parentNode;
    //《货主端》根据子单编号获取取消子订单的赔偿金
    this.service.compensationOwnerCancel(childNo)
        .subscribe(
            data => {
          if(data.code==0){//成功
            if(data.data.compensationFee==0){
              mui('#sheet1').popover('toggle');
            }else{
                this.myMoney=data.data.compensationFee;
              this.myShow=true;
            }
            }

          });
    //this.myShow=true;
  }
  //搜索
  search(){
    console.log(this.searchValue);
    if(this.searchValue.length!=0){
      //司机姓名或者车牌号码
      this.service.getOrderChildListByParamFlag(this.routeInfo.snapshot.queryParams["number"],this.searchValue)
          .subscribe(
              data => {
            if(data.code==0){//成功
              this.data=data.data;
              console.log(data);
            }
          }
      );
    }
  }
  //点击确认
  isShow(){
    this.myShow=false;
    this.myMoney="";
    //赔偿金额
    this.router.navigateByUrl("myGoods/CancelGoods?money="+this.myMoney+"&childNo="+this.childNo);
  }
  //点击取消
  isCancel(){
    this.isSpecial0=false;
    this.isSpecial1=false;
    this.isSpecial2=false;
    this.isSpecial3=false;
    this.isSpecial4=false;
    this.isSpecial5=false;
    this.myShow=false;
  }
  //查看司机详情
  driverdetails(driverId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+driverId);
  }
  //点击确认取消
  goodsCancle(){
    if(this.isSpecial0||this.isSpecial1||this.isSpecial2||this.isSpecial4){
      ////《货主端》根据子单编号取消子订单, 返回赔偿金额
      let sheet1=document.getElementById("sheet1");
      sheet1.style.display="none";
      let muiackdrop=document.getElementsByClassName("mui-backdrop")[0];
      let body=document.getElementsByTagName("body")[0];
      body.removeChild(muiackdrop);
      this.service.orderChildOwnerCancel(this.childNo,this.result)
          .subscribe(data=>{
            if(data.code==0){//成功
              this.isSpecial0=false;
              this.isSpecial1=false;
              this.isSpecial2=false;
              this.isSpecial3=false;
              this.isSpecial4=false;
              this.isSpecial5=false;
              this.node.remove();
              mui.toast("取消成功",{ duration:'short', type:'div' });
            }else{
              console.log("4444444444444")
            }
          });
    }else{
      mui.toast("请选择取消原因",{ duration:'short', type:'div' });
    }

  }

  isSpecial0=false;
  isSpecial1=false;
  isSpecial2=false;
  isSpecial3=false;
  isSpecial4=false;
  isSpecial5=false;
//点击取消
  myGoods_cancle0(info,result){
    this.isSpecial0=false;
    this.isSpecial1=false;
    this.isSpecial2=false;
    this.isSpecial3=false;
    this.isSpecial4=false;
    this.isSpecial5=false;
    this[info]=true;
    this.result=result;
    console.log(this.result)
  }
  //轨迹查询
  trajectoryMap(childNo){
    this.router.navigateByUrl("trajectoryMap");
  }

}
