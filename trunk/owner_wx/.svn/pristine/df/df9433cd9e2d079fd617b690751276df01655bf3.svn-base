/**
 * 于婷
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
//本地缓存
import { LocalStorage } from '../../../local_storage';
declare var mui: any;


@Component({
    selector: 'app-watchContact',
    templateUrl: './watchContact.component.html',
    styleUrls: ['./watchContact.component.css']

})

export class WatchContact implements OnInit{
    public datas;
    public local_Storage;
    constructor(
        public router: Router,
        public routeInfo:ActivatedRoute,//页面间传值
        public localStorage: LocalStorage,
        public service : personalCenterService
    ){

    }
    ngOnInit(): void{
        //获取员工列表
        this.service.Management()
            .subscribe(
                data => {
                if(data.code==0){//成功
                    this.datas=data.data;
                    //this.data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    console.log(this.datas);
                    //for(let i=0; i<this.datas.length;i++){
                    //    this.datas[i].phone=this.datas[i].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                    //}
                }
            }
        );
    }

    //添加新联系人
    addContact() {
       this.router.navigateByUrl("personalCenter/AddContact");
    }


    //添加新联系人
    addEmpoly(data) {
        this.localStorage.setObject("addEmpoly",data) ;
        if(this.routeInfo.snapshot.queryParams["info"]==1){//编辑
            this.router.navigateByUrl("personalCenter/EditReceive?type=5");
        }else{
            this.router.navigateByUrl("personalCenter/AddAddress?type=5");//添加 info=2

        }




    }

}
