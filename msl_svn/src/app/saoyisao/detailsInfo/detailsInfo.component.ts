import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { saoyisaoService } from '../saoyisao.service';
import { Title } from '@angular/platform-browser';

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
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service : saoyisaoService
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('详细信息');
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

 //呼叫司机
  // callTop(){
  //   let thisSelf =this;
  //   console.log(this.data.driverName)
  //   mui.confirm("呼叫司机：" + this.data.driverName, " ", 
  //   new Array('取消', '呼叫'), function (e) {
  //       window.open('tel:'+thisSelf.data.driverPhone);
  //   })
  // }
//打电话
  call(phoneNumber){
    window.open('tel:'+phoneNumber);
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
