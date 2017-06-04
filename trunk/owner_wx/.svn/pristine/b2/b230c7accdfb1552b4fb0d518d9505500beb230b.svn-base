import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-exceptionHanding',
  templateUrl: './exceptionHanding.component.html',
  styleUrls: ['./exceptionHanding.component.css']

})

export class ExceptionHanding implements OnInit{
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
    public service: confirmGoodsService
  ){}
  ngOnInit(): void{
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
  ReceivedSuccess(myForm) {
    if(!myForm.speaks){
      mui.alert("异常原因不能为空！");
      return
    }
    for(let i=0;i<this.imgList.length;i++) {
        this.service.upBase64Image(this.imgList[i]).subscribe(
          data=>{
          this.pushImg.push(data.data.pathList[0]);
        }) 
       }  
    this.service.exception(myForm,this.pushImg,this.data)
        .subscribe(data => {
           if(data.code==0){//成功
              this.router.navigateByUrl("confirmGoods/ExceptionSuccess/"+this.activatedRoute.snapshot.params['id']);
            }else{
              mui.alert(data.msg)
            }
        }) 
   }
}

