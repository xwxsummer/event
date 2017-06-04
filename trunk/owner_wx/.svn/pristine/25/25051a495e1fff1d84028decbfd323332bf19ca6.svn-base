
import {Component, ChangeDetectorRef} from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $: any;
import { deliverGoodsService } from './deliverGoods.service';
import { Title }from '@angular/platform-browser';

class info {
    constructor(
      public province:string,
      public city:string,
      public county:string,
      public town:string,
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
  receive =[];
  tips = [];
  public transportationInfo:Object;
  public orderNo:any;
  constructor(
      public router: Router,
      public service : deliverGoodsService,
      public ref: ChangeDetectorRef,
      public titleService: Title
  ){
  }
  ngOnInit() {

      this.titleService.setTitle('发布货源');

      //详情标签
      this.service.getSystemLabelByType().subscribe(data=>this.tips=data.data.map(i=>i.name));

      //$("#endTime").combobox({editable:false});
      let self = this;
      this.getSessionStorage();

      // setInterval(()=>{
      //     $('input[required]').filter(function(){return !this.value}).length === 0?//如果必填项都填了
      //         $('.button[type=submit]').removeAttr('disabled')://启用按钮
      //         $('.button[type=submit]').attr('disabled',true);//禁用按钮
      // },500);

    this.service.findDefault().subscribe(data=>{
        console.log(data);
        self.receive.push(...data.data);
        self.ref.markForCheck();
        self.ref.detectChanges();
        data.data.forEach( (d) => {
            if(d.type === 1) {
              this.sendlist.push(
                new info(d.province,d.city,d.county,d.town,d.address,
                  d.name,
                  d.phone
              ))
            }else{
              this.receivelist.push(
                new info(d.province,d.city,d.county,d.town,d.address,
                  d.name,
                  d.phone
              ))
            }
        })
    });

    //表单校验
      $('#myForm').delegate('input[required]','change',function(){
        const pattern = {
            goodsName:{test:/^[^！^￥^…^（^）^【^】^‘^；^：^”^“^。^，^、^？^《^》]+$/,toast:'请输入正确货物名称'},
            goodsAmount:{test:/^[\d\.]+$/,toast:'请输入数字'},
            goodsPrice:{test:/^[\d\.]+$/,toast:'请输入数字'},
            freightPrice:{test:/^[\d\.]+$/,toast:'请输入数字'},
            endTime:{test:/^[\d\- :]+$/,toast:'请输入时间'},
            latestArrivalTime:{test:/^[\d\- :]+$/,toast:'请输入时间'},
        };
        if( pattern[this.name].test.test(this.value) ){
            //输入有效
            $(this).removeClass('notValid');
            $('.mui-toast-message').click();
        }else{
            //输入无效
            $(this).addClass('notValid');
            mui.toast(pattern[this.name].toast);
        }
        //输入的值都有效
        $('input.notValid').length === 0 &&
        !$('input[required]').get().find(i=>i.value.length === 0) ?
            $('.button[type=button]').removeAttr('disabled'):
            $('.button[type=button]').attr('disabled','disabled');
      })
  }
  //加载后读取sessionStorage数据
  getSessionStorage(){
      setTimeout(()=>{
          let data = JSON.parse(sessionStorage['deliverGoodsInfo'] || '{}');

          this.imgList.push( ...data['imgList'] );
          this.AdditionalTipArr.push( ...data['AdditionalTipArr'] );
          this.remarkText = data['this.remarkText'];
          $('input[name=goodsName]').val( data['goodsName'] || '' );
          $('input[name=goodsAmount]').val( data['goodsAmount'] || '' );
          $('input[name=goodsPrice]').val( data['goodsPrice'] || '' );
          $('input[name=freightPrice]').val( data['freightPrice'] || '' );
          $('input[name=endTime]').val( data['endTime'] || '' );
          $('input[name=latestArrivalTime]').val( data['latestArrivalTime'] || '' );

          $('input').trigger('input');//触发input事件，通知angular
          $('input[required]').trigger('change');
          $('.mui-toast-message').click();
          //console.log(this.imgList);
          //debugger
          // this.changeDetectorRef.markForCheck();
      },300)
}
    //路由前保存input数据到sessionStorage
    saveSessionStorage(){
      let data = {};
        data['imgList'] = this.imgList;
        data['goodsName'] = $('input[name=goodsName]').val();
        data['goodsAmount'] = $('input[name=goodsAmount]').val();
        data['goodsPrice'] = $('input[name=goodsPrice]').val();
        data['freightPrice'] = $('input[name=freightPrice]').val();
        data['endTime'] = $('input[name=endTime]').val();
        data['latestArrivalTime'] = $('input[name=latestArrivalTime]').val();
        data['AdditionalTipArr'] = this.AdditionalTipArr;
        data['this.remarkText'] = this.remarkText;

        sessionStorage['deliverGoodsInfo'] = JSON.stringify(data);
    }

  setImgList(event){
          this.imgList = event;
          console.log(this.imgList)
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
    this.AdditionalTipArr = $('li.mui-table-view-cell.special').get().map(i=>i.innerText);
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
    let dtPicker = new mui.DtPicker();
    dtPicker.show(function (selectItems) {
      //(<HTMLInputElement>document.getElementById("endTime")).value = selectItems.text
        $('#endTime').val(selectItems.text).change();
    })
  }
  showMsg4() {
    let dtPicker = new mui.DtPicker();
    dtPicker.show(function (selectItems) {
      //(<HTMLInputElement>document.getElementById("latestArrivalTime")).value = selectItems.text
        $('#latestArrivalTime').val(selectItems.text).change();
    })
  }
//提交货源
  onSubmit(myForm){
      this.saveSessionStorage();
      // myForm['goodsName']=$('input[name=goodsName]').val();
      // myForm['goodsPrice']=$('input[name=goodsPrice]').val();
      // myForm['goodsAmount']=$('input[name=goodsAmount]').val();
      // myForm['freightPrice']=$('input[name=freightPrice]').val();
      // myForm['endTime']=$('input[name=endTime]').val();
      // myForm['latestArrivalTime']=$('input[name=latestArrivalTime]').val();
    let params = {};
    $('[name]').each((index,val)=>params[val['name']]=val['value']);
    console.log(params);
    console.log('提交');
    this.service.submitOrderInfo(params,this.sendlist,this.receivelist,this.AdditionalTipArr.join('|'),this.receive,this.imgList.map(i=>i.src),this.remarkText)
      .then(data=>{
            sessionStorage["OrderNo"]=data.data;
            data.msg!=="success"?
                mui.alert(data.msg):
                this.router.navigateByUrl("deliverGoods/PublicGoods/"+data.data);
        });
      //.then(data=>console.log(data)||data)
      //.then(data => {this.orderNo = data;debugger})
      //.then(orderNo=>this.router.navigateByUrl("deliverGoods/PublicGoods/"+orderNo));
  }

    //特殊字符
//     stripScript(str) {
//    let pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
//    let s = str.value;
//    let rs = "";
//    for (let i = 0; i < s.length; i++) {
//        rs = rs+s.substr(i, 1).replace(pattern, '');
//    }
//    str.value = rs;
//}


}
