import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-myGoods',
  templateUrl: './employeInfo.component.html',
  styleUrls: ['./employeInfo.component.css']

})

export class EmployeInfo implements OnInit{

  constructor(
    public router: Router
  ){

  }
  ngOnInit(): void{


  }
  //zhuangche="employeActive";
  //shouhuo="employeNone";
  //点击改变状态
  changeInfo(info) {

    //if(info==1){
    //  //this.zhuangche="employeActive";
    //  //this.shouhuo="employeNone";
    //}else{
    //  //this.zhuangche="employeNone";
    //  //this.shouhuo="employeActive";
    //}


  }
  //货源信息
  receiptDetails() {
    this.router.navigateByUrl("goodsReceipt/ReceiptDetails");
  }



}
