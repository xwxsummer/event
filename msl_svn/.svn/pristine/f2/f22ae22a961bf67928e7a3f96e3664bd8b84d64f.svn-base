import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-myMessage',
  templateUrl: './myMessage.component.html',
  styleUrls: ['./myMessage.component.css']

})

export class MyMessage implements OnInit {
  public data;
  constructor(
    public router: Router,
    public titleService: Title,
    public service: personalCenterService
  ){
  }
 ngOnInit(): void{
   this.titleService.setTitle('我的消息');
   this.service.newestSystemMessage().subscribe(
      data => {
        if(data.code==0){
          this.data=data.data;
          console.log(data.data);
        }else{
          mui.alert(data.msg)
        }
      }
   )
 }
//系统消息
  SystemInfo() {
    this.router.navigateByUrl("personalCenter/SystemInfo");
  }
//货单消息
  HuodanInfo() {
    this.router.navigateByUrl("personalCenter/HuodanInfo");
  }

}
