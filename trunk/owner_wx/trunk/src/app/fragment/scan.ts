import { Component,OnInit } from '@angular/core';
import {goodsReceiptService } from '../goodsReceipt/goodsReceipt.service'
declare var wx: any;
declare var mui: any;

export class Scan implements OnInit{
    public data;
    constructor(
        public service:goodsReceiptService
    ){
        
    }
    ngOnInit(){
        this.service.getWeixinJsApiSign(window.location.href)
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log(data)
            this.data=data.data
        }
        else{
                 mui.alert(data.msg)
               }}
         )  
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:this.data.appId, // 必填，公众号的唯一标识
            timestamp: this.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.data.nonceStr, // 必填，生成签名的随机串
            signature: this.data.signature,// 必填，签名，见附录1
            jsApiList: ["scanQRCode","getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(res){
            console.log(res)
            console.log("config信息验证后会执行ready方法")
        })
        wx.error(function(res){
            console.log(res)
            console.log("config信息验证失败会执行error函数")
        })
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
        });
    }
       
}