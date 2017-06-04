import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
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
  public values:number;
  public values2:number;
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
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public service: confirmGoodsService
  ){ }
ngOnInit() {
 let imgList = this.imgList;
      $('.addImg').change(function(event){
        imgCompress(event.target.files[0]).then(data=>imgList.push(data));
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
            if (imgList.length >= 5) {
                mui.alert("最多同时只可上传6张图片");
                return;
            }
     }
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
     let t=$("input[name=pizhong]").val();//判断input的值是否为数字
      if(isNaN(t)){
          mui.alert("只能输入数字");
          $("input[name=pizhong]").focus().val("");
      }
   }
  //获取毛重
  onKey2(values2){
     let m=$("input[name=maozhong]").val();//判断input的值是否为数字
      if(isNaN(m)){
          mui.alert("只能输入数字");
          $("input[name=maozhong]").focus().val("");
      }
      let p=$("input[name=pizhong]").val();
     
    if(!this.values||!values2||isNaN(m))
        {return}
    else if(m<p){
        mui.alert("毛重不能小于皮重")
        $("input[name=maozhong]").focus().val("");
        return
      }else{
       this.jingzhong = values2-this.values;
       this.price = this.jingzhong*this.data.freightPrice;
    }
  }
  //点击扣款显示扣款页面
  DeductMoney(){
    // mui('.money').popover('toggle');
    $(".money").show();
    $(".big").hide();
    //打开扣款页面判断用户输入的合法性
    $(".receiving").blur(function(){
          let t=$(this).val();//判断input的值是否为数字
          if(isNaN(t)){
              mui.alert("只能输入数字");
              $(this).focus().val("");
          }
          // if(parseInt(($(this).val())<0){
          //    mui.alert("不能输入负数");
          //    $(this).focus().val("");
          // }
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
    // this.service.compensation(myForm.spk,this.deductionsList,this.data) .subscribe(
    //   data =>{
    //     console.log(this.data)
    //     if(data.code==0){//success
    //       }   
    //     else{
    //       alert(data.msg)
    //     }})
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
     if(!myForm.pizhong) {
       mui.alert("皮重不能为空");
       return
      }
    else if(!myForm.maozhong){
      mui.alert("毛重不能为空")
      return
    }
  //上传图片   
  for(let i=0;i<this.imgList.length;i++) {
      this.service.upBase64Image(this.imgList[i]).subscribe(
        data=>{
        this.pushImg.push(data.data.pathList[0]);
      })
    }
  this.service.updateConfirmUnLoadByChildNo(myForm,this.pushImg,this.data)
      .subscribe(data => {
          if(data.code==0){//success
             this.router.navigateByUrl("confirmGoods/ReceivedSuccess/"+this.data.childNo); 
            }   
          else{
             mui.alert(data.msg)
            }
        })
     }
  //异常处理
  ExceptionHanding() {
     this.router.navigateByUrl("confirmGoods/ExceptionHanding/"+this.data.childNo);
  }
}
