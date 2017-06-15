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
//本地缓存
import { LocalStorage } from '../../../local_storage';

declare var mui: any;


@Component({
    selector: 'app-mybank',
    templateUrl: './mybank.component.html',
    styleUrls: ['./mybank.component.css']

})


export class Mybank implements OnInit{
    public data;
    public myData;
    public saveDTO:saveDTO;
    public isShow:number;
    public message:string;//显示的信息
    public cardData:cardData;//银行卡详情
    public showTrue:boolean;//层显示？
    public walletCode:number;//钱包
    constructor(
        public router: Router,
        public localStorage: LocalStorage,
        public service : personalCenterService
    ){
        this.saveDTO=new saveDTO();
        this.cardData=new cardData();
    }

    ngOnInit(): void{
        let self = this;
        this.message="";
        this.showTrue=false;
        //查询姓名
        this.isShow=1;//查询银行卡 2添加银行卡
        this.service.personalCenterInfo()
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.saveDTO.name=data.data.name;
                }

            });
        this.walletCode=parseFloat(this.localStorage.get("walletCode"));
        //查询银行卡列表walletCode
        this.service.bankCardFindList(this.walletCode)
            .subscribe(data=>{
                if(data.code==0){//成功
                    this.data=data.data;
                }
            });
        this.service.wallet(localStorage['walletCode']).subscribe(res=>{
            this.myData=res.data;
        });
        mui.ready(function() {
            console.log("mui ready");
            var activeIndex = 0;// 数字索引
            var resultValue = "";// 密码结果
            var inputList = mui(".input-item");// 所有输入框
            var numberList = mui(".keyboard-number");// 所有数字键

            // 数字键盘点击事件
            mui("#keyboard").on("tap", ".keyboard-number", function() {
                //console.log("tap:",this.innerText);
                addNumber(this.innerText);
            });

            mui("#keyboard").on("tap", ".keboard-action", function() {
                var value = this.getAttribute("data-action");
                switch (value) {
                    case "cancel":
                        if (activeIndex > 0) {
                            cancelNumber();
                        }
                        break;
                    case "reset":
                        resetInput();
                        break;
                }
            });
            // 添加数字
            function addNumber(num) {
                inputList[activeIndex].innerText = "*";
                resultValue += num;
                activeIndex++;
                console.log('password:',resultValue);
                // 检测密码长度
                if (activeIndex >= 6) {
                    self.checkPassword(resultValue);
                    resetInput();
                }
            }
            // 撤销数字
            function cancelNumber() {
                activeIndex--;
                inputList[activeIndex].innerText = "";
                resultValue = resultValue.substring(0, resultValue.length - 1);
            }
            // 密码框置空
            function resetInput() {
                activeIndex = 0;
                resultValue = "";
                mui(".input-item").each(function(index, element) {
                    (<HTMLElement>element).innerText = "";
                });
            }

        });
    }
    //忘记密码
    pw(){

    }
    //添加银行卡
    submitForm() {
        this.saveDTO.userCode=this.walletCode;
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
        this.message="确定要解除"+this.cardData.cardNo+"的快捷支付功能吗？";
    }
    //点击添加银行卡
    addBank() {
        this.isShow=2;//查询银行卡 2添加银行卡
    }
    //弹出层事件
    cengShow(msg){
        this.showTrue=false;
        if(msg==1){
            if(this.myData.pwd==0){//没有设置秘密
                mui.toast("没有设置秘密，请设置秘密",{ duration:'short', type:'div' });
            }else{
                mui('.mui-popover').popover('show');
            }
        }
    }
    //密码请求
    checkPassword(Value){
        this.service.unBinding(this.walletCode,this.cardData.id,Value)
            .subscribe(
                data => {
                if(data.code==0){//成功
                    mui.toast("删除成功",{ duration:'short', type:'div' });
                    this.router.navigateByUrl("personalCenter/Wallet");
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }
            });
    }
    //点击管理银行卡
    manageCard(){
        this.showTrue=true;
    }
    //返回上一页personalCenter/Wallet
    goBack(){
        this.router.navigateByUrl("personalCenter/Wallet");

    }
    //返回主页
    goHome(){
        this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
}

