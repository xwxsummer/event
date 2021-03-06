import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;
import { saoyisaoService } from '../saoyisao.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { imgCompress } from "app/deliverGoods/Remarks/imgCompress";

@Component({
  selector: 'app-zhuangCheInfo',
  templateUrl: './zhuangCheInfo.component.html',
  styleUrls: ['./zhuangCheInfo.component.css']

})

export class ZhuangCheInfo implements OnInit{
  public values:number;
  public values2:number;
  public jingzhong;
  public price;
  public info:any;
  public data;
  public myForms: string[];
  public errorMessage: string;
  public submitlag: boolean;
  public imgList = [];
  public pushImg = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service : saoyisaoService
  ){ }
  ngOnInit():void{
    console.log(typeof 23.33454.toFixed(2));
    this.submitlag=false;//默认可以点击
    this.titleService.setTitle('装车信息');
    console.log(this.activatedRoute.snapshot.params['id']);

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
          if(data.code==0){
            this.data=data.data;
          }else{
            mui.alert(data.msg)
          }
        }
    );
  }
  //在页面上移除图片
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
      console.log(values);
      console.log(maozh)
      if(values!=""&&maozh!=""){
        console.log("添加皮重")
        this.jingzhong =this.values2-values;
        this.jingzhong = this.jingzhong.toFixed(2);
        this.price = this.jingzhong*this.data.freightPrice;
        this.price = this.price.toFixed(2);
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
        this.jingzhong = this.jingzhong.toFixed(2);
        this.price = this.jingzhong*this.data.freightPrice;
        this.price = this.price.toFixed(2);
     }
  }
//装车成功
  ZhuangcheSuccess(myForm) {
    console.log(myForm);
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
    if(myForm.jingzhong<0) {
       mui.toast("皮重不能大于毛重,请重新填写");
       $("input[name=pizhong]").val("");
       $("input[name=maozhong]").val("");
       $("input[name=jingzhong]").val("");
       $("input[name=yunfei]").val("");
       return
    }
    this.submitlag=true;//不可以点击
    if(this.imgList.length==0){
    this.service.updateConfirmLoadByChildNo(myForm,this.pushImg,this.data).subscribe(
        data => {
        if(data.code==0){
            this.router.navigateByUrl("saoYiSao/ZhuangcheSuccess/"+this.data.childNo); 
        }
        else{
           mui.alert(data.msg)
               }
          this.submitlag=false;//可以点击
        }
      )
    }
    else{
          let j=0;
          for(let i=0;i<this.imgList.length;i++) {
              this.service.upBase64Image(this.imgList[i]).subscribe(
                      data=>{
                      this.pushImg.push(data.data.pathList[0]);
                      j++;
                      if(j==this.imgList.length){
                          this.service.updateConfirmLoadByChildNo(myForm,this.pushImg,this.data)
                              .subscribe(data => {
                                  if(data.code==0){
                                      this.router.navigateByUrl("saoYiSao/ZhuangcheSuccess/"+this.data.childNo); 
                                  }
                                  else{
                                      mui.alert(data.msg)
                                  }
                                  this.submitlag=false;//可以点击
                              })
                      }
                })
          }
      }
  }
}
