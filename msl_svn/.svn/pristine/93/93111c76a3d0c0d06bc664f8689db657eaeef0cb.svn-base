import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['']

})

export class AppComponent {
  ngOnInit(): void {
     //localStorage['data'] = '{"userId":192,"accessToken":"cd7635381be2d207506f0a616be44080","mobile":"15369302579","headImg":null,"name":"郭进亮","walletCode":10000076,"authed":0}';
    if(!localStorage["data"])mui.toast("未读取到钱包信息");
    localStorage['walletCode']=JSON.parse(localStorage["data"]).walletCode;
    //JSON.parse(localStorage["data"]).walletCode
    //console.log(localStorage['walletCode']);
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
}

}
