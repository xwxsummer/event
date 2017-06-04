import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { saoyisaoService } from '../saoyisao.service';

@Component({
  selector: 'app-detailsInfo',
  templateUrl: './detailsInfo.component.html',
  styleUrls: ['./detailsInfo.component.css']

})

export class DetailsInfo implements OnInit {
  public data: any;
  market_title="我的货源";
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
       public service : saoyisaoService
  ){

  }
  ngOnInit(): void{
  //   console.log("测试路由带过来ID了没有")
  // console.log(this.activatedRoute.snapshot.params['id'])

    this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data)
          }
        }
    );

    
  }
  callTop(){
  //  this.router.navigateByUrl("goodsReceipt/contactDriver");
  console.log(this.data.driverPhone)
    mui.confirm("呼叫司机：" + this.data.driverName, " ", new Array('取消', '<a href="tel:this.data.driverPhone" style="color:#ea5529">呼叫</a>'), function (e) {
    // if(e.index==1){
    //   mui.toast("打电话了")
    // }
  })
  }
  //拒绝装车原因
  RefuseResult() {
    this.router.navigateByUrl("saoYiSao/RefuseResult");
  }





}
