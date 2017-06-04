import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//import { confirmGoodsService } from './confirmGoods.service';
declare var mui: any;

@Component({
  selector: 'app-successGoods',
  templateUrl: './successGoods.component.html',
  styleUrls: ['./successGoods.component.css']

})

export class SuccessGoods  implements OnInit{
  public data;
  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
  //  public service:confirmGoodsService
   
  ){
  }
ngOnInit():void{
//   mui.alert("请认真核实司机证件信息与提供信息是否一致，如因信息不符所造成的损失，平台将不负相关责任","","知道了",function (){
//         console.log("sure");
//       });
//       console.log("ddddddd")
//       this.service.getOrderDetailsByChildNo(22017042494632250)
//         .subscribe(
//             data => {
//           if(data.code==0){//成功
//             console.log(data)
//             this.data=data.data;
//           }
//         }
//     );
}
 
successGoods() {
     this.router.navigateByUrl("confirmGoods/DetailsPage");
}

}
