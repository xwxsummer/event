import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-addressManage',
  templateUrl: './addressManage.component.html',
  styleUrls: ['../setting/setting.component.css']

})

export class AddressManage {

  constructor(
    public router: Router,
    public titleService: Title
  ){

  }

  ngOnInit(): void{
    this.titleService.setTitle('地址管理');

  }

  //管理发货信息
  ManageDelivery(){
    this.router.navigateByUrl("personalCenter/ManageReceive?type=1");
  }
  //管理收货信息   type:地址类型(1发货 2收货)
  ManageReceive(){
    this.router.navigateByUrl("personalCenter/ManageReceive?type=2");
  }



}
