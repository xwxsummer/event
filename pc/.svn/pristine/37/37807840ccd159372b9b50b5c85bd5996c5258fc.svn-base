import { Component, OnInit } from '@angular/core';
import { MyWalletService } from "app/content/my-wallet/my-wallet.service";
declare let layui: any;
declare let layer: any;
declare let $: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public data;
  public income:number=0;
  public spending:number=0;
  public pageSize:number=5;
  public totalNum;
  public tzpageNum=1;
  public pageNum;
  public page;
  public fund = '';
  constructor(
     public service:MyWalletService
  ) { }
 
  finds(){
    let objD= new Date();
    var YY = objD.getFullYear();
    let mm = objD.getMonth()+1;
    if(mm<10){
        var MM = '0' + mm;
      }else{
        var MM =mm+"";
    }
    var dd = objD.getDate();
    if(dd<10) {
        var DD = '0' + dd;
      }else{
        var DD =dd + "";
    }
    let str = YY+"-"+MM +"-"+DD;
    console.log(str);
    let params = new Params();
    params.date=$('#startTime').val()? $('#startTime').val():"2012-12-12";
    params.endDate = $('#endTime').val()? $('#endTime').val():str;
    params.payType = $('#payType').val();
    params.tzpageNum = this.tzpageNum;
    this.service.findDateList(params)
      .subscribe(data =>{
        this.data=data.data;
        this.totalNum=data.total;//记录总条数
        this.pageNum=data.pageNum;//当前处在的页数   
        console.log(this.data);
        if(data.code==0){
          console.log(data);
        }else{
          layer.msg(data.msg);
        }  
      })
    }
  changePageNum(pageChange:number){
    this.tzpageNum =  pageChange;
    console.log(this.tzpageNum);
    this.finds();
  }
  ngOnInit() {
    this.finds();
    //获取总收入
     this.service.tradeFindList(this.pageSize,this.tzpageNum,"income")
      .subscribe(data=>{
          console.log( data);
          if(data.data[0].residue){
          this.income = data.data[0].residue;
          }else{
             this.income = 0;
          }
        })
    //获取总支出
     this.service.tradeFindList(this.pageSize,this.tzpageNum,"expend")
      .subscribe(data=>{
          console.log( data);
          if(data.data[0].residue){
             this.spending = data.data[0].residue;
          }else{
            this.spending = 0;
          }
        })
  }

getList() {
    this.finds();
  } 
} 
export class Params{
  public date;
  public endDate;
  public payType;
  public pagSize;
  public tzpageNum;
} 