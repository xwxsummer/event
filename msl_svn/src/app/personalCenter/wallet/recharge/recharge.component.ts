import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Title }from '@angular/platform-browser';
import { personalCenterService } from  '../../personalCenter.service';
// import { Mybank } from  '../mybank/mybank.component';
declare var mui: any;
declare var wx: any;
declare var $: any;

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']

})
export class Recharge implements OnInit {
  public myMoeny: number;
  public isShow: number;
  public info: any[];
  public id: number;
  public money =parseFloat(sessionStorage['moneyResidue']);
  constructor(
    public router: Router,
    public titleService: Title,
    public service: personalCenterService
    // public mybank: Mybank
  ) {
  }
  ngOnInit(): void {
    let self = this;
    this.titleService.setTitle('提现');
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
  checkPassword(Value) {
    this.service.settlement(this.id, parseFloat($('#money').val()), Value).subscribe(
      data => {

        if (data.code == 0) {
          this.router.navigateByUrl("personalCenter/Bank")

          $('.mui-backdrop').trigger('tap');

          sessionStorage.put('recharge',{
            number:data.data,
            bank:$('#bank').text(),
            money:parseFloat($('#money').val())
          })
        }
        else mui.toast(data.msg);
      })
  }
  selectBank() {
    let self = this;
    this.service.findList().subscribe(data => {

      console.log('银行卡信息：', data);
      self.info = data.data;

      var picker = new mui.PopPicker();
      picker.setData(data.data.map(i => 0 || {
        text: `${i.bank} (****${i.cardNo})`,
        value: i.cardNo,
      }));
      picker.show(function(selectItems) {
        console.log(selectItems[0].text);
        console.log(selectItems[0].value);
        $('#bank').text(selectItems[0].text);
        $('#bank').val(selectItems[0].value);
        console.log(picker);
        self.id = self.info[picker.pickers[0].getSelectedIndex()].id;
      })
    })

  }

  SuccessChild() {
    if ($('#money').val() == '') {
      mui.toast("请输入金额")
    } else mui('.mui-popover').popover('show');

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
  //返回上一页
      goBack(){
          window.history.go(-1);
      }
      //返回主页
      goHome(){
          this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
      }
}
