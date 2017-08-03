/**
 * by于婷
 *
 * ******/

import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
//http
import { personalCenterService } from  '../personalCenter.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
//转换时间
import { formatMsgTime } from  '../../fragment/changeTime';
import { ValidateMessage } from  '../../fragment/validateMessage';//头像拼接

declare var mui: any;
declare var $: any;
//本地缓存
import { LocalStorage } from '../../local_storage';


@Component({
    selector: 'app-optionMind',
    templateUrl: './optionMind.component.html',
    styleUrls: ['./optionMind.component.css']

})

export class OptionMind implements OnInit{
    public inputValue:string;
    public data=[];
    public data1=[];
    public phone:string;
    public formatMsgTime;
    public ValidateMessage;
    public headImg:string;
    constructor(
        public router: Router,
        public titleService: Title,
        public localStorage: LocalStorage,
        public service : personalCenterService
    ){
        this.formatMsgTime=new formatMsgTime();
        this.ValidateMessage=new ValidateMessage();
    }
    ngOnInit(): void{
        this.titleService.setTitle('意见反馈');
        if(this.localStorage.get("myTouxiang")){
            this.headImg=this.ValidateMessage.ValidateMessage+this.localStorage.get("myTouxiang");
        }else{
            this.headImg="../assets/images/headImg.png";
        }
        this.phone=this.localStorage.getObject("data").mobile;
        this.phone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        //查询意见反馈
        this.service.optionFindList(1)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.data1=data.data;
                    console.log(data.data);
                    for(let i=this.data1.length-1;i>=0;i--){
                        if(this.data1[i].type==2){//content
                            this.data1[i].content=this.data1[i].domain+this.data1[i].content
                        }
                        this.data1[i].createTime=this.formatMsgTime.formatMsgTime(this.data1[i].createTime);
                        this.data.push(this.data1[i]);
                    }
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            }
        );
        this.upLoadImg("handChoose");
    }
    //
    //上传图片
    upLoadImg(positiveFile){
        var filechooser = document.getElementById(positiveFile);
        let service = this.service;
        let imgData = this.data;
        filechooser.onchange = function() {
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            if (files.length > 1) {
                return;
            }
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                var Orientation = null;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                //修复ios
                if (navigator.userAgent.match(/iphone/i)) {
                    console.log('iphone');
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if(Orientation != "" && Orientation != 1){
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    }
                }


//对图片旋转处理 added by lzk
                function rotateImg(img, direction,canvas) {
                    //最小与最大旋转方向，图片旋转4次后回到原方向
                    var min_step = 0;
                    var max_step = 3;
                    //var img = document.getElementById(pid);
                    if (img == null)return;
                    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                    var height = img.height;
                    var width = img.width;
                    //var step = img.getAttribute('step');
                    var step = 2;
                    if (step == null) {
                        step = min_step;
                    }
                    if (direction == 'right') {
                        step++;
                        //旋转到原位置，即超过最大值
                        step > max_step && (step = min_step);
                    } else {
                        step--;
                        step < min_step && (step = max_step);
                    }
                    //旋转角度以弧度值为参数
                    var degree = step * 90 * Math.PI / 180;
                    var ctx = canvas.getContext('2d');
                    switch (step) {
                        case 0:
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0);
                            alert(111);
                            break;
                        case 1:
                            canvas.width = height;
                            canvas.height = width;
                            ctx.rotate(degree);
                            ctx.drawImage(img, 0, -height);
                            alert(444);
                            break;
                        case 2:
                            canvas.width = width;
                            canvas.height = height;
                            ctx.rotate(degree);
                            ctx.drawImage(img, -width, -height);
                            alert(333);
                            break;
                        case 3:
                            canvas.width = height;
                            canvas.height = width;
                            ctx.rotate(degree);
                            ctx.drawImage(img, -width, 0);
                            alert(4444);
                            break;
                    }
                }
                imgCompress(file).then(function(result) {
                        service.upBase64Image(<string>result).then(data=>{
                            if(data.json().code==0){
                                //添加意见反馈
                                let uploadImg=data.json().data.domain+data.json().data.pathList[0];
                                service.addFeedBack(data.json().data.pathList[0],"2")
                                    .subscribe(
                                        data => {
                                        if(data.code==0){//成功
                                            imgData.push({"content":uploadImg,"createTime":"刚刚","type":2});
                                        }else{
                                            mui.toast(data.msg,{ duration:'short', type:'div' });
                                        }
                                    }
                                );
                            }
                        });
                });
            })
        };
    }

    //发送数据
    faSong(){
        //有值发送数据
        if(this.inputValue){
            //添加意见反馈
            this.service.addFeedBack(this.inputValue,"1")
                .subscribe(
                    data => {
                    if(data.code==0){//成功
                        this.data.push({"content":this.inputValue,"createTime":"刚刚","type":1});
                        this.inputValue="";//input值清空
                        console.log(this.data);
                    }else{
                        mui.toast(data.msg,{ duration:'short', type:'div' });
                    }

                }
            );
        }
    }
    //查看聊天记录
    WacthOptionMind(){
        //查看聊天记录
        this.router.navigateByUrl("personalCenter/WacthOptionMind");//查看聊天记录
        //

    }

}
