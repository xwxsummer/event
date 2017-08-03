import {MyGoodsService} from '../my-goods.service';
import {Params, ActivatedRoute,  Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var layui: any;
declare var layer: any;
declare var $: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public datas;
  public dbState:string;
  public pageSize:number=5;//每页显示的条数
  public pageNum:number;//当前第几页
  public totalNum:number;//记录总条数
  public totalPage:number;//总页数
  public childStatus;//状态码
  public title:string = "接单历史";
  public dataRefuse;
  public AdditionalTip=[];
  public isShowDai:boolean;//显示未接单的全部取消
  public isShowJin:boolean;//显示取消剩余的
  public goodsResdue;
  public data;//接单数
  public adress;
  public childNo;//当前取消的子订单号
  public orderNo;//当前取消的主订单号
  public time1;
  public time2;
  public tzpageNum:number=1;//点击要跳转的页
  
  //崔
  public provinces:Array<Province> = new Array;
  public citys:Array<SelectModule> = new Array;
  public countys:Array<SelectModule> = new Array;
  public towns:Array<any> = new Array;

  public receiveProvinces:Array<Province> = new Array;
  public receiveCitys:Array<SelectModule> = new Array;
  public receiveCountys:Array<SelectModule> = new Array;
  public receiveTowns:Array<any> = new Array;
  public provinceName:string;
  public provinceReceiveName:string;

 //按条件取消
    public sumAll:number;//赔偿金额
    public flag0:boolean;//判断加减
    public flag1:boolean;//判断加减
    public flag2:boolean;//判断加减
    public flag3:boolean;//判断加减
    public flag4:boolean;//判断加减
    public isSelectAll:boolean;//判断加减
    public danshu0:number;//单数
    public danshu1:number;//单数
    public danshu2:number;//单数
    public danshu3:number;//单数
    public danshu4:number;//单数
    public timeIntervalList=[];//判断加减

  constructor(
     private activatedRoute: ActivatedRoute,
     public service : MyGoodsService,
     public router:Router
  ) { 
    this.provinces=[new Province("shanxi_taiyuan","山西省"),new Province("shanxi","陕西省"),new Province("neimenggu","内蒙古"),new Province("hebei","河北省"),new Province("shandong","山东省"),new Province("beijing","北京")];
    this.receiveProvinces=[new Province("shanxi_taiyuan","山西省"),new Province("shanxi","陕西省"),new Province("neimenggu","内蒙古"),new Province("hebei","河北省"),new Province("shandong","山东省"),new Province("beijing","北京")];
  }
  changePageNum(pageChange:number){
     this.tzpageNum =  pageChange;
     console.log(this.tzpageNum);
     this.finds();
  }
  //发布
  pay(orderNo){
    this.router.navigateByUrl("content/myGoods/pay/"+orderNo);
  }
  //查看详细
  orderView(childNo){
    console.log(childNo);
    this.router.navigateByUrl("content/myGoods/orderDetailsInfo/"+childNo)
  }
  //点击取消判断状态
  judgeStatus(orderStatus,orderNo,goodsResidue,childNo){
    this.childNo=childNo;
    this.orderNo=orderNo;
    if(orderStatus==2){
      this.isShowDai=true;
      this.isShowJin=false;
      this.goodsResdue=goodsResidue;
      this.showBg();
    }else if(orderStatus==10){
      this.isShowDai=false;
      this.isShowJin=true;
      this.goodsResdue=goodsResidue;
      this.showBg();
    }
  }
  showBg() { 
      var bh = $(".bgc").height(); 
      var bw = $(".bgc").width(); 
      $("#fullbg").css({ 
      height:bh, 
      width:bw, 
      display:"block" 
      }); 
    $("#dialog").show(); 
      } 
  //关闭灰色 jQuery 遮罩 
  closeBg() { 
      $("#fullbg,#dialog").hide(); 
    } 
  cancelAll(){
    $(".shengyu").hide();
    this.service.compensationInfoByMainOrder(this.datas.orderNo)
      .subscribe(data=>{
        if(data.code==0){//成功
           $(".shengyu").show();
          this.data=data.data;
          console.log();
          for(let i=0;i<this.data.orderChildOwnerCancelGroupVOList.length;i++){
            this["danshu"+i]=this.data.orderChildOwnerCancelGroupVOList[i].orderChildCancelCalculateVOList.length
          }
        }else{
          layer.msg(data.msg);
          this.closeBg();
          $("hide").removeClass("layui-show");
        }
      });
  }
  ngOnInit() { 
    this.finds(); 
    //获取取消原因
    this.service.getSystemLabelByType(2)
        .subscribe(data=>{
          if(data.code==0){//成功
            for(let b=0;b<data.data.length;b++){
              this.AdditionalTip.push(false);
            }
            this.dataRefuse=data.data;
          }else{
             alert(data.msg);
          }
    });
  }
  finds(){

    this.activatedRoute.params.subscribe((params:Params)=>{
      this.childStatus=params["id"];
      
      if(this.childStatus==0){
        this.title = "货源历史";
      }
      if(params["id"]==0){
        this.childStatus=null;
      }
      if(this.childStatus==1){
        this.title = "待发布";
      }
      if(this.childStatus==10){
        this.title = "进行中";
      }
      if(this.childStatus==2){
        this.title = "待接单";
      }
      let details = new Details();
  
      details.childStatus=this.childStatus;
      details.page=this.tzpageNum;
      details.orderNo = $("#orderNo").val();
      details.sendName =  $("#sendName").val();
      details.receiveCompany =  $("#receiveCompany").val();
      details.sendCity =  $("#sendCity").val();
      details.receiveCity =  $("#receiveCity").val();
      details.publishTime = $("#startTime").val();
      details.endTime =  $("#endTime").val();
        console.log(details);
      this.service.getOrderInfoListByParam(details).subscribe(
        data =>{
          if(data.code==0){
             console.log(data)
             this.datas = data.data;
             this.totalNum=data.total;
             this.totalPage=data.pageNum;
            //   for(var i=0;i<data.data.length;i++){
            //  this.adress=data.data[i].receiveCity+data.data[i].receiveAddress;
            //  console.log(this.adress);
            //  this.adress=this.adress.substr(0,10)+"...";
            //  }
             if(data.data.length>0){
                 if(data.data[0].insuranceFee) {
                this.dbState = "已担保";
           }else{
             this.dbState = "未担保";
           }
             }
          }else{
            alert(data.msg)
          }
        }
      )
    }); 
  }
  //点击描述
    AdditionalTip_click(info){
        switch(this.AdditionalTip[info]){
          case true:
            this.AdditionalTip[info] = false;
            break;
          case false:
           //如果被激活的大于1个不操作
        if( this.AdditionalTip.filter(i=>i === true).length >= 1 )break;
            this.AdditionalTip[info]=true;  
        }
    }
    goodsCancle(orderNo){
      let label = Array.from(document.querySelectorAll('.special') as NodeListOf<HTMLElement>).map(i=>i.innerText)
      console.log(label);
      if(label){
       this.service.cancelInfoByMainOrder(orderNo,label)
          .subscribe(data=>{
            if(data.code==0){//成功
              layer.msg("取消成功");
              this.closeBg();
              this.router.navigateByUrl("content/myGoods/orderDetails/null");
            }else{
              layer.msg(data.msg)
            }
          });
      }else{
        layer.msg("请选择取消原因");
      }
    }
   //筛选
    form(value){
      //担保状态
      console.log(value);
     
      let details = new Details();
      //  if(value.dbState==""){
      //   details.insurance = 0;
      // }
      //  if(value.dbState=="已担保"){

      //  }
     
      details.childStatus=this.childStatus;
      details.page = 1;
      details.orderNo = value.orderNo;
      details.sendName = value.sendName;
      details.receiveCompany = value.receiveCompany;
      details.sendCity = value.sendCity;
      details.receiveCity = value.receiveCity;
      details.publishTime = $("#startTime").val();
      details.endTime =  $("#endTime").val();

       //add by cuiwanzhe 20170727
      this.getProvinceName(value.sendProvince);//赋值给provinceName
      details.sendProvince = this.provinceName.slice(0,2);
      details.sendCity = value.sendCity.slice(0,2);
      details.sendCounty = value.sendCounty.slice(0,2);
      details.sendTown = value.sendTown.slice(0,2);

      this.getReceiveProvinceName(value.receiveProvince);//赋值给provinceName
      details.receiveProvince = this.provinceReceiveName.slice(0,2);
      details.receiveCity = value.receiveCity.slice(0,2);
      details.receiveCounty = value.receiveCounty.slice(0,2);
      details.receiveTown = value.receiveTown.slice(0,2);

      console.log(details);
      this.service.getOrderInfoListByParam(details).subscribe(
        data =>{
          if(data.code==0){
             console.log(data)
             this.datas = data.data;
             this.totalNum=data.total;//记录总条数
             this.pageNum=data.pageNum;//当前处在的页数
             for(var i=0;i<data.data.length;i++){
             this.adress=data.data[i].receiveCity+data.data[i].receiveAddress;
             this.adress=this.adress.substr(0,12)+"...";
             }
              if(data.data.length>0){
           if(data.data[0].insuranceFee) {
                this.dbState = "已担保";
           }else{
             this.dbState = "未担保";
             }
            }
          }else{
            alert(data.msg)
              }
            }
          )
    }
  //取消剩余的
  cancelRemain(){
    console.log("取消剩余的");
   //根据主单编号取消主单剩余货源
      this.service.cancelInfoByMainOrder(this.orderNo,"")
        .subscribe(data=>{
          if(data.code==0){//成功
            layer.msg("取消成功");
            this.closeBg();
            this.router.navigateByUrl("content/myGoods/orderDetails/null");
          }else{
            layer.msg(data.msg);
          }
            });
    }
  //取消子单需要赔偿金的
  compensation(){    
    layer.msg("需要支付赔偿金的订单");
  }
  //查询中的重置
  clear(){
    $("input").val("");
  }
  //全选
    selectAll(){
        this.timeIntervalList=[];
        this.sumAll=0;
        if(this.isSelectAll){//全选
            for(let x=0;x<$("input").length;x++){
                $("input")[x].checked=true;
            }
            for(let i=0;i<this.data.orderChildOwnerCancelGroupVOList.length;i++){
                this.timeIntervalList.push(this.data.orderChildOwnerCancelGroupVOList[i].timeInterval);
                this.sumAll=this.sumAll+this.data.orderChildOwnerCancelGroupVOList[i].totalCompensation;
            }
            this.flag0=false;
            this.flag1=false;
            this.flag2=false;
            this.flag3=false;
            this.flag4=false;
            this.isSelectAll=!this.isSelectAll;
        }else{
            for(let m=0;m<$("input").length;m++){
                $("input")[m].checked=false;
            }
            this.flag0=true;
            this.flag1=true;
            this.flag2=true;
            this.flag3=true;
            this.flag4=true;
            this.timeIntervalList=[];
            this.sumAll=0;
            this.isSelectAll=!this.isSelectAll;
        }
        console.log(this.timeIntervalList)
    }
    //全选反选
    isSelect(){
        if(!this.flag0&&!this.flag1&&!this.flag2&&!this.flag3&&!this.flag4){
            $("#mySelectAll")[0].checked=true;
            this.isSelectAll=false;
        }else{
            $("#mySelectAll")[0].checked=false;
            this.isSelectAll=true;
        }
    }
   //点击复选框
    checkNO1(timeInterval,totalCompensation){
        if(this.flag1){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag1=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag1=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }//点击复选框
    checkNO2(timeInterval,totalCompensation){
        if(this.flag2){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag2=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag2=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //点击复选框
    checkNO3(timeInterval,totalCompensation){
        if(this.flag3){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag3=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag3=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //点击复选框
    checkNO4(timeInterval,totalCompensation){
        if(this.flag4){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag4=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag4=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
      //确认取消分组订单
    sureCancel(){
        if(this.timeIntervalList.length==0){
            layer.msg("没有选择取消的订单");
        }else{
            this.service.fenzuCancelorderChildOwner(this.orderNo,this.timeIntervalList)
                .subscribe(data=>{
                    if(data.code==0){//成功
                        layer.msg("删除订单成功");
                        console.log(data);
                        this.router.navigateByUrl("market/MyGoods?info=myGoods");
                    }else{
                        layer.msg(data.msg);
                    }
                }
            );
        }
    }
      chooseProvince() {
    this.clearSendChoose(3);
    this.service.getProvinceList($("#sendProvince").val())
      .subscribe(data=>{
          console.log(data);
          this.citys = data;
        }
      );
  }

  chooseCity() {
    this.clearSendChoose(2);
    this.citys.forEach(city =>{
      if(city.name==$("#sendCity").val()){
        this.countys=city.value;
      }
    });
  }

  chooseCounty() {
    this.clearSendChoose(1);
    this.citys.forEach(city =>{
      city.value.forEach(county =>{
        if(county.name==$("#sendCounty").val()){
          // county.value.forEach(town =>{
          // });
          console.log(county.value);
          this.towns=county.value;
        }
      });
    });
  }

  chooseReceiveProvince() {
    this.clearReceiveChoose(3);
    this.service.getProvinceList($("#receiveProvince").val())
      .subscribe(data=>{
          console.log(data);
          this.receiveCitys = data;
        }
      );
  }

  chooseReceiveCity() {
    this.clearReceiveChoose(2);
    this.receiveCitys.forEach(city =>{
      if(city.name==$("#receiveCity").val()){
        this.receiveCountys=city.value;
      }
    });
  }

  chooseReceiveCounty() {
    this.clearReceiveChoose(1);
    this.receiveCitys.forEach(city =>{
      city.value.forEach(county =>{
        if(county.name==$("#receiveCounty").val()){
          console.log(county.value);
          this.receiveTowns=county.value;
        }
      });
    });
  }
   clearSendChoose(flag:number){
    if(flag==1){
      this.towns=[];
    }
    if(flag==2){
      this.countys=[];
      this.towns=[];
    }
    if(flag==3){
      this.citys=[];
      this.countys=[];
      this.towns=[];
    }
  }

  clearReceiveChoose(flag:number){
    if(flag==1){
      this.receiveTowns=[];
    }
    if(flag==2){
      this.receiveCountys=[];
      this.receiveTowns=[];
    }
    if(flag==3){
      this.receiveCitys=[];
      this.receiveCountys=[];
      this.receiveTowns=[];
    }
  }

  getProvinceName(name:string){
    this.provinceName = "";
    this.provinces.forEach(province =>{
      if(name==province.name){
        this.provinceName = province.value;
      }
    });
  }

  getReceiveProvinceName(name:string){
    this.provinceReceiveName = "";
    this.receiveProvinces.forEach(province =>{
      if(name==province.name){
        this.provinceReceiveName = province.value;
      }
    });
  }
}
 export  class Details{
    public insurance:number;
    public childStatus:number;
    public pageSize:number;
    public page:number;
    public receiveId:number;
    public orderNo:number;
    public sendName;
    public sendCity;
    public receiveCity;
    public receiveCompany;
    public publishTime;
    public endTime;
    //add by cuiwanzhe 20170727
    public sendProvince;
    public sendCounty;
    public sendTown;
    public receiveProvince;
    public receiveCounty;
    public receiveTown;
  }
  export class SelectModule{
  public name:string;
  public value:Array<SelectModule> = new Array;
}

export class Province{
  constructor(public name:string,public value:string){
  }
}