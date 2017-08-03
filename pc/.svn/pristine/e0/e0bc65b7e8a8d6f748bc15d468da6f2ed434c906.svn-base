import {Router, ActivatedRoute} from '@angular/router';
import {MyGoodsService} from '../my-goods.service';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-invoice-details-info',
  templateUrl: './invoice-details-info.component.html',
  styleUrls: ['./invoice-details-info.component.css']
})
export class InvoiceDetailsInfoComponent implements OnInit {
  public data;
  public dbState;
  public imgListNew=[];
  public receiveNetWeight;//收货净重
  public receiveFreight;//收货费用
  public sendNetWeight;//发货净重
  public sendFreight;//发货费用

  constructor(
    public activatedRoute:ActivatedRoute,
    public service:MyGoodsService,
    public router:Router
  ) { }
  back(){
   window.history.go(-1);
  }
  ngOnInit() {
        this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data.data);
            if(data.data.insuranceFee) {
                this.dbState = "已担保";
           }else{
             this.dbState = "未担保";
           }

            if(this.data.status==2){
                $(".first").css( "background","url('../../../../assets/images/a.png')");
            }
              if(this.data.status==4){
                $(".second").css( "background","url('../../../../assets/images/a.png')");
            }
              if(this.data.status==52){
                $(".three").css( "background","url('../../../../assets/images/a.png')");
            }
              if(this.data.status==54){
                $(".four").css( "background","url('../../../../assets/images/a.png')");
            }
              if(this.data.status==101||this.data.status==102){
                $(".five").css( "background","url('../../../../assets/images/a.png')");
            }
              if(this.data.status==150){
                $(".six").css( "background","url('../../../../assets/images/a.png')");
            }
           this.receiveNetWeight = data.data.sendRough - data.data.receiveTare;
           this.receiveFreight = this.receiveNetWeight*data.data.freightPrice;
           this.sendNetWeight = data.data.sendRough - data.data.sendTare;
           this.sendFreight = this.sendNetWeight*data.data.freightPrice
          }
        else{
            alert(data.msg)
               }}
         ) 
      //查看拒绝原因
         this.service.getCancelReasonByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data=>{
            if(data.code==0){//成功
               this.data=data.data;
               console.log(data.data);
              
               if(data.data.imageList!=null){     
                  for(let i=0;i<data.data.imageList.length;i++){
                     console.log(data.data.domain+data.data.imageList[i])
                     this.imgListNew.push(data.data.domain+data.data.imageList[i]);          
                 }
               }    
            }
            else{
                alert(data.msg)
             }})  


  }
black(){
 window.history.go(-1);
}
//轨迹查询
  map(childNo){
    this.router.navigateByUrl("content/myGoods/TrajectoryMap/"+childNo)
  }
}
