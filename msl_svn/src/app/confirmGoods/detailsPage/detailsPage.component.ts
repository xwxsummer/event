import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
import { Title } from '@angular/platform-browser';
import { LocalStorage } from '../../local_storage';
declare var mui: any;

@Component({
  selector: 'app-detailsPage',
  templateUrl: './detailsPage.component.html',
  styleUrls: ['./detailsPage.component.css']

})

export class DetailsPage implements OnInit{
   public data:any;
   public payment:number;
   public freight:number;
   public local_Storage;
   public userId;
   public imgListNew=[];
  //  public objItem;
   constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service: confirmGoodsService,
    public localStorage: LocalStorage
  ){ 
     this.localStorage =new LocalStorage();
     this.local_Storage=this.localStorage.getObject("data"); 
  }
  
ngOnInit() {
  this.titleService.setTitle('查看详细');
  this.userId = this.local_Storage.userId;
  console.log(this.activatedRoute.snapshot.params['id']);
  this.service.getOwnerRemarkByChildNo(this.activatedRoute.snapshot.params['id'])
  .subscribe(
    data =>{
      if(data.code==0){
          console.log(data.data);
               if(data.data.imageList!=null){     
                  for(let i=0;i<data.data.imageList.length;i++){
                     console.log(data.data.domain+data.data.imageList[i])
                     this.imgListNew.push(data.data.domain+data.data.imageList[i]);          
                 }
               } 
      }
      else{
        mui.alert(data.msg);
      }
    } 
  );
  this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
    .subscribe(
      data => {
        if(data.code==0){//成功
          this.data = data.data;
          console.log(data.data);
          console.log(this.data.orderChildCompensationVO.compensationRemark);
          //新添加的一段代码，将接口中的扣款明细添加到一个对象里面。
          // this.objItem  = data.data.orderChildCompensationVO.orderChildCompensationItemList;
          let len = this.data.orderChildCompensationVO.orderChildCompensationItemList.length;
          let deductMoney = 0;//扣款总金额
          if(len!=0){
            for(var i=0;i<len;i++){
              console.log(this.data.orderChildCompensationVO.orderChildCompensationItemList[i].name);
              deductMoney = deductMoney + this.data.orderChildCompensationVO.orderChildCompensationItemList[i].value;
              }
            }
            //货物运费
            this.freight = this.data.totalFreightPrice+deductMoney;
            this.payment =this.data.totalFreightPrice+this.data.insuranceFee;
        }else{
          mui.toast(data.msg);
        }
    });
  }
  //返回上一页
  goBack(){
      window.history.go(-1);
  }
  //返回主页
  goHome(){
      this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
  }
}
