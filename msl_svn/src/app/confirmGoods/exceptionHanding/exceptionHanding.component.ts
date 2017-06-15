import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-exceptionHanding',
  templateUrl: './exceptionHanding.component.html',
  styleUrls: ['./exceptionHanding.component.css']

})

export class ExceptionHanding implements OnInit{
  public submitlag: boolean;
  public data;
  public orderNo: any;
  public imgList = [];
  public jingzhong: number ;
  public values: number ;
  public price: number ;
  public pushImg = [];
  constructor(
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public titleService: Title,
    public service: confirmGoodsService
  ){}
  ngOnInit(): void{
    this.submitlag=false;//初始化为可以点击
    this.titleService.setTitle('收货异常申请');
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
            if (imgList.length >= 5) {
                mui.alert("最多同时只可上传6张图片");
                return;
            }
     }
   this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
          }
        }
    );
  }
  //打电话
  call(){
    window.open('tel:'+10086);
  }
  removeImage(index){
      this.imgList.splice(index,1);
    }
  ReceivedSuccess(myForm) {
    if(!myForm.speaks){
      mui.alert("异常原因不能为空！");
      return
    }
    this.submitlag=true;//不可以点击
    if(this.imgList.length==0){
        this.service.exception(myForm,this.pushImg,this.data)
                .subscribe(data => {
                  if(data.code==0){
                    this.router.navigateByUrl("confirmGoods/ExceptionSuccess/"+this.activatedRoute.snapshot.params['id']);
                  }else{
                   mui.alert(data.msg)
                  }
                  this.submitlag=false;//可以点击
              }) 
    }else{
      let j=0;
    for(let i=0;i<this.imgList.length;i++) {
        this.service.upBase64Image(this.imgList[i]).subscribe(
          data=>{
            if(data.code==0){
               this.pushImg.push(data.data.pathList[0]);
          console.log("上传图片");
            }else{
              mui.alert(data.msg);
            }
          j++;
          if(j==this.imgList.length){
              this.service.exception(myForm,this.pushImg,this.data)
                .subscribe(data => {
                   if(data.code==0){
                      this.router.navigateByUrl("confirmGoods/ExceptionSuccess/"+this.activatedRoute.snapshot.params['id']);
                    }else{
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


