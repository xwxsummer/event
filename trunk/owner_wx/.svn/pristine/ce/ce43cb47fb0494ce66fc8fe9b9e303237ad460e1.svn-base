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
    }
    wacthOption(){
        //查询意见反馈
        this.service.optionFindList(this.page)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.data1=data.data;
                    for(let i=this.data1.length-1;i>=0;i--){
                        if(this.data1[i].type==2){//content
                            this.data1[i].content=this.ValidateMessage.ValidateMessage+this.data1[i].content
                        }
                        this.data1[i].createTime=this.formatMsgTime.formatMsgTime(this.data1[i].createTime);
                        this.data.push(this.data1[i]);
                    }
                    this.page=++this.page;
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            }
        );
    }

    ngOnInit(): void{
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
        this.col6bde42="";
        this.phone=this.localStorage.getObject("data").mobile;
        this.phone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        //查询意见反馈
        this.wacthOption();

    }
    onScroll(){
        console.log(1111);
    }

    //点击加载更多
    loadingMore(){
        this.wacthOption();
    }

}

