
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {ordertypeService} from '../ordertype.service';
declare var mui: any;
declare var $: any;

@Component({
  selector: 'app-confirm-ordertype',
  templateUrl: './confirm-ordertype.component.html',
  styleUrls: ['./confirm-ordertype.component.css']
})

export class ConfirmOrdertypeComponent implements OnInit{
  public myorder:number;
  public mygoodsBad:number;
  public mytimeout:number;
  public myQS:number;
  public myservice:number;
  public myother1:number;
  public myother2:number;
  public values:number;//皮重
  public values2:number;//毛重
  public jingzhong;
  public price;
  public info:any;
  public errorMessage:string;
  public data;
  public orderNo: any;
  public myForms: string[];
  public imgList = [];
  public pushImg = [];
  public deductionsList = [];//添加扣款数据
  public deductionsList1 = [];//修改后的扣款数据
  public submitlag: boolean;
  public objItem=[];
  public sum=0;
  
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service : ordertypeService
  ){ }
 ngOnInit() {
    this.submitlag=false;//初始化为可以点击
    this.titleService.setTitle('收货信息');
    let imgList = this.imgList;
      $('.addImg').change(function(event){
         if(imgList.length<6){
            imgCompress(event.target.files[0]).then(data=>imgList.push(data));
         }
      })
  let filechooser = document.getElementById("file");
      $("#upload")
            .on("touchstart", function() {
                $(this).addClass("touch")
            })
            .on("touchend", function() {
                $(this).removeClass("touch")
            });
      filechooser.onchange = function() {
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            if (imgList.length >= 6) {
                mui.alert("最多同时只可上传6张图片");
                return;
            }}
  this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data.data);
            //新添加的一段代码，将接口中的扣款明细添加到一个对象里面。
            console.log(data.data.orderChildCompensationVO.orderChildCompensationItemList.length);
            console.log(this.objItem);
          }
        }
    );
   
}
removeImage(index){
      this.imgList.splice(index,1);
    }
  //获取皮重
   onKey1(values){
    // let t=$("input[name=pizhong]").val();//判断input的值是否为数字
      if(isNaN(values)){
          mui.toast("只能输入数字");
          $("input[name=pizhong]").val("");
      }
      let maozh=$("input[name=maozhong]").val(); 
      if(values!=""&&maozh!=""){
        this.jingzhong =this.values2-values;
        this.jingzhong = this.jingzhong.toFixed(2);
        //this.price = this.jingzhong*this.data.freightPrice;
        //this.price = this.price.toFixed(2);
     } 
   }
  //获取毛重
  onKey2(values2){
    // let m=$("input[name=maozhong]").val();//判断input的值是否为数字
      if(isNaN(values2)){
          mui.toast("只能输入数字");
          $("input[name=maozhong]").val("");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
      }
     let pizh=$("input[name=pizhong]").val();   
     if(values2&&pizh){
        this.jingzhong = values2-this.values;
        this.jingzhong = this.jingzhong.toFixed(2);
        //this.price = this.jingzhong*this.data.freightPrice;
       // this.price = this.price.toFixed(2);
     }
  }
  test5(form){
    console.log(form)
    if(isNaN(form)){
       mui.toast("只能输入数字");
        $("input[name=service]").val("");
          $(".money").show();
          $(".big").hide();
          return
    }
  }
   test6(form){
    console.log(form)
    if(isNaN(form)){
       mui.toast("只能输入数字");
        $("input[name=other1]").val("");
          $(".money").show();
          $(".big").hide();
          return
    }
  }
   test7(form){
    console.log(form)
    if(isNaN(form)){
       mui.toast("只能输入数字");
        $("input[name=other2]").val("");
          $(".money").show();
          $(".big").hide();
          return
    }
  }
  //点击扣款显示扣款页面
  DeductMoney(){
    $(".money").show();
    $(".big").hide();
  }
  //添加扣款信息,同时返回主页面
  ReturnPage(myForm){
    console.log(myForm)
    if((this.myservice&&this.myservice==0)||(this.myother1&&this.myother1==0)||(myForm.other2&&myForm.other2==0)) {
        mui.toast("扣款金额不能为0");
        $(".money").show();
        $(".big").hide();
        return
    }
    if((!myForm.spk&&this.myother1)||(!myForm.spk&&this.myother2)){
        mui.toast("请在扣款说明里填写其他费用的扣款原因")
        $(".money").show();
        $(".big").hide();
        return
    }
    // this.check(myForm);
    this.deductionsList=[];
    //总扣款数
     if(this.myservice){
      this.deductionsList.push({"name":"装车费","value":this.myservice})
    }
     if(this.myother1){
      this.deductionsList.push({"name":"其他费用1","value":this.myother1})
    }
     if(this.myother2){
      this.deductionsList.push({"name":"其他费用2","value":this.myother2})
    }
    
    this.service.compensation(myForm.spk,this.deductionsList,this.data) .subscribe(
      data =>{
        console.log(this.data)
        if(data.code==0){
          $(".money").hide();
          $(".big").show();
        }   
        else{
          mui.toast(data.msg)
        }})
       
  }
  //修改扣款信息
  Recompose(myForm){
      if((this.myorder&&this.myorder==0)||(this.mygoodsBad&&this.mygoodsBad==0)||(this.mytimeout&&this.mytimeout==0)||(this.myQS&&this.myQS==0)||(this.myservice&&this.myservice==0)||(this.myother1&&this.myother1==0)||(myForm.other2&&myForm.other2==0)) {
          mui.toast("扣款金额不能为0");
          $(".money").show();
          $(".big").hide();
          return
  }
      if((!myForm.spk&&this.myother1)||(!myForm.spk&&this.myother2)){
       mui.toast("请在扣款说明里填写其他费用的扣款原因")
        $(".money").show();
        $(".big").hide();
        return
    }
    //this.check(myForm);

    this.deductionsList1=[];
     if(this.myservice){
      this.deductionsList1.push({"name":"装车费","value":this.myservice})
    }
     if(this.myother1){
      this.deductionsList1.push({"name":"其他费用1","value":this.myother1})
    }
     if(this.myother2){
      this.deductionsList1.push({"name":"其他费用2","value":this.myother2})
    }
    
    this.service.compensationUpdata(myForm.spk,this.deductionsList1,this.data) 
        .subscribe(data =>{
            console.log(this.data)
            if(data.code==0){
              $(".big").show();
              $(".money").hide();     
              }   
            else{
              mui.toast(data.msg)
            }
        })
      }
  //提交数据
  ReceivedSuccess(myForm) {
       if(!myForm.pizhong||myForm.pizhong<1) {
          mui.toast("皮重不能为空,为0或者负数");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
    }
       if(!myForm.maozhong||myForm.maozhong<1) {
          mui.toast("毛重不能为空,为0或者负数");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
    }
      if (myForm.jingzhong < 0) {
          mui.toast("皮重不能大于毛重,请重新填写");
          $("input[name=pizhong]").val("");
          $("input[name=maozhong]").val("");
          $("input[name=jingzhong]").val("");
          return
      }
      this.submitlag=true;//不可以点击
      if(this.imgList.length==0){
          this.service.updateConfirmUnLoadByChildNo1(myForm,this.pushImg,this.data)
              .subscribe(data => {
                  if(data.code==0){
                      this.router.navigateByUrl("ordertype/orderSuccess/"+this.data.childNo);
                  }
                  else{
                    mui.alert(data.msg)
                    this.submitlag=false;//可以点击
                  }
                }
              )
      }else{
          let j=0;
          for(let i=0;i<this.imgList.length;i++) {
              this.service.upBase64Image(this.imgList[i]).subscribe(
                      data=>{
                      this.pushImg.push(data.data.pathList[0]);
                      j++;
                      if(j==this.imgList.length){
                          this.service.updateConfirmUnLoadByChildNo1(myForm,this.pushImg,this.data)
                              .subscribe(data => {
                                  if(data.code==0){
                                      this.router.navigateByUrl("ordertype/orderSuccess/"+this.data.childNo);
                                  }
                                  else{
                                  mui.toast(data.msg)
                                  this.submitlag=false;//可以点击
                                  }        
                          })
                      }
                  })
          }
      }
     }
  //关闭扣款
  goBack(){
    $(".money").hide();
    $(".big").show();
  }
}
