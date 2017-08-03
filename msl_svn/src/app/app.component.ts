import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['']

})

export class AppComponent {
  ngOnInit(): void {
   // localStorage['data'] = '{"userId":6,"accessToken":"22ef72f8f60a1687f3f194e1a3ccc8a1","mobile":"15901001287","headImg":"avatar/owner_6.jpg","name":"夏婉轩","openId":null,"walletCode":10000161,"authed":2}'
    //localStorage['data'] = '{"userId":3,"accessToken":"0d3dcda113390c843244594b65240209","mobile":"15369302579","headImg":null,"name":"郭进亮","openId":null,"walletCode":10000158,"authed":0}';
    if (!localStorage["data"]) mui.toast("未读取到钱包信息");
    localStorage['walletCode'] = JSON.parse(localStorage["data"]).walletCode;
    //JSON.parse(localStorage["data"]).walletCode
    //console.log(localStorage['walletCode']);
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    Storage.prototype.put = function(key, value) {
      this.setItem(key, JSON.stringify(value));
    }

    Storage.prototype.get = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
    }
  }

}
