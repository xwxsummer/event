/**
 * Created by CLX on 2017/5/15.
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { myGoodsService } from '../myGoods.service';
declare var mui: any;
declare var $ : any;
@Component({
    selector: 'app-cancelInfoOrderAll',
    templateUrl: './cancelInfoOrderAll.component.html',
    styleUrls: ['../myGoods.component.css'],
    providers:[ myGoodsService ]
})

export class CancelInfoOrderAll implements OnInit{
    public info:string;//判断显示
    public orderNo:string;//订单编号
    public goodsResidue:string;//剩余货物
    public cancelReason:string;//剩余货物
    public sumAll:number;//赔偿金额
    public flag0:boolean;//判断加减
    public flag1:boolean;//判断加减
    public flag2:boolean;//判断加减
    public flag3:boolean;//判断加减
    public flag4:boolean;//判断加减
    public isSelectAll:boolean;//判断加减
    public danshu0:number;//单数
    public danshu1:number;//单数
    public danshu2:number;//单数
    public danshu3:number;//单数
    public danshu4:number;//单数
    public timeIntervalList=[];//判断加减
    public data;
    constructor(
        public router: Router,
        public titleService: Title,
        public routeInfo:ActivatedRoute,//页面间传值
        public service : myGoodsService
    ){

    }

    ngOnInit(): void {
        this.cancelReason="";
        this.sumAll=0;
        this.flag0=true;
        this.flag1=true;
        this.flag2=true;
        this.flag3=true;
        this.flag4=true;
        this.isSelectAll=true;
        this.danshu0=0;
        this.danshu1=0;
        this.danshu2=0;
        this.danshu3=0;
        this.danshu4=0;
        this.info=this.routeInfo.snapshot.queryParams["info"];
        this.orderNo=this.routeInfo.snapshot.queryParams["orderNo"];
        this.goodsResidue=this.routeInfo.snapshot.queryParams["goodsResidue"];
        if(this.info=='1'){
            this.titleService.setTitle('取消剩余货单');
        }
        if(this.info=='3'){
            this.titleService.setTitle('取消全部货单');
            this.service.compensationInfoByMainOrder(this.orderNo)
                .subscribe(data=>{
                    if(data.code==0){//成功
                       this.data=data.data;
                        for(let i=0;i<this.data.orderChildOwnerCancelGroupVOList.length;i++){
                            this["danshu"+i]=this.data.orderChildOwnerCancelGroupVOList[i].orderChildCancelCalculateVOList.length
                        }
                        }else{
                        mui.toast(data.msg ,{ duration:'short', type:'div' });
                        this.router.navigateByUrl("market/MyGoods?info=myGoods");//跳到我的货源
                    }

                });
        }

    }
    //全选反选
    isSelect(){
        if(!this.flag0&&!this.flag1&&!this.flag2&&!this.flag3&&!this.flag4){
            $("#mySelectAll")[0].checked=true;
            this.isSelectAll=false;
        }else{
            $("#mySelectAll")[0].checked=false;
            this.isSelectAll=true;
        }
    }

    //点击复选框
    checkNO0(timeInterval,totalCompensation){
        if(this.flag0){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag0=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag0=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //点击复选框
    checkNO1(timeInterval,totalCompensation){
        if(this.flag1){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag1=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag1=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }//点击复选框
    checkNO2(timeInterval,totalCompensation){
        if(this.flag2){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag2=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag2=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //点击复选框
    checkNO3(timeInterval,totalCompensation){
        if(this.flag3){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag3=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag3=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //点击复选框
    checkNO4(timeInterval,totalCompensation){
        if(this.flag4){
            this.sumAll=this.sumAll+totalCompensation;
            this.timeIntervalList.push(timeInterval);
            this.flag4=false;
            this.isSelect();
        }else{
            this.sumAll=this.sumAll-totalCompensation;
            this.flag4=true;
            for(let s=0;s<this.timeIntervalList.length;s++){
                if(this.timeIntervalList[s]==timeInterval){
                    this.timeIntervalList.splice(s,1);
                }
            }
            this.isSelect();
        }
        console.log(this.timeIntervalList);
    }
    //确认取消分组订单
    sureCancel(){
        if(this.timeIntervalList.length==0){
            mui.toast("没有选择取消的订单",{ duration:'short', type:'div' });

        }else{
            this.service.fenzuCancelorderChildOwner(this.orderNo,this.timeIntervalList)
                .subscribe(data=>{
                    if(data.code==0){//成功
                        mui.toast("删除订单成功",{ duration:'short', type:'div' });
                        console.log(data);
                        this.router.navigateByUrl("market/MyGoods?info=myGoods");
                    }else{
                        mui.toast(data.msg,{ duration:'short', type:'div' });
                    }
                });
        }

    }
    //根据主单编号取消主单剩余货源
    goodsCancle(){
        this.service.cancelInfoByMainOrder(this.orderNo,this.cancelReason)
            .subscribe(data=>{
                if(data.code==0){//成功
                    mui.toast("删除成功",{ duration:'short', type:'div' });
                    this.router.navigateByUrl("market/MyGoods?info=myGoods");
                }else{
                    mui.toast(data.msg,{ duration:'short', type:'div' });
                }
            });
    }
    //全选
    selectAll(){
        this.timeIntervalList=[];
        this.sumAll=0;
        if(this.isSelectAll){//全选
            for(let x=0;x<$("input").length;x++){
                $("input")[x].checked=true;
            }
            for(let i=0;i<this.data.orderChildOwnerCancelGroupVOList.length;i++){
                this.timeIntervalList.push(this.data.orderChildOwnerCancelGroupVOList[i].timeInterval);
                this.sumAll=this.sumAll+this.data.orderChildOwnerCancelGroupVOList[i].totalCompensation;
            }
            this.flag0=false;
            this.flag1=false;
            this.flag2=false;
            this.flag3=false;
            this.flag4=false;
            this.isSelectAll=!this.isSelectAll;
        }else{
            for(let m=0;m<$("input").length;m++){
                $("input")[m].checked=false;
            }
            this.flag0=true;
            this.flag1=true;
            this.flag2=true;
            this.flag3=true;
            this.flag4=true;
            this.timeIntervalList=[];
            this.sumAll=0;
            this.isSelectAll=!this.isSelectAll;
        }




        console.log(this.timeIntervalList)
    }
}
