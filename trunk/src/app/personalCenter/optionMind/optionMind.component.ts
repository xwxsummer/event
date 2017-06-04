/**
 * by于婷
 *
 * ******/

import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;

@Component({
    selector: 'app-optionMind',
    templateUrl: './optionMind.component.html',
    styleUrls: ['./optionMind.component.css']

})

export class OptionMind implements OnInit{
    public inputValue:string;
    public data=[];
    public col6bde42:string;//发送颜色
    constructor(
        public router: Router,
        public service : personalCenterService
    ){

    }
    ngOnInit(): void{
        this.col6bde42="";
        //查询意见反馈
        this.service.optionFindList()
            .subscribe(
                data => {
                if(data.code==0){//成功
                   console.log(data);

                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }

            }
        );

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
            this.service.addFeedBack(this.inputValue)
                .subscribe(
                    data => {
                    if(data.code==0){//成功
                        this.data.push({"content":this.inputValue,"type":1});
                        this.inputValue="";//input值清空
                        this.col6bde42="";//颜色变空
                    }else{
                        mui.toast(data.msg,{ duration:'short', type:'div' });
                    }

                }
            );
        }
    }
    submitForm():void {
        //跳到审核页面
        //this.service.conpanyCertifi(this.authInfoDTO);

    }

}

