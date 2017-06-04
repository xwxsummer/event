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
     //localStorage['data'] = '{"userId":121,"accessToken":"8265d972e98ed21edd1f91230a75bb83","mobile":"17600631575","headImg":null,"name":null,"walletCode":10000016,"authed":0}';
    if(!localStorage["data"])mui.toast("未读取到钱包信息");
    localStorage['walletCode']=JSON.parse(localStorage["data"]).walletCode;
    //JSON.parse(localStorage["data"]).walletCode
    //console.log(localStorage['walletCode']);
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
}

}
