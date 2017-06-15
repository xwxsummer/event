import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { confirmGoodsService } from '../confirmGoods.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detailsInfos',
  templateUrl: './detailsInfos.component.html',
  styleUrls: ['./detailsInfos.component.css']

})

export class DetailsInfos implements OnInit {
  public data: any;
  public type:any;
   public num = window.location.href.split("num=")[1].split("&")[0];
  market_title="我的货源";
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public service : confirmGoodsService,
    public titleService: Title
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('详细信息');
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
  //打电话
  call(phoneNumber){
    window.open('tel:'+phoneNumber);
  }
  //确认收货
  ConfirmGoods() {
    this.router.navigateByUrl("confirmGoods/ReceivingConfirm/"+this.activatedRoute.snapshot.params['id']);
  }
   //查看详细
   SuccessGoods() {
    this.router.navigateByUrl("confirmGoods/DetailsPage/"+this.activatedRoute.snapshot.params['id']);
  }
  //查看评价
  EvaluationDetails(){
    this.router.navigateByUrl("confirmGoods/EvaluationDetails/"+this.activatedRoute.snapshot.params['id']+"?driverId="+this.data.driverId)
  }
   //协商详情
  NegotiateDetails(){
    this.router.navigateByUrl("confirmGoods/NegotiateDetails/"+this.activatedRoute.snapshot.params['id']);
  }
}
