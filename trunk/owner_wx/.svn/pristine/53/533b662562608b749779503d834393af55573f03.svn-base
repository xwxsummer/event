import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-myMessage',
  templateUrl: './myMessage.component.html',
  styleUrls: ['./myMessage.component.css']

})

export class MyMessage {
  constructor(
    public router: Router
  ){

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
