import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html'
  //styleUrls: ['']

})

export class Checking{
  constructor(
    public router: Router,
   public routeInfo:ActivatedRoute//页面间传值  checking=1 认证界面 checking=2 个人中心
  ){

  }

  //朕知道了
  market(){
    if(this.routeInfo.snapshot.queryParams["checking"]==1){
      this.router.navigateByUrl("market");//跳到市场界面
    }else{
      this.router.navigateByUrl("market/PersonalCenter");//跳到个人中心
    }

  }

}
