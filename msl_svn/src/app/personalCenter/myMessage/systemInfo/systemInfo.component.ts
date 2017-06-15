import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { personalCenterService } from  '../../personalCenter.service';
import { Title }from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-systemInfo',
  templateUrl: './systemInfo.component.html',
  styleUrls: ['./systemInfo.component.css']

})

export class SystemInfo implements OnInit{
  market_title="我的货源";
  public data;
  public id;
  constructor(
    public router: Router,
    public service: personalCenterService,
    public titleService: Title
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('业务消息');
    this.service.messages1(this.id)
      .subscribe(data => {
        if(data.code==0){
          this.data = data.data;
          console.log(data.data);
        }else{
          mui.alert(data.msg)
        }
        
      });
    

  }





}
