
import {Component, ChangeDetectorRef} from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $: any;
import { deliverGoodsService } from  './deliverGoods.service';


class info {
    constructor(
      public city:string,
      public county:string,
      public address:string,
      public name:string,
      public phone:string
    ){}
}
@Component({
  selector: 'app-deliverGoods',
  templateUrl: './deliverGoods.component.html',
  styleUrls: ['./deliverGoods.component.css'],
  providers:[ deliverGoodsService ]

})
export class DeliverGoods {
  phone = "";
  name = "";
  address = "";
  receivelist = [];
  sendlist = [];
  imgList = [];
  remarkText = '';
  public transportationInfo:Object;
  public orderNo:any;
  constructor(
      public router: Router,
      public service : deliverGoodsService,
      public changeDetectorRef: ChangeDetectorRef
  ){
  }
  ngOnInit() {
      this.getSessionStorage();

      // setInterval(()=>{
      //     $('input[required]').filter(function(){return !this.value}).length === 0?//如果必填项都填了
      //         $('.button[type=submit]').removeAttr('disabled')://启用按钮
      //         $('.button[type=submit]').attr('disabled',true);//禁用按钮
      // },500);

    this.service.findDefault().subscribe(data=>{
        console.log(data);
        data.data.forEach( (d) => {
            if(d.type === 1) {
              this.sendlist.push(
                new info(d.city,d.county,d.address,
                  d.name,
                  d.phone
              ))
            }else{
              this.receivelist.push(
                new info(d.city,d.county,d.address,
                  d.name,
                  d.phone
              ))
            }
        })
    });
  }
  //加载后读取sessionStorage数据
  getSessionStorage(){
      setTimeout(()=>{
          //this.imgList = JSON.parse(sessionStorage['imgList']|| '[]' );
          $('input[name=goodsName]').val( sessionStorage['goodsName'] || '' );
          $('input[name=goodsAmount]').val( sessionStorage['goodsAmount'] || '' );
          $('input[name=goodsPrice]').val( sessionStorage['goodsPrice'] || '' );
          $('input[name=freightPrice]').val( sessionStorage['freightPrice'] || '' );
          $('input[name=endTime]').val( sessionStorage['endTime'] || '' );
          $('input[name=latestArrivalTime]').val( sessionStorage['latestArrivalTime'] || '' );
          $('input[required]').trigger('input');//触发input事件，通知angular
          //console.log(this.imgList);
          //debugger
          // this.changeDetectorRef.markForCheck();
      },300)
}
    //路由前保存input数据到sessionStorage
    saveSessionStorage(){
        //sessionStorage['imgList'] = JSON.stringify(this.imgList);
        sessionStorage['goodsName'] = $('input[name=goodsName]').val();
        sessionStorage['goodsAmount'] = $('input[name=goodsAmount]').val();
        sessionStorage['goodsPrice'] = $('input[name=goodsPrice]').val();
        sessionStorage['freightPrice'] = $('input[name=freightPrice]').val();
        sessionStorage['endTime'] = $('input[name=endTime]').val();
        sessionStorage['latestArrivalTime'] = $('input[name=latestArrivalTime]').val();
    }

  setImgList(event){
          this.imgList = event;
          //console.log(this.imgList)
  }
  setRemarkText(text){
    this.remarkText = text;
    //console.log(this.remarkText)
  }

  Shipmentdetails(type){
    //this.router.navigateByUrl("personalCenter/ManageReceive");
      this.saveSessionStorage();
    this.router.navigateByUrl("personalCenter/ManageReceive?type="+type);
    console.log(type)
  }
  //Remarks
  Remarks(){
      this.saveSessionStorage();
    this.router.navigateByUrl("deliverGoods/Remarks");
  }


//备注组件
appRemarksToggle(){
    mui('#appRemarks').popover('toggle');
}
//其他描述组件
AdditionalTip = [false,false,false,false,false,false];//所有描述
old_AdditionalTip = this.AdditionalTip.slice();//之前被激活的描述，用于取消
AdditionalTipArr = [];//用于传递的文本值
//激活
AdditionalTip_activate(){
    //还原取消前的值
    this.old_AdditionalTip.forEach((value,index)=>{this.AdditionalTip[index]=value});
    mui('#sheet1').popover('toggle');
    this.old_AdditionalTip = this.AdditionalTip.slice();
  }
//点击描述
AdditionalTip_click(info){
    switch(this.AdditionalTip[info]){
      case true:
        this.AdditionalTip[info] = false;
        break;
      case false:
        //如果被激活的大于三个不操作
        if( this.AdditionalTip.filter(i=>i === true).length >= 3 )break;
        this.AdditionalTip[info]=true;
    }
  }
 //点击确定
AdditionalTip_confirm(){
    this.AdditionalTipArr = Array.from(document.querySelectorAll('li.mui-table-view-cell.special') as NodeListOf<HTMLElement>).map(i=>i.innerText)
    //保存当前值用于取消
    this.old_AdditionalTip = this.AdditionalTip.slice();
    mui('#sheet1').popover('hide');
}
//点击取消
AdditionalTip_colse(){
   mui('#sheet1').popover('hide');
}

  showMsg3(){
    //var dtpicker = new mui.DtPicker({
    //  "type": "date",
    //  "customData": {
    //    "Mon": [
    //      { value: "Mon", text: "Day" }
    //    ]
    //  }
    //})
    //dtpicker.show(function(e) {
    //  console.log(e.value)
    //  document.getElementById("date").innerHTML=e.value;
    //})
    var dtPicker = new mui.DtPicker();
    dtPicker.show(function (selectItems) {
      (<HTMLInputElement>document.getElementById("endTime")).value = selectItems.text
    })
  }
  showMsg4() {
    var dtPicker = new mui.DtPicker();
    dtPicker.show(function (selectItems) {
      (<HTMLInputElement>document.getElementById("latestArrivalTime")).value = selectItems.text
    })
  }
//提交货源
  onSubmit(myForm){
      // myForm['goodsName']=$('input[name=goodsName]').val();
      // myForm['goodsPrice']=$('input[name=goodsPrice]').val();
      // myForm['goodsAmount']=$('input[name=goodsAmount]').val();
      // myForm['freightPrice']=$('input[name=freightPrice]').val();
      // myForm['endTime']=$('input[name=endTime]').val();
      // myForm['latestArrivalTime']=$('input[name=latestArrivalTime]').val();

    console.log(myForm);
    console.log('提交');
    this.service.submitOrderInfo(myForm,this.sendlist,this.receivelist,this.AdditionalTipArr.join('|'))
      .then(data=>{
            data = data.json();
            data.msg!=="success"?
                mui.alert(data.msg):
                this.router.navigateByUrl("deliverGoods/PublicGoods/"+data.data);
        });
      //.then(data=>console.log(data)||data)
      //.then(data => {this.orderNo = data;debugger})
      //.then(orderNo=>this.router.navigateByUrl("deliverGoods/PublicGoods/"+orderNo));
  }
}
