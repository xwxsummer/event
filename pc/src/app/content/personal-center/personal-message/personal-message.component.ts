import { Component, OnInit } from '@angular/core';
import { PersonalCenterService } from "app/content/personal-center/personal-center.service";

@Component({
  selector: 'app-personal-message',
  templateUrl: './personal-message.component.html',
  styleUrls: ['./personal-message.component.css']
})
export class PersonalMessageComponent implements OnInit {
  public data;
  constructor(
     public service:PersonalCenterService
  ) {
   
   }

  ngOnInit() {
     this.service.personalCenterInfo()
      .subscribe(
        data => {
          if(data.code==0){
            console.log(data.data)
            this.data=data.data;
            if(this.data.name){
            }else{
              this.data.name=this.data.mobile;
            }

            if(this.data.name.length==11){
              this.data.name=this.data.name.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }

            this.data.mobile=this.data.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            
            if(this.data.authed==0){
              this.data.authed="未认证";
            }
            if(this.data.authed==1){
              this.data.authed="认证失败";
            }
            if(this.data.authed==2){
              this.data.authed="已认证";
            }
            if(this.data.authed==3){
              this.data.authed="审核中";
            }

            if(this.data.sex==0){
              this.data.sex=" "
            }
            if(this.data.sex==1){
              this.data.sex="女"
            }
            if(this.data.sex==2){
              this.data.sex="男"
            }
           }else{
            alert(data.msg);
          }
      }
    );
  }

}
