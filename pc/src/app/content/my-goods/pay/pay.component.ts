import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MyGoodsService } from "app/content/my-goods/my-goods.service";
import { Http, Jsonp, URLSearchParams, Headers, Response } from '@angular/http';
import { Ajax } from '../../../ajax';
import { Api } from '../../../api';
declare var md5: any;
declare var $: any;
declare var layui: any;
declare var layer: any;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public ajax: Ajax;
  public insurance: number;
  public info: any;
  public loadingIndex: number;
  public passwordWrongCounter: number;
  constructor(
    public service: MyGoodsService,
    private route: ActivatedRoute,
    private router: Router,
    public http: Http
  ) {
    this.ajax = new Ajax(this.http);
    this.insurance = 1;
    this.passwordWrongCounter = 0;
  }


  ngOnInit() {
    let order;
    if(this.route.snapshot.params['id']){
        order=this.route.snapshot.params['id'];
    }else{
       order=sessionStorage["OrderNo"];
    }
    console.log(order)
    this.service.getOrderInfoByOrder(order)
      .then(data => this.info = data.data).then(() =>

       console.log("info: ", this.info)

     )

    $(window).ready(function() {
$(".i-text").focus();
      $(".i-text").keyup(function() {
        // debugger
        var inp_v = $(this).val();
        var inp_l = inp_v.length;
        //$("p").html( "input的值为：" + inp_v +"; " + "值的长度为:" + inp_l);//测试用

        for (var x = 0; x <= 6; x++) {
          $(".sixDigitPassword").find("i").eq(inp_l).addClass("active").siblings("i").removeClass("active");
          $(".sixDigitPassword").find("i").eq(inp_l).prevAll("i").find("b").css({ "display": "block" });
          $(".sixDigitPassword").find("i").eq(inp_l - 1).nextAll("i").find("b").css({ "display": "none" });

          $(".guangbiao").css({ "left": inp_l * 51 });//光标位置

          if (inp_l == 0) {
            $(".sixDigitPassword").find("i").eq(0).addClass("active").siblings("i").removeClass("active");
            $(".sixDigitPassword").find("b").css({ "display": "none" });
            $(".guangbiao").css({ "left": 0 });
          }
          else if (inp_l == 6) {
            $(".sixDigitPassword").find("b").css({ "display": "block" });
            $(".sixDigitPassword").find("i").eq(5).addClass("active").siblings("i").removeClass("active");
            $(".guangbiao").css({ "left": 5 * 51 }, { "display": "none" });
          }


        }
      });

    });
  }
  layerAlert(text) {
    let self = this;
    let orderNo = sessionStorage["OrderNo"];
    layer.confirm(text, {
      btn: ['继续发布货源', '查看货源信息'] //按钮
    }, function() {
      // layer.msg('的确很重要', {icon: 1});
      self.router.navigateByUrl("content/myGoods/deliverGoods")
      layer.closeAll();
    }, function(OrderNo: string) {
      self.router.navigateByUrl("content/myGoods/orderDetailsInfo/" + orderNo)
      console.log(orderNo)
    });
  }
  pay() {
    this.checkPassword($("#payPassword_rsainput").val())
    this.loadingIndex = layer.load(3, {
      shade: [0.1, '#fff'] //0.1透明度的白色背景

    });


  }

  checkPassword(password: string) {
    let self = this;
    let orderNo = sessionStorage["OrderNo"];
    // mui('.load').popover('show');
    self.loadingTimeReduce(10);
    self.timeoutPromise(self.publishOrderInfo(orderNo, password), 10000)
      .catch(function(err) {
        console.log(err);
      }).then(data => {

        if (!data) {//超时
          console.log('publishOrderInfo ', data);
          // mui('.load').popover('hide');
          // mui.confirm('是否再次请求？', '网络错误', ['是', '否'], e => {
          //   console.log(e);
          //   if (e.index === 0) {
          //     self.checkPassword(password);
          //   }
          // });
        }
        else if (data.msg !== 'success') {
          //密码错误
          //  mui.toast(data.msg);
          self.passwordWrongCounter += 1;
          if (self.passwordWrongCounter >= 3) {
            //  mui.confirm('交易密码已错误3次，点击忘记密码找回或者1小时以后再试',' ',['取消','忘记密码'],e=>{
            //      if(e.index===1)self.pw();
            //    })
          }
          // mui.confirm('是否再次请求？', '请求失败', ['是', '否']
          layer.close(self.loadingIndex);
          layer.msg(data.msg)
          console.log(data.msg);
          // mui('.load').popover('hide');
          throw new Error('密码错误');
        } else {
          //密码正确
          // mui('.box').popover('hide');
          console.log("密码正确");
        }

      }
      ).then(function getStatus() {
        $('.mui-backdrop').trigger('tap');
        self.getStatusByOrderNo(orderNo).then(data => {
          console.log('订单状态：', data.data);
          layer.close(self.loadingIndex);

          switch (data.data) {
            case 2:
              //mui.toast('已发布');
              $('#state').text('已发布');
              self.layerAlert('发布成功')
              // self.router.navigateByUrl("deliverGoods/Success");
              break;
            case 20:
              $('#state').text('支付中........');
              layer.msg('支付中........')
              setTimeout(getStatus, 2000);
              break;
            case 30:
              // mui.toast('支付完成');
              $('#state').text('支付完成........');
              self.layerAlert('支付完成........')
              // self.router.navigateByUrl("deliverGoods/Success");
              break;
            case 60:
              // mui.toast('支付失败');
              $('#state').text('支付失败........');
              layer.msg('支付失败........');
              self.router.navigateByUrl("market/MyGoods?info=myGoods");
              setTimeout(getStatus, 2000);
              break;
          }
        })
      });

  }

  timeoutPromise(promise: Promise<any>, ms: number) {
    var timeout = (
      new Promise(resolve => setTimeout(resolve, ms))
    ).then(function() {
      throw new Error('Operation timed out after ' + ms + ' ms');
    });
    return Promise.race([promise, timeout]);

  }
  loadingTimeTimer = null;
  loadingTimeReduce(second: number) {
    $('.progress').text(10);
    clearInterval(this.loadingTimeTimer);
    this.loadingTimeTimer = setInterval(() => {
      if (second <= 0) clearInterval(this.loadingTimeTimer);
      else $('.progress').text(--second);
      console.log(second);
    }, 2000);
  }
  //发布货源

  public publishOrderInfo(OrderNo: string, password: string): Promise<any> {
    let ownerPublishPayDTO = {
      "insurance": this.insurance,
      "orderNo": OrderNo,
      "password": md5(password),
      "userCode": JSON.parse(sessionStorage['data']).walletCode + ''
    };
    console.log(password);
    return this.ajax.myPost(Api.publishOrderInfo, ownerPublishPayDTO).toPromise();//.then(data=>console.log(data))

  }
  public getStatusByOrderNo(OrderNo: string): Promise<any> {
    return this.ajax.myget(Api.getStatusByOrderNo + OrderNo).toPromise();
  }
}
