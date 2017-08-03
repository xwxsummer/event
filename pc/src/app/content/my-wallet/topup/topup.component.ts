import {Router} from '@angular/router';
import {MyWalletService} from '../my-wallet.service';
import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {
  public posts=new postLists();
  public data;
  public cardList;//快捷支付银行卡列表
  public snBingding;//绑定序列号
  public serialNumber;//支付流水号
  public cardId;//银行编号
  public mobile;//银行卡绑定的手机号
  constructor(
    public service :MyWalletService,
    public router:Router
  ) {
   }
  ngOnInit() {
    //获取绑定快捷支付的银行卡列表
    this.service.findFasterList()
    .subscribe(data =>{
      if(data.code==0){
        this.cardList = data.data;
        console.log(data.data);
        for(var i=0,j=data.data.length;i<j;i++){
          data.data[i].bank = '../../../../assets/images/'+data.data[i].bankCode+".jpg";
        }
      }else{
        layer.msg(data.msg);
      }
    })
  }
  //忘记密码
  changePwd(){
    this.router.navigateByUrl("content/myWallet/changePwd");
  }
  //更换银行
  backBankList(){
    $(".card").show();
    $(".accountType").hide();
    $(".next1").show();
    $(".next2").hide();
  }
  //使用新卡支付
  bangka(){
    this.router.navigateByUrl("content/myWallet/cardManagement");
  }
  //网银支付
  netSilver(){
    if(!$("input[name=money]").val()){
      layer.msg("请输入金额");
      return
    }else{
      $("#net").attr("data-toggle","modal");
      $("#net").attr("data-target","#myModal");
      this.posts.money=$("input[name=money]").val();
      
      console.log(this.posts);
      $("#myModal").show();
    }
  }
  //选择银行后下一步
  next1(){
    if(!$("input[type='radio']:checked").val()){
      layer.msg("请选择银行");
      return
    }
    $(".card").hide();
    $(".accountType").show();
    $(".next1").hide();
    $(".next2").show();
    this.posts.cardId=$("input[type='radio']:checked").val();
    
    this.cardId = '../../../../assets/images/'+$("input[type='radio']:checked").val()+".jpg";
    console.log(this.posts);
   
  }
  //选择账户类型
  next2(){
     if(!$("input[name='2']:checked").val()){
      layer.msg("请选择账户类型");
      return
    }
    console.log($("input[name='2']:checked").val());
    this.posts.accountType=$("input[name='2']:checked").val();
    console.log(this.posts);
    this.service.cpcnDirect(this.posts).subscribe(
      data =>{
        if(data.code==0){
          console.log(data.data);
          this.data=data.data;
          //调用第三支付页面
          $("#forms").attr("action",data.data.action);
          $("#message").val(data.data.message);
          $("#signature").val(data.data.signature)
          $("#forms").submit();
          $(".accountType").hide();
          $(".next2").hide();
          $(".back").show();
          $("#success").show();
          $("#fail").show();
        }else{
          layer.msg(data.msg);
        }     
      }
    )
      
  }
  //关闭
  clear(){
    $(".card").show();
    $(".accountType").hide();
    $(".next1").show();
    $(".next2").hide();
    $(".back").hide();
    $("#fail").hide();
    $("#success").hide();
  }
  clears(){
    this.router.navigateByUrl("content/myWallet/topup");
  }
  failure(){
    this.clear();
  }
  success(){
    this.router.navigateByUrl("content/myWallet/payments")
  }
  //获取绑定序列号
  snding(snBingding,mobile){
    this.snBingding = snBingding;
    this.mobile=mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  //确认支付
  payment(){
    if(!$("input[name=money]").val()){
      layer.msg("请输入金额");
      return
    }else if(isNaN($("input[name=money]").val())){
      layer.msg("只能是数字");
      return
    }
     if(! this.snBingding){
      layer.msg("请选择银行");
      return
    }
    if(!$("input[name=payPwd]").val()){
      layer.msg("请输入密码");
      return
    }
    let money = $("input[name=money]").val();
    let pwd = $("input[name=payPwd]").val();
    this.service.fasterPay(this.snBingding,money,pwd)
     .subscribe(
       data =>{
         if(data.code==0){
            console.log(data); 
            this.serialNumber = data.data;//支付流水号
         }else{
           layer.msg(data.msg);
         };
      }
    )
    if(!this.serialNumber){
     //layer.msg("支付流水号不能为空!!!");
      return
    }
    $("#pay").attr("data-toggle","modal");
    $("#pay").attr("data-target","#myModals");
    $("#myModals").show();   
    

  }

  //确认支付输入验证码
  confrim(){
    if(!$("input[name=valida]").val()){
      layer.msg("请输入验证码");
      return
    }
    this.service.fasterPayVerify(this.serialNumber,$("input[name=valida]").val())
      .subscribe(
        data =>{
          if(data.code==0){
            console.log(data.data);
            window.location.reload();
            this.router.navigateByUrl("content/myWallet/payments");
          }else{
            layer.msg(data.msg);
          }
        }
      )
  }
}

export class postLists{
    public cardId;
    public money;
    public accountType;
}