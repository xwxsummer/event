/**
 * Created by CLX on 2017/5/22.
 */
//wacthOptionMind.component
/**
 * by于婷
 *
 * ******/

import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { uploading } from '../../fragment/uploading';

//http
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;
declare var $: any;
//本地缓存
import { LocalStorage } from '../../local_storage';
import { ValidateMessage } from  '../../fragment/validateMessage';//头像拼接
//转换时间
import { formatMsgTime } from  '../../fragment/changeTime';
@Component({
    selector: 'app-wacthOptionMind',
    templateUrl: './wacthOptionMind.component.html',
    styleUrls: ['../optionMind/optionMind.component.css']

})

export class WacthOptionMind implements OnInit{
    public inputValue:string;
    public data=[];
    public data1=[];
    public col6bde42:string;//发送颜色
    public phone:string;
    public formatMsgTime;
    public ValidateMessage;
    public uploading:uploading;//点击加载更多
    public headImg:string;//货主头像
    public page:number;//货主头像
    constructor(
        public router: Router,
        public titleService: Title,
        public localStorage: LocalStorage,
        public service : personalCenterService
    ){
        this.formatMsgTime=new formatMsgTime();
        this.ValidateMessage=new ValidateMessage();
        this.uploading=new uploading(1,false,3,"");

    }
    wacthOption(){
        //查询意见反馈
        this.service.optionFindList(this.uploading.page)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.data1=data.data;
                    this.uploading.isLoading=false;
                    if(this.data1.length==0){
                        this.uploading.loadingMore="已经到底了";
                    }else{
                        this.uploading.loadingMore="";
                    }
                    for(let i=this.data1.length-1;i>=0;i--){
                        if(this.data1[i].type==2){//content
                            this.data1[i].content=this.data1[i].domain+this.data1[i].content
                        }
                        this.data1[i].createTime=this.formatMsgTime.formatMsgTime(this.data1[i].createTime);
                        this.data.push(this.data1[i]);
                    }
                    this.uploading.page=this.uploading.page+1;
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            }
        );
    }
    //刷新页面
    uploadInfo(){
        this.uploading.page=1;
        //查询货源列表
        //查询意见反馈
        this.service.optionFindList(this.uploading.page)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.data1=data.data;
                    if(this.data1.length==0){
                        this.uploading.noneIfno=2;
                    }else{
                        this.uploading.noneIfno=1;
                    }
                    for(let i=this.data1.length-1;i>=0;i--){
                        if(this.data1[i].type==2){//content
                            this.data1[i].content=this.ValidateMessage.ValidateMessage+this.data1[i].content
                        }
                        this.data1[i].createTime=this.formatMsgTime.formatMsgTime(this.data1[i].createTime);
                        this.data.push(this.data1[i]);
                    }
                    this.uploading.page=this.uploading.page+1;
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            }
        );
    }
    ngOnInit(): void{
        let self = this;
        this.titleService.setTitle('反馈记录');
        this.page=1;
        //获得元素
        let wai =document.getElementById("外层滚动容器wai");
        let content = document.getElementById("承载内容列表content");
        if(this.localStorage.get("myTouxiang")){
            this.headImg=this.ValidateMessage.ValidateMessage+this.localStorage.get("myTouxiang");
        }else{
            this.headImg="../assets/images/headImg.png";
        }
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        this.uploadInfo();
        this.col6bde42="";
        this.phone=this.localStorage.getObject("data").mobile;
        this.phone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        $('.mui-scroll-wrapper').on('touchend',function(){
            let viewH =$(this).height(),//内容可见高度
                contentH =$(this).get(0).scrollHeight,//滚动当前距底部高度
                totalHeight =$(this).children().height(),//内容总高度
                scrollTop =$(this).scrollTop();//滚动高度
            if(contentH - viewH - scrollTop <= 80) { //到达底部100px时,加载新内容
                //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
                // 这里加载数据..
                self.moreInfo();
            }else if(contentH-totalHeight >= 80){
                console.log('下拉刷新');
                self.uploadInfo();
                $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
                setTimeout(()=>{
                    $('.mui-pull-loading').remove();
                    mui.toast('刷新成功');
                },1000);

            }

        });


    }

    //点击加载更多
    moreInfo(){
        this.uploading.isLoading=true;
        this.wacthOption();
    }

}

