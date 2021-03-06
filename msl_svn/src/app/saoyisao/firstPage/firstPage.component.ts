import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { saoyisaoService } from '../saoyisao.service';
import { LocalStorage } from '../../local_storage';
import { Title } from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-firstPage',
  templateUrl: './firstPage.component.html',
 // styleUrls: ['./firstPage.component.css']
})

export class FirstPage implements OnInit{
   public local_Storage;
   public data;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,//页面传值
    public service : saoyisaoService,
    public titleService: Title,
    public localStorage: LocalStorage,
  ){
    this.localStorage =new LocalStorage();
    this.local_Storage=this.localStorage.getObject("data");
  }
  ngOnInit(): void{
    this.titleService.setTitle('扫一扫');
    // if(this.local_Storage.userId==null){
    //   mui.alert("您还没有登录，请注册登录")
    // }
      console.log(this.activatedRoute.snapshot.params['id'])
        this.service.getOrderByChildNo(this.activatedRoute.snapshot.params['id'] )
        .subscribe(
            data => {
          if(data.code==0){
            console.log(data)
            this.data=data.data
            //销售类型
               if(this.data.status==4&&this.data.orderType==2){
                this.router.navigateByUrl("ordertype/ordertype/"+this.data.childNo);
              }
            //运费类型
              if(this.data.status==4&&this.data.orderType==1){
                this.router.navigateByUrl("saoYiSao/Saoyisao/"+this.data.childNo);
              }
              if(this.data.status==50&&this.data.orderType==2){
                this.router.navigateByUrl("ordertype/confirmOrdertype/"+this.data.childNo);
              }
              if(this.data.status==50&&this.data.orderType==1){
                this.router.navigateByUrl("saoYiSao/ZhuangCheInfo/"+this.data.childNo);
              }
               if(this.data.status==54){
                this.router.navigateByUrl("confirmGoods/ConfirmGoods/"+this.data.childNo);
              }
              if(this.data.status==100){
                this.router.navigateByUrl("confirmGoods/ReceivingConfirm/"+this.data.childNo);
              }
              if(this.data.status!=4&&this.data.status!=50&&this.data.status!=100&&this.data.status!=54){
                mui.alert("货单状态不能进行操作");
              }
        }
        else{
           mui.alert(data.msg)
               }}
         )
    
  }
  
}
