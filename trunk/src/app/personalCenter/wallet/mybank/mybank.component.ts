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

    constructor(
        public router: Router,
        public service : personalCenterService
    ){
        this.saveDTO=new saveDTO();

    }
    ngOnInit(): void{
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
                    this.isShow=1;//查询银行卡 2添加银行卡
                }else{
                    mui.toast(data.msg ,{ duration:'short', type:'div' });
                }

            });
    }
    //点击添加银行卡
    addBank() {
        this.isShow=2;//查询银行卡 2添加银行卡
    }


}

