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
    public col6bde42:string;//发送颜色
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
        this.col6bde42="";
        this.phone=this.localStorage.getObject("data").mobile;
        this.phone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        //查询意见反馈
        this.service.optionFindList(1)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.data1=data.data;
                    console.log(data.data);
                    for(let i=this.data1.length-1;i>=0;i--){
                        if(this.data1[i].type==2){//content
                            this.data1[i].content=this.ValidateMessage.ValidateMessage+this.data1[i].content
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
                alert("最多同时只可上传6张图片");
                return;
            }
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
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

    //判断input中值是否为空
    isEmpty(){
        if(this.inputValue){
            this.col6bde42="col6bde42";
        }else{
            this.col6bde42="";
        }
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
                        this.col6bde42="";//颜色变空
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

