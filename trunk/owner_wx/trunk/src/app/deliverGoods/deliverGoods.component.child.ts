import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Http, Jsonp, URLSearchParams, Headers, Response } from '@angular/http';
declare var mui: any;
import { deliverGoodsService } from  './deliverGoods.service';
import { Api } from '../api';
import { Ajax } from '../ajax';
declare var md5: any;
declare var $: any;
@Component({
  selector: 'app-cancelGoods',
  templateUrl: './deliverGoods.component.child.html',
  styleUrls: ['../myGoods/prePaidFreight/prePaidFreight.component.css'
    , './deliverGoods.component.child.css'],
  providers: [deliverGoodsService]


})

export class PublicGoods {

  public ajax: Ajax;
  public insurance: number;
  // public goodsName = '';
  public info: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: deliverGoodsService,
    public http: Http
  ) {
    this.ajax = new Ajax(this.http);
    this.insurance = 1;
  }
  //截取金额
  fmoney(s: any, n?: number) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
  ngOnInit(): void {
    let self = this;
    console.log(this.route.snapshot.params['orderNo']);
    this.service.getOrderInfoByOrderNo(this.route.snapshot.params['orderNo'])
      .then(data => this.info = data.data);
    //.then(data=>console.log(data)||data)
    //.then(data=>Object.keys(data).forEach(key=>this.info[key] = data[key] ) )
    //.then(()=>console.log(this.info));
    mui('#sheet1').popover('toggle');
    //mui('#sheet1').popover('hide');
    mui.ready(function() {
      console.log("mui ready");
      var activeIndex = 0;// 数字索引
      var resultValue = "";// 密码结果
      var inputList = mui(".input-item");// 所有输入框
      var numberList = mui(".keyboard-number");// 所有数字键

      // 数字键盘点击事件
      mui("#keyboard").on("tap", ".keyboard-number", function() {
        //console.log("tap:",this.innerText);
        addNumber(this.innerText);
      });

      mui("#keyboard").on("tap", ".keboard-action", function() {
        var value = this.getAttribute("data-action");
        switch (value) {
          case "cancel":
            if (activeIndex > 0) {
              cancelNumber();
            }
            break;
          case "reset":
            resetInput();
            break;
        }
      });
      // 添加数字
      function addNumber(num) {
        inputList[activeIndex].innerText = "*";
        resultValue += num;
        activeIndex++;
        console.log('password:',resultValue);
        // 检测密码长度
        if (activeIndex >= 6) {
          self.checkPassword(resultValue);
          resetInput();
        }
      };
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

    });
  }

  checkPassword(password: string) {
    let self = this;
    mui('.load').popover('show');
    self.loadingTimeReduce(10);
    self.timeoutPromise(self.publishOrderInfo(self.route.snapshot.params['orderNo'], password), 10000)
      .catch(function(err) {
        console.log(err);
      }).then(data => {
        if (!data) {//超时
          mui('.load').popover('hide');
          mui.confirm('是否再次请求？', '请求失败', ['是', '否'], e => {
            console.log(e);
            if (e.index === 0) {
              self.checkPassword(password);
            }
          });
        }
        else if (data.msg !== 'success') {
          //密码错误
          mui.toast(data.msg);
          console.log(data.msg);
          mui('.load').popover('hide');
        } else {
          //密码正确
          mui('.box').popover('hide');
          self.router.navigateByUrl("deliverGoods/Success");
          console.log("密码正确");
        }
      }
      );
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

  showKeyboard() {
    //$('.box').css('display','block');
    mui('.box').popover('show');
  }
  //发布货源
  public publishOrderInfo(OrderNo: string, password: string): Promise<any> {

    let ownerPublishPayDTO = {
      "insurance": this.insurance,
      "orderNo": OrderNo,
      "password": md5(password),
      "userCode": localStorage['walletCode']
    };
    console.log(password);
    //let params = Object.keys(ownerPublishPayDTO).map(key=>key+'='+ownerPublishPayDTO[key]).join('&');
    return this.ajax.myPost(Api.publishOrderInfo, ownerPublishPayDTO).toPromise();//.then(data=>console.log(data))

  }
  //忘记密码
  pw() {
    this.router.navigateByUrl("personalCenter/Mondify");
  }
}
