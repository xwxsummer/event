/**
 * Created by 123 on 2017/4/18.
 */

import { Output, EventEmitter, Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {imgCompress} from "./imgCompress";
import {deliverGoodsService} from "../deliverGoods.service";
declare var mui: any;
declare var $: any;

 class imgData{
    constructor(
     public data:string,
     public type:string,
     public src:string
    ){

    }

}

@Component({
    selector: 'app-Remarks',
    templateUrl: './Remarks.component.html',
    styleUrls: ['./Remarks.component.css']
 })

export class Remarks {

    // @Output() updateImg:EventEmitter<number> = new EventEmitter();
    // imgInput:any;

    public imgList: any[] = [];
    public remarkText:string ='';
    public textLength:number = 0;

    @Output()
    imgOutput:EventEmitter<imgData[]> = new EventEmitter();
    @Output()
    textOutput:EventEmitter<string> = new EventEmitter();

    constructor(
        public router: Router,
        public service: deliverGoodsService
    ) {

    }

    RemarksToggle(){
      $('#RemarksToggle').click()//隐藏Remarks
    }
    removeImage(index){
      //console.log(index);
      this.imgList.splice(index,1);
      //this.imgOutput.emit(this.imgList);
      //console.log(this.imgList)
    }
    setRemarkText(textArea){
        if(textArea.value.length>1000){
            textArea.value = textArea.value.slice(0,1000);
        }else{
            this.remarkText = textArea.value;
            this.textLength = textArea.value.length;
            this.textOutput.emit(this.remarkText);
            //console.log(text);
        }
    }

    ngOnInit() {

        $(window).resize(function(){//Android键盘问题修复,当window大小改变时修改margin-bottom
             //mui.toast(document.body.offsetHeight);
            if(document.body.offsetHeight<500){
                $('.box').css('margin-bottom','-20rem');
            }else{
                $('.box').css('margin-bottom','');
            }
        });
        //$(window).resize(function(){//Android键盘问题修复,当window大小改变时修改margin-bottom
        //  mui.toast(window.screen.availHeight);
        //  if(window.screen.availHeight<500){
        //    //  innerHeight
        //    $('.box').css('margin-bottom','-20rem');
        //  }else{
        //    $('.box').css('margin-bottom','');
        //  }
        //});
        //$(window).resize();

        this.imgOutput.emit(this.imgList);
        let filechooser = document.getElementById("file");
        $("#upload")
            .on("touchstart", function() {
                $(this).addClass("touch")
            })
            .on("touchend", function() {
                $(this).removeClass("touch")
            });
        let imgList = this.imgList;
        let service = this.service;
        //var imgOutput = this.imgOutput;
        filechooser.onchange = function() {
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            if (imgList.length >= 6) {
                mui.alert("最多同时只可上传6张图片");
                return;
            }
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                imgCompress(file,0.1).then(function(result) {
                    // var li = document.createElement("li");
                    // $(li).css("background-image", "url(" + result + ")");
                    // $(".img-list").append($(li));
                    // console.log(imgList);
                    //imgList.push(new imgData(<string>result,file.type));
                    service.upBase64Image(<string>result)
                        .then(data=>data.json().data)
                        .then(data=>{
                        console.log(data);
                        imgList.push( new imgData(data["domain"]+data["pathList"],file.type,data["pathList"][0]) );
                    });
                    // imgList.push({data:result,type:file.type});
                    //imgOutput.emit(imgList);

                });
            })
        };
    }

    // readImage(event?:Event) {
    //    console.log('读取图片')
    //    let file = (<HTMLInputElement>event.target).files[0];
    //    if (!/image\/\w+/.test(file.type)) {
    //        console.error("请确保文件为图像类型");
    //        return false;
    //    }
    //    var reader = new FileReader();
    //    reader.readAsDataURL(file);
    //    reader.onload = e => {
    //        this.updateImg.emit ( (<any>e.target).result );
    //        console.log((<any>e.target).result)
    //    }
    // }

}
