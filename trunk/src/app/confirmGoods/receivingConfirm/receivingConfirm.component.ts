import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
declare var mui: any;
declare var $:any;
@Component({
  selector: 'app-receivingConfirm',
  templateUrl: './receivingConfirm.component.html',
  styleUrls: ['./receivingConfirm.component.css']

})

export class ReceivingConfirm implements OnInit{
  public values:number;
  public values2:number;
  public price: number;
  public info:any;
 public data;
  public myForms: string[];
  imgList = [];
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public service: confirmGoodsService
  ){ }
ngOnInit() {

   let imgList = this.imgList;
      $('input').change(function(event){
          imgCompress(event.target.files[0]).then(data=>imgList.push(data));
      })
  
  console.log(this.activatedRoute.snapshot.params['id'])

   this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
          }
        }
    );
}
 //获取皮重
   onKey1(values){
    console.log(values)
  }
  //获取毛重
  onKey2(values2){
    console.log(this.data.freightPrice)
    let jingzhong = values2-this.values;
    this.price = jingzhong*this.data.freightPrice;
  }
ReceivedSuccess(myForm) {
  console.log("heheheh")  
   // if(!myForm) {return;}
    //this.service.updateConfirmLoadByChildNo(myForm).subscribe()
    console.log(this.data.childNo)
    this.router.navigateByUrl("confirmGoods/ReceivedSuccess/"+this.data.childNo); 
    console.log(this.data.childNo)

}
ExceptionHanding() {
 this.router.navigateByUrl("confirmGoods/ExceptionHanding/"+this.data.childNo);
}

}
