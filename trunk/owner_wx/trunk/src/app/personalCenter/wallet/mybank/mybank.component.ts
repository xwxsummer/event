/**
 * Created by Administrator on 2017/5/2 0002.
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Observable }from 'rxjs/Observable';
import { Subject }from 'rxjs/Subject';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
import { saveDTO } from  './saveDTO';
import { cardData } from  './cardData';

declare var mui: any;


@Component({
    selector: 'app-mybank',
    templateUrl: './mybank.component.html',
    styleUrls: ['./mybank.component.css']

})


export class Mybank implements OnInit{
    public data;
    public saveDTO:saveDTO;
    public isShow:number;
    public message:string;//显示的信息
    public cardData:cardData;//银行卡详情
    public showTrue:boolean;//层显示？
    constructor(
        public router: Router,
        public service : personalCenterService
    ){
        this.saveDTO=new saveDTO();
        this.cardData=new cardData();

    }

    ngOnInit(): void{
        this.message="确定要解除,交通银行（尾号5352）的快捷支付功能吗？";
        this.showTrue=false;
        //查询姓名
        this.isShow=1;//查询银行卡 2添加银行卡
        this.service.personalCenterInfo()
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.saveDTO.name=data.data.name;
                }

            });
        //查询银行卡列表
        this.service.bankCardFindList(10000004)
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.data=data.data;
                }
            });
    }

    //添加银行卡
    submitForm() {
        //添加银行卡
        this.service.addbankCard(this.saveDTO)
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.isShow=1;//查询银行卡 2添加银行卡  3管理银行卡
                }else{
                    mui.toast(data.msg ,{ duration:'short', type:'div' });
                }

            });
    }

    //点击银行卡详情
    manangeCard(data) {
        this.isShow=3;//查询银行卡 2添加银行卡
        this.cardData=data;
        console.log(data);
    }
    //点击添加银行卡
    addBank() {
        this.isShow=2;//查询银行卡 2添加银行卡
    }
    //弹出层事件
    cengShow(msg){
        this.showTrue=false;
        if(msg=="1"){
            //this.service.deleteAddress(this.id)
            //    .subscribe(
            //        data => {
            //        if(data.code==0){//成功
            //            this.node.remove();
            //            mui.toast("删除成功",{ duration:'short', type:'div' });
            //        }else{
            //            mui.toast(data.msg,{ duration:'short', type:'div' });
            //        }
            //    });
        }
    }
    //点击管理银行卡
    manageCard(){
        this.showTrue=true;
    }
}

