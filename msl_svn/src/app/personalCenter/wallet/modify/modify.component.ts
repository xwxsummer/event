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
import { ValidateMessage } from  '../../../fragment/validateMessage';
import { ImgWatch } from '../../../register/imgWatch';
declare var mui: any;
declare var md5:any;
declare var $:any;
@Component({
    selector: 'app-modify',
    templateUrl: './modify.component.html',
    styleUrls: ['./modify.component.css']
})
export class Mondify implements OnInit{
    public oldPwd:string;
    public newPwd:string;
    public newPwdChk:string;
    public submitlag: boolean;
    public ValidateMessage:ValidateMessage;
    public imgWatch_oldPwd:ImgWatch;//原来密码是否可见
    public imgWatch_newPwd:ImgWatch;//新输入密码是否可见
    public imgWatch_newPwdChk:ImgWatch;//再次输入密码是否可见
    constructor(
        public router: Router,
        public titleService: Title,
        public perService:personalCenterService
    ){
        this.imgWatch_oldPwd=new ImgWatch("password",true,"../assets/images/disWactch.png");
        this.imgWatch_newPwd=new ImgWatch("password",true,"../assets/images/disWactch.png");
        this.imgWatch_newPwdChk=new ImgWatch("password",true,"../assets/images/disWactch.png");
        this.ValidateMessage = new ValidateMessage();
    }
    ngOnInit(): void{
        this.submitlag=false;
        this.titleService.setTitle('修改交易密码');
    }
    submit(){
        //密码
        if(this.ValidateMessage.validePsd(this.oldPwd)==1){
            if(this.ValidateMessage.validePsd(this.newPwd)==1){
                if(this.ValidateMessage.validePsd(this.newPwdChk)==1){
                    if(this.newPwdChk!=this.newPwd){
                        mui.toast('两次输入密码不一致,请确认密码');
                        return;
                    }
                    if(this.oldPwd==this.newPwd){
                        mui.toast('新旧密码一样，请重新输入');
                        return;
                    }
                    this.submitlag=true;
                    this.perService.changePwd(md5(this.oldPwd),md5(this.newPwd)).subscribe(data=> {
                            this.submitlag=false;
                            if(data.msg!='success'){
                                mui.toast(data.msg);
                            }else{
                                this.router.navigateByUrl("personalCenter/Wallet");
                            }
                        }
                    );

                }
            }
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



}
