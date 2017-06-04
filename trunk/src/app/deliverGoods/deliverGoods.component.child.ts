import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
declare var mui: any;
import { deliverGoodsService } from  './deliverGoods.service';
import { Api } from '../api';
@Component({
    selector: 'app-cancelGoods',
    templateUrl: './deliverGoods.component.child.html',
    styleUrls: ['../myGoods/prePaidFreight/prePaidFreight.component.css'
                ,'./deliverGoods.component.child.css'],
    providers:[ deliverGoodsService ]


})

export class PublicGoods {
    public boxHidden=true;

    // public goodsName = '';
    public info:any;
    constructor(
      private route: ActivatedRoute,
      public service : deliverGoodsService,
      public http:Http
    ) {}
  ngOnInit(): void{
    console.log(this.route.snapshot.params['orderNo']);
    this.service.getOrderInfoByOrderNo(this.route.snapshot.params['orderNo'])
    .then(data=> this.info = data.json().data)
    //.then(data=>console.log(data)||data)
    //.then(data=>Object.keys(data).forEach(key=>this.info[key] = data[key] ) )
    //.then(()=>console.log(this.info));

    mui.ready(function() {
      // 数字索引
      var activeIndex = 0;
      // 密码结果
      var resultValue = "";
      // 所有输入框
      var inputList = mui(".input-item");
      // 所有数字键
      var numberList = mui(".keyboard-number");
      // 数字键盘点击事件
      mui("#keyboard").on("tap", ".keyboard-number", function() {
        if(activeIndex == 6) {
          return;
        }
        var num = this.innerText;
        addNumber(num);
      });
      mui("#keyboard").on("tap", ".keboard-action", function() {
        var value = this.getAttribute("data-action");
        switch(value) {
          case "cancel":
            if(activeIndex == 0) {
              return;
            }
            cancelNumber();
            break;
          case "reset":
            resetInput();
            break;
          default:
            break;
        }
      });
      // 添加数字
      function addNumber(num) {
        inputList[activeIndex].innerText = "*";
        resultValue += num;
        activeIndex++;
        // 检测密码长度
        if(activeIndex == 6) {
          // 假定123456是正确密码
          if(resultValue != "123456") {
            wrongPassword();
          } else {
            mui.toast("密码正确，然后跳转到下一个页面");
          }
        }
      }
      // 撤销数字
      function cancelNumber() {
        activeIndex--;
        inputList[activeIndex].innerText = "";
        resultValue = resultValue.substring(0, resultValue.length - 1);
      }
      // 密码框置空
      function resetInput() {
        activeIndex = 0;
        resultValue = "";
        mui(".input-item").each(function(index, element) {
          (<HTMLElement>element).innerText = "";
        });
      }
      // 密码错误
      function wrongPassword() {
        mui.confirm("密码错误", "验证结果", ["再来一次", "密码忘了"], function(event) {
          var index = event.index;
          if(index == 0) {
            mui.toast("请再次输入");
          } else {
            mui.toast("下一步跳转到忘记密码的页面");
          }
          resetInput();
        });
      }

    });

  }

    succes(){
        this.boxHidden=false;
        //this.router.navigateByUrl("deliverGoods/Success");
      this.publishOrderInfo(this.route.snapshot.params['orderNo'])
    }
  //发布货源
  public publishOrderInfo(OrderNo:string){
    this.http.post(Api.publishOrderInfo+'?orderNo='+OrderNo,{}).toPromise().then(data=>console.log(data))

  }

}
