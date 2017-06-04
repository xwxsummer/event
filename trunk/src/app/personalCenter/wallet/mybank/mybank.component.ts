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
     //��ѯ����
        this.isShow=1;//��ѯ���п� 2������п�
        this.service.personalCenterInfo()
            .subscribe(data=>{
                if(data.code==0){//�ɹ�
                    this.saveDTO.name=data.data.name;
                }

            });
        //��ѯ���п��б�
        this.service.bankCardFindList(10000004)
            .subscribe(data=>{
                if(data.code==0){//�ɹ�
                    this.data=data.data;
                }
            });
        }

   //������п�
    submitForm() {
        //������п�
        this.service.addbankCard(this.saveDTO)
            .subscribe(data=>{
                if(data.code==0){//�ɹ�
                    this.isShow=1;//��ѯ���п� 2������п�
                }else{
                    mui.toast(data.msg ,{ duration:'short', type:'div' });
                }

            });
    }
    //���������п�
    addBank() {
        this.isShow=2;//��ѯ���п� 2������п�
    }


}

