import {Router} from '@angular/router';
import {MyWalletService} from '../my-wallet.service';
import { Component, OnInit } from '@angular/core';
declare var layer:any;
declare var $:any;

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
 public data;
 public snBingding;
 public withdrawalId;//提现单号
 public money;//提现金额
 public bank;//提现银行
 public cardNo;//卡号
 public nowTime;
 public 
  constructor(
    public service : MyWalletService,
    public router : Router
  ) { }

  ngOnInit() {
   
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
  //获取绑定序列号
  snding(id,bank,cardNo){
    this.snBingding = id;
    this.bank = bank;
    this.cardNo = cardNo;
  }
  //使用新卡提现
  bangka(){
    this.router.navigateByUrl("content/myWallet/cardManagement");
  }
  //确认提现
  withdrawal(){
    if(!$("input[name=money]").val()){
      layer.msg("请输入提现金额");
      return
    }
    if(!$("input[name=payPwd]").val()){
      layer.msg("请输入密码");
      return
    }
    if(!this.snBingding){
      layer.msg("请选择提现银行");
      return
    }
    let objD= new Date();
    var YY = objD.getFullYear();
    let mm = objD.getMonth()+1;
    if(mm<10){var MM = '0' + mm;}else{var MM =mm+"";}
    var dd = objD.getDate();
    if(dd<10) {var DD = '0' + dd;}else{var DD =dd + "";}
    var hh = objD.getHours()+1;
    if(hh<10) {var HH = '0' + hh;}else{var HH =hh + "";}
    var ii =objD.getMinutes();
    if(ii<10) {var II = '0' + ii;}else{var II =ii + "";}
    var ss = objD.getSeconds();
    if(ss<10) {var SS = '0' + ss;}else{var SS =ss + "";}
    let str = YY+"-"+MM +"-"+DD+" "+HH+":"+II+":"+SS;
    console.log(str);
    this.nowTime = str;
    this.money = parseInt($("input[name=money]").val()).toFixed(2);
    let payPwd = $("input[name=payPwd]").val();
    this.service.settlement(this.money,this.snBingding,payPwd)
      .subscribe(data =>{
        if(data.code==0){
          console.log(data.data);
          this.withdrawalId = data.data;
          $(".tixian").hide();
          $(".detail").show();
        }else{
          layer.msg(data.msg)
        }
      })
  }
  //完成
  complete(){
    window.location.reload();
    this.router.navigateByUrl("content/myWallet/withdrawal");
  }
  //忘记密码
  changePwd(){
    this.router.navigateByUrl("content/myWallet/changePwd");
  }
}
