import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { personalCenterService } from  '../../personalCenter.service';
import { Title }from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-huodanInfo',
  templateUrl: './huodanInfo.component.html',
  styleUrls: ['../systemInfo/systemInfo.component.css']

})

export class HuodanInfo implements OnInit{
  public data;
  public id;
  constructor(
    public router: Router,
    public titleService: Title,
    public service: personalCenterService
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('业务消息');
    this.service.messages0(this.id).subscribe(
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
  //货单信息
  DetailsInfo() {
    this.router.navigateByUrl("saoYiSao/DetailsInfo");
  }




}
