import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MyGoodsService } from "app/content/my-goods/my-goods.service";
declare var layui: any;
declare var layer: any;
declare var $: any;
@Component({
  selector: 'app-confirmgoods',
  templateUrl: './confirmgoods.component.html',
  styleUrls: ['./confirmgoods.component.css']
})
export class ConfirmgoodsComponent implements OnInit {
  public info: any;
  public img :any;
  public loadingIndex: number;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public service: MyGoodsService,
  ) { }

  ngOnInit() {
    let self = this;
    self.service.getOrderInfoByOrder(self.route.snapshot.params['orderNo'])
      .then(data => self.info = data.data).then(()=>console.log(self.info));

    self.service.getRemarkByOrderNo(self.route.snapshot.params['orderNo'])
      .then(data => self.img = data.data.imageList).then(()=>
        console.log(self.img)
      );

  }
  // getRemarkByOrderNo

  pay() {
    let self = this;
    self.loadingIndex = layer.load(3, {
      shade: [0.1, '#fff'] //0.1透明度的白色背景

    });
    if (this.router.navigateByUrl("content/myGoods/pay/"+self.route.snapshot.params['orderNo'])) {
      layer.close(self.loadingIndex);
    }

  }
bank(){
  this.router.navigateByUrl("content/deliverGoods")
}

}

// export class OrderInfo{
//   constructor(
//     private goodsName:string
//   ){}
// }
