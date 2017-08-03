import { SessionStorage } from "app/fragment/session_storage";
import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ValidateMessage } from  '../fragment/validateMessage';
import { LoginService } from  './login.service';
import { Api } from "app/api";
declare var layer:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ValidateMessage;
  public test=1;
  public captchaUrl=Api.captchaImg;
  constructor(
    public service: LoginService,
    public router: Router,
    public sessionStorage: SessionStorage
  ) {
    this.ValidateMessage = new ValidateMessage();   
   }

  ngOnInit() {
    console.log(this.captchaUrl)
  }
   KeyDown()
      {
        console.log(event);
        // if (event.code == 13)
        // {
        //   event.returnValue=false;
        //   event.cancel = true;
        //   Form1.btnsubmit.click();
        // }
       }
  forget(){
    this.router.navigateByUrl('register')
  }
  qrcode(){
    this.router.navigateByUrl('qrcode')
  }

  huoqu(myForm){
    if(this.ValidateMessage.validateMobile(myForm.phone)==1){
       this.captchaUrl=Api.captchaImg+"?moblie="+myForm.phone;
       console.log(this.captchaUrl)
       this.test=2;
   }
    
  }
  yzm(myForm){
   if(this.ValidateMessage.validateMobile(myForm.phone)==1){
       this.captchaUrl=Api.captchaImg+"?moblie="+myForm.phone+"&math="+Math.random();
       console.log(this.captchaUrl)
   }
  }
  login(myForm){
    if(this.ValidateMessage.validateMobile(myForm.phone)==1){
      if(this.ValidateMessage.validatePsd(myForm.password)==1){
        console.log(myForm);
        console.log(this.captchaUrl)
        this.service.login(myForm).subscribe(
          data=>{
             console.log(data.data);
            // 写入sessionStorage
            this.sessionStorage.setObject("data",data.data) ;
            if(data.code==0){
              this.router.navigateByUrl("content")
            }else{
              layer.msg(data.msg)
            }
          }
        )
      }
    }
  }
}
