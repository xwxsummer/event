import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {personalCenterService} from "../../../personalCenter.service";
declare var mui: any;
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']

})


export class Detail implements OnInit {
  public list: any[] = [];
  public incomeList: any[] = [];
  public expendList: any[] = [];
  public page: number = 1;
  public date: string = '';
  public dateType: number = 0;
public loadingMore: string;//已经到底了
  constructor(
    public router: Router,
    public service: personalCenterService,
    public changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadingMore = "";
    let self = this;
    mui.ready(function() {
      mui('.mui-scroll-wrapper').scroll({
        bounce: true,
        indicators: true,
        deceleration: mui.os.ios ? 0.003 : 0.0009
      });
      $('.mui-scroll-wrapper').on('touchend', function() {
        let viewH = $(this).height(),//内容可见高度
          contentH = $(this).get(0).scrollHeight,//滚动当前距底部高度
          totalHeight = $(this).children().height(),//内容总高度
          scrollTop = $(this).scrollTop();//滚动高度
        if (totalHeight > 200 && contentH - viewH - scrollTop <= 80) { //到达底部100px时,加载新内容
          //if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
          // 这里加载数据..
          //self.nextPage();
          console.log('上拉加载');
          if (self.date) self.getDateList(self.date, self.dateType);
          else self.getList();
          $('<div>').attr('class', 'mui-pull-loading mui-icon mui-spinner').attr('style', 'display:block;margin:0 auto;').insertBefore('#scrollBottom');
          setTimeout(() => $('.mui-pull-loading').remove(), 2000);
        }//else if(contentH-totalHeight >= 80){
        //   //self.updateOrderInfo();
        //   console.log('下拉刷新');
        //   $('<div>').attr('class','mui-pull-loading mui-icon mui-spinner').attr('style','display:block;margin: 30px auto -10px;').insertBefore('.mui-scroll');//.mui-scroll>.data:first-of-type'
        //   setTimeout(()=>{
        //     $('.mui-pull-loading').remove();
        //     mui.toast('刷新成功');
        //   },1000);
        // }
      });
      mui('.mui-scroll').on('tap', '.mui-control-item:not(.mui-active)', function() {
        mui('.mui-slider').slider().gotoItem(this.getAttribute('data-index'));
      });

    });
    this.getList(1);

  }

  //显示年月，隐藏重复年月
  updateMonthView() {
    setTimeout(function() {
      let monthArr = [];
      $('.month').css('display', 'none');
      //年月的class都为 .month .年+月+收入\支出
      $('.month').filter(function() {//过滤出第一个未显示的
        //return monthArr.includes(this.classList[1])?//第二个class名未显示过
        return monthArr.filter(i => i === this.classList[1]).length ?
          false : monthArr.push(this.classList[1])
      }).css('display', 'block')
      //隐藏空白项目
      $('.list,.expendList,.incomeList').parent().css('display', 'none');
    }, 200)

  }

  DetailChild(id) {
    this.router.navigateByUrl("personalCenter/DetailChild?id=" + id);
  }
  //日期Picker
  showMsg3(): void {
    let self = this;
    mui.confirm('日,月', '', ['日', '月'], function(value) {
      new mui.DtPicker({
        type: value.index === 0 ? 'date' : 'month'
      }).show(function(e) {
        let date = e.value + (e.value.length === 10 ? '' : '-01');
        console.log(date);
        self.date = date;
        self.dateType = value.index + 1;
        self.getDateList(date, self.dateType, 1);
      })
    });
  }

  getList(page?) {
    if (!page) page = ++this.page;
    if (page == 1) {
      //清空原来的值
      this.page = 1;
      this.list.length = 0;
      this.incomeList.length = 0;
      this.expendList.length = 0;
      this.updateMonthView();
    }
    this.service.tradeFindList(localStorage['walletCode'], '', page).subscribe(data => {
      this.list.push(...data.data);
      console.log('全部：', data);
      this.updateMonthView();
    });
    this.service.tradeFindList(localStorage['walletCode'], 'income', page).subscribe(data => {
      this.incomeList.push(...data.data);
      console.log('收入：', data);
      this.updateMonthView();
    });
    this.service.tradeFindList(localStorage['walletCode'], 'expend', page).subscribe(data => {
      this.expendList.push(...data.data);
      console.log('支出：', data);
      this.updateMonthView();
    });
  }

  getDateList(date, type, page?) {
    if (!page) page = ++this.page;
    if (page == 1) {
      //清空原来的值
      this.page = 1;
      this.list.length = 0;
      this.incomeList.length = 0;
      this.expendList.length = 0;
      this.updateMonthView();
    }
    //获取全部数据
    this.service.findDateList(date, '', type, page).subscribe(data => {
      console.log(date, '全部：', data);
      this.list.push(...data.data);
      this.updateMonthView();
      // if (data.data.length === 0) {
      //   this.loadingMore = "没有更多数据了";
      //   //this.noneIfno=2;
      // }
    });
    //获取支出数据
    this.service.findDateList(date, 'expend', type, page).subscribe(data => {
      console.log(date, '支出：', data);
      this.expendList.push(...data.data);
      this.updateMonthView();
    });
    //获取收入数据
    this.service.findDateList(date, 'income', type, page).subscribe(data => {
      console.log(date, '收入：', data);
      this.incomeList.push(...data.data);
      this.updateMonthView();
    });
  }

}
