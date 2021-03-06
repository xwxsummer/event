import {MyWalletService} from '../my-wallet.service';
import {SessionStorage} from '../../../fragment/session_storage';
import { Component, OnInit } from '@angular/core';
declare  var $: any;
declare var layer: any;

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
    public data;
    public mobile;
    public ValidateMessage;//验证验证码
    public countdown:number;//timer倒计时
    public yzm:string;//验证码文字
    public timer;//定时器
    public isClick:boolean;//定时器
    public myCaptcha:boolean;//验证码
    public token;
    public type;//账户类型
    public bankCardId;//银行卡ID
    public accountype;//银行卡账户类型
    public tokens;//第2步返回的票据码
  constructor(
    public sessionStorage:SessionStorage,
    public service : MyWalletService
  ) { }

  ngOnInit() {
    this.countdown=60;
    this.isClick=true;
    this.yzm="获取验证码";
    this.mobile=this.sessionStorage.getObject("data").mobile;
    this.mobile=this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
     //查询银行卡列表walletCode
    this.service.bankCardFindList()
      .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data);
            for(var i=0,j=data.data.length;i<j;i++){
              data.data[i].bank = '../../../../assets/images/'+data.data[i].bankCode+".jpg";
            }
            
          }else{
            layer.msg(data.msg)
          }
      });
  }
  //获取银行卡ID
  snding(cardId,accountype){
    this.bankCardId = cardId;
    this.accountype = accountype;
    console.log(this.bankCardId);
  }

  //用户验证码  有权限
    changCaptcha(){
      if(this.isClick){
        this.isClick=false;
        this.timer=setInterval(() => {
          if (this.countdown == 0) {
            this.yzm="获取验证码";
            this.countdown = 60;
            this.isClick=true;
              clearInterval(this.timer);
            } else {
              this.yzm="重新发送(" + this.countdown + ")";
              this.countdown--;
              return false;
            }
          }, 1000);
      this.service.captcha(this.sessionStorage.getObject("data").mobile);
      }
    }
  // 第一步根据验证码提交
  submit(){
   let yzm = $("input[name='verCode']").val();
   if(!yzm){
     layer.msg("请输入验证码");
     return
   }
   this.service.checkMobile(yzm)
     .subscribe(
       data =>{
         if(data.code==0){
            console.log(data.data);
            this.type = data.data.type;//账户类型
            this.token = data.data.token;//token
            $(".contents1").hide();
            $(".contents3").show();
         }else{
           layer.msg(data.msg);
         }
       }
     )
  }
  //第二步验证银行卡信息
  submit1(){
    let cardNo = $("input[name='cardNo']").val();
    let idCard = $("input[name='idCard']").val(); 
    if(!cardNo){
       layer.msg("请输入银行卡号");
       return
    }
    //不能为空
    if(cardNo==''||idCard==''){
      layer.msg("请补全信息，不能为空");
      return;
    }
    //校验银行卡
    let cardNoReg2 = /^(\d{16}|\d{19})$/;
    if(cardNoReg2.test(cardNo) === false){  
      layer.msg("请输入合法的借记卡");  
      return 
    }else if(isNaN(cardNo)){
      layer.msg("只能输入数字");
      return
    }
    //校验身份证......

    this.service.checkBankCard(this.bankCardId,this.token,cardNo,idCard)
    .subscribe(data =>{
      if(data.code==0){
        console.log(data.data);
        this.tokens = data.data;
        $(".contents3").hide();
        $(".contents2").show();
      }else{
        layer.msg(data.msg);
      }
    })
  }
  //第三步输入密码
  compnent(){
     let pwd = $("input[name='pwd']").val();
     let rpwd = $("input[name='rpwd']").val();
    if($("input[name='pwd']").val()!=$("input[name='rpwd']").val()){
      layer.msg("两次密码输入不一致");
      return
    }
    let reg = /^[0-9]{6}$/;
    if(reg.test(pwd) === false||reg.test(pwd) === false){
        layer.msg("只能输入6位数字")
    }
   
    this.service.resetPwd1(pwd,this.tokens)
      .subscribe(data =>{
        if(data.code==0){
           alert("找回密码成功")
           window.location.reload();
        }else{
          layer.msg(data.msg);
        }
      }
      )
  }
}
