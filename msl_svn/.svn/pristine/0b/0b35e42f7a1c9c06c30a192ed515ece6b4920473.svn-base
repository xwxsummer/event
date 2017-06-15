
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Observable }from 'rxjs/Observable';
import { Subject }from 'rxjs/Subject';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
import { ValidateMessage } from  '../../../fragment/validateMessage';
import { ImgWatch } from '../../../register/imgWatch';

declare var mui: any;
declare var md5:any;
declare var $:any;

@Component({
  selector: 'app-set-pwd',
  templateUrl: './set-pwd.component.html',
  styleUrls: ['./set-pwd.component.css']
})

export class SetPwdComponent implements OnInit {
    public ValidateMessage:ValidateMessage;
    public imgWatch_setPwd:ImgWatch;//设置秘密
    public imgWatch_secondPwd:ImgWatch;//再次输入秘密
    public setPwd:string;//设置秘密第一次
    public secondPwd:string;//设置秘密第二次
    public submitlag: boolean;
    constructor(
        public router: Router,
        public service:personalCenterService
    ){
        this.imgWatch_setPwd=new ImgWatch("password",true,"../assets/images/disWactch.png");
        this.imgWatch_secondPwd=new ImgWatch("password",true,"../assets/images/disWactch.png");
        this.ValidateMessage = new ValidateMessage();
    }

    ngOnInit(): void{
        this.submitlag=false;
    }
   checkPwd(pwd,conPwd){
        console.log(pwd,conPwd);
        if(pwd!==conPwd) {
            mui.toast('两次输入密码不一致');
            $('#submit').attr('disabled', 'true');
        }else {
            $('#submit').removeAttr('disabled');
        }
    }
    //点击密码可见
    changeImg(imgWatch){
        if(this[imgWatch].flag){
            this[imgWatch].ImgType="text";
            this[imgWatch].imgSrc="../assets/images/watch.png";
            this[imgWatch].flag=!this[imgWatch].flag;
        }else{
            this[imgWatch].ImgType="password";
            this[imgWatch].imgSrc="../assets/images/disWactch.png";
            this[imgWatch].flag=!this[imgWatch].flag;
        }
    }
    //点击值为空
    ValueNone(info){
        this[info]="";
    }
    submit(){
        if(this.ValidateMessage.validePsd(this.setPwd)==1){
            if(this.ValidateMessage.validePsd(this.secondPwd)==1){
                if(this.setPwd==this.secondPwd){
                    this.submitlag=true;
                    this.service.setPwd(md5(this.setPwd)).subscribe(
                     data=>{
                         this.submitlag=false;
                       if(data.code==0){
                         this.router.navigateByUrl("personalCenter/Wallet");
                       }else{
                         mui.alert(data.msg)
                       }
                     });
                }else{
                    mui.toast('两次输入密码不一致,请确认密码');
                    return;
                }
            }
        }
    }
}

