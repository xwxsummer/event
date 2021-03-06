import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
// import { Mybank } from  '../mybank/mybank.component';
declare var mui: any;
declare var wx: any;
declare var $: any;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public isShow: number;
  public info: any[];
  public cardIndex: number = 0;
  constructor(
    public router: Router,
    public titleService: Title,
    public service: personalCenterService
  ) { }

  ngOnInit() {
    let self = this;
    this.titleService.setTitle('充值');
    this.service.findFasterList().subscribe(data => {
      this.info = data.data;
      console.log(data)
    })
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
        console.log('password:', resultValue);
        // 检测密码长度
        if (activeIndex >= 6) {
          setTimeout(() => {
            self.checkPassword(resultValue);
            resetInput();
          }, 200);


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

    });
  }
  addBank() {
    mui.confirm('企业账户仅可提现，不可绑快捷支付', '请选择银行账户类型', ['个人', '企业'], (i) => {
      if (i.index == 0) {
        this.isShow = 2;//查询银行卡 2添加银行卡
      } else {
        this.isShow = 4;
      }
      this.router.navigateByUrl("/personalCenter/Mybank?show=" + this.isShow);
    });

  }
  checkPassword(Value) {
    this.service.fasterPay(this.info[this.cardIndex].snBinding, $('#money').val(), Value).subscribe(
      data => {
        sessionStorage["data"] = data.data;
        sessionStorage["money"] = $('#money').val();
        if (data.code == 0) {

          this.router.navigateByUrl("personalCenter/NoteComponent");
          $('.mui-backdrop').trigger('tap');
        }
        else mui.toast(data.msg);
      })
  }
  SuccessChild() {
    if ($('#money').val() == '') {
      mui.toast("请输入金额")
    } else mui('.mui-popover').popover('show');

  }
  selectCard(i) {
    this.cardIndex = i;
  }

  //返回上一页
  goBack() {
    window.history.go(-1);
  }
  //返回主页
  goHome() {
    this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
  }
}
