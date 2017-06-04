/**
 * Created by Administrator on 2017/5/7 0007.
 */
/**
 * Created by Administrator on 2017/5/2 0002.
 */
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Observable }from 'rxjs/Observable';
import { Subject }from 'rxjs/Subject';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;
declare var md5:any;
declare var $:any;


@Component({
    selector: 'app-modify',
    templateUrl: './modify.component.html',
    styleUrls: ['./modify.component.css']

})


export class Mondify implements OnInit{
    //public oldPwd:string;
    //public newPwd:string;
    //public newPwdChk:string;
    constructor(
        public router: Router,
        public perService:personalCenterService
    ){}
    checkPwd(newPwd,newPwdChk){
        console.log(newPwd,newPwdChk);
        if(newPwd!==newPwdChk) {
            mui.toast('两次输入密码不一致');
            $('#submit').attr('disabled', 'true');
        }else {
            $('.mui-toast-message').click();
            $('#submit').removeAttr('disabled');
        }

    }
    enableSubmit(newPwd,newPwdChk){
        console.log(newPwd,newPwdChk);
        if(newPwd!==newPwdChk) {
            //mui.toast('两次输入密码不一致');
            $('#submit').attr('disabled', 'true');
        }else $('#submit').removeAttr('disabled');
    }
    submit(oldPwd,newPwd){
        this.perService.changePwd(md5(oldPwd),md5(newPwd)).subscribe(data=> {
                console.log(data);
                if(data.msg!='success'){
                    mui.toast(data.msg);
                }else{
                    this.router.navigateByUrl("personalCenter/Wallet");
                }
            }
        );

        console.log(md5(oldPwd));
        console.log(md5(newPwd));
    }
    ngOnInit(): void{

    }





}

