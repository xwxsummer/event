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
  public type:any;
  market_title="我的货源";
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
       public service : saoyisaoService
  ){

  }
  ngOnInit(): void{
  //   console.log("测试路由带过来ID了没有")
 let  type = window.location.href.split("type=")[1].split("&")[0];
  console.log(type);
  this.type=type;
    this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data)
          }else{
            alert(data.msg)
          }
        }
    );

    
  }
  callTop(){
  //  this.router.navigateByUrl("goodsReceipt/contactDriver");
  console.log(this.data.driverPhone)
    mui.confirm("呼叫司机：" + this.data.driverName, " ", 
    new Array('取消', '<a href="tel:this.data.driverPhone" style="color:#ea5529">呼叫</a>'), function (e) {
    // if(e.index==1){
    //   mui.toast("打电话了")
    // }
  })
}

  //拒绝装车原因
  RefuseResults() {
    this.router.navigateByUrl("saoYiSao/RefuseResult/"+this.activatedRoute.snapshot.params['id']);
  }
//轨迹查询
 maps(childNo){
     this.router.navigateByUrl("trajectoryMap/"+this.activatedRoute.snapshot.params['id']);
  }
}
