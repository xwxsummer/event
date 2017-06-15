import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
declare var mui: any;
declare var $: any;
@Component({
  selector: 'app-receivingConfirm',
  templateUrl: './receivingConfirm.component.html',
  styleUrls: ['./receivingConfirm.component.css']

})
export class ReceivingConfirm implements OnInit{
  public myorder:number;
  public mygoodsBad:number;
  public mytimeout:number;
  public myQS:number;
  public values:number;//皮重
  public values2:number;//毛重
  public jingzhong:number;
  public price: number;
  public info:any;
  public errorMessage:string;
  public data;
  public orderNo: any;
  public myForms: string[];
  public imgList = [];
  public pushImg = [];
  public deductionsList = [];
  public submitlag: boolean;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service: confirmGoodsService
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
          $("input[name=pizhong]").focus().val("");
      }
      let maozh=$("input[name=maozhong]").val(); 
      if(values!=""&&maozh!=""){
        console.log("添加皮重")
        this.jingzhong =this.values2-values;
        this.price = this.jingzhong*this.data.freightPrice;
     } 
   }
  //获取毛重
  onKey2(values2){
    // let m=$("input[name=maozhong]").val();//判断input的值是否为数字
      if(isNaN(values2)){
          mui.toast("只能输入数字");
          $("input[name=maozhong]").focus().val("");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
      }
     let pizh=$("input[name=pizhong]").val();   
     if(values2&&pizh){
       console.log("添加毛重")
        this.jingzhong = values2-this.values;
        this.price = this.jingzhong*this.data.freightPrice;
     }
       
    //this.data.freightPrice}
  }
  //点击扣款显示扣款页面
  DeductMoney(){
    $(".money").show();
    $(".big").hide();
    //打开扣款页面判断用户输入的合法性
    $(".receiving").blur(function(){
          let t=$(this).val();//判断input的值是否为数字
          if(isNaN(t)){
              mui.toast("只能输入数字");
              $(this).focus().val("");
          }
        })
      }
  //添加扣款信息,同时返回主页面
  ReturnPage(myForm){
    $(".money").hide();
    $(".big").show();
     if(this.myorder){
      this.deductionsList.push({"name":"数量不符","value":this.myorder} )
    }
     if(this.mygoodsBad){
      this.deductionsList.push({"name":"货物损坏","value":this.mygoodsBad})
    }
     if(this.mytimeout){
      this.deductionsList.push({"name":"时间超时","value":this.mytimeout})
    }
     if(this.myQS){
      this.deductionsList.push({"name":"参数不达标","value":this.myQS})
    }
    console.log(this.deductionsList);
    this.service.compensation(myForm.spk,this.deductionsList,this.data) .subscribe(
      data =>{
        console.log(this.data)
        if(data.code==0){//success
          }   
        else{
          alert(data.msg)
        }})
  }
  //修改扣款信息
  Recompose(myForm){
    $(".money").hide();
    $(".big").show();
     if(myForm.order){
      this.deductionsList.push({"name":"数量不符","value":myForm.order} )
    }if(myForm.goodsBad){
      this.deductionsList.push({"name":"货物损坏","value":myForm.goodsBad})
    }if(myForm.timeout){
      this.deductionsList.push({"name":"时间超时","value":myForm.timeout})
    }if(myForm.QS){
      this.deductionsList.push({"name":"参数不达标","value":myForm.QS})
    }
  console.log(this.deductionsList)

  this.service.compensationUpdata(myForm.spk,this.deductionsList,this.data) 
    .subscribe(data =>{
        console.log(this.data)
        if(data.code==0){//success
          }   
        else{
          alert(data.msg)
        }})
  }
  //提交数据
  ReceivedSuccess(myForm) {
      if (!myForm.pizhong) {
          mui.toast("皮重不能为空");
          return
      }
      if (!myForm.maozhong) {
          mui.toast("毛重不能为空");
          return
      }
      if (myForm.jingzhong < 0) {
          mui.toast("皮重不能大于毛重,请重新填写");
          $("input[name=pizhong]").val("");
          $("input[name=maozhong]").val("");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
      }
      this.submitlag=true;//不可以点击
      if(this.imgList.length==0){
          this.service.updateConfirmUnLoadByChildNo(myForm,this.pushImg,this.data)
              .subscribe(data => {
                  if(data.code==0){
                      this.router.navigateByUrl("confirmGoods/ReceivedSuccess/"+this.data.childNo);
                  }
                  else{
                      mui.alert(data.msg)
                  }
              this.submitlag=false;//可以点击
              }
              )
      }else{
          let j=0;
          for(let i=0;i<this.imgList.length;i++) {
              this.service.upBase64Image(this.imgList[i]).subscribe(
                      data=>{
                      this.pushImg.push(data.data.pathList[0]);
                      console.log("上传图片");
                      j++;
                      if(j==this.imgList.length){
                          console.log("taijiayishouhou")
                          this.service.updateConfirmUnLoadByChildNo(myForm,this.pushImg,this.data)
                              .subscribe(data => {
                                  if(data.code==0){
                                      this.router.navigateByUrl("confirmGoods/ReceivedSuccess/"+this.data.childNo);
                                  }
                                  else{
                                      mui.alert(data.msg)
                                  }
                              })
                      }
                  })
          }
      }
     }
 
     //}
  //异常处理
  ExceptionHanding() {
     this.router.navigateByUrl("confirmGoods/ExceptionHanding/"+this.data.childNo);
  }
}