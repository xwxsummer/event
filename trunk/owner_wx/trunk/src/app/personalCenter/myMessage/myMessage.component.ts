import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title }from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-myMessage',
  templateUrl: './myMessage.component.html',
  styleUrls: ['./myMessage.component.css']

})

export class MyMessage implements OnInit {
  constructor(
    public router: Router,
    public titleService: Title
  ){

  }

 ngOnInit(): void{
   this.titleService.setTitle('我的消息');
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
