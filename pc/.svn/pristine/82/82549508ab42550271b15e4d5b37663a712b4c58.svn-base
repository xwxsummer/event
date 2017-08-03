import {MyGoodsService} from '../my-goods.service';
import {Router, ActivatedRoute,} from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $ ;

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css']
})
export class OrderQueryComponent implements OnInit {
  public datas;
  public totalNum;
  public pageNum;
  public pageSize=5;
  public tzpageNum:number=1;//点击的跳转页
  public params = {};
  public adress;
  public childStatus = 107;
  constructor(
    public activatedRoute: ActivatedRoute,
    public service : MyGoodsService,
    public router: Router

  ) { }

  changePageNum(pageChange:number){
     this.tzpageNum =  pageChange;
     console.log(this.tzpageNum);
  }
  //重置清空
  clear(){
    $("input").val("");
  }
  //筛选
  form(){
    
    $('input').each((index, val) => val['value'] ? this.params[val['name']] = val['value'] : this.params[val['name']]="");
    console.log(this.params);
    this.childStatus = $("#test option:selected").val();
    this.finds();
  }
  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id'])
    this.finds();
          }
  finds(){
    this.service.getOrderChildListByParam(this.activatedRoute.snapshot.params['id'],this.tzpageNum,this.params,this.childStatus)
         .subscribe(
          data =>{
            if(data.code==0){
              this.datas=data.data;
              console.log(data);
              this.totalNum=data.total;//记录总条数
              this.pageNum=data.pageNum;//当前处在的页数
               for(var i=0;i<data.data.length;i++){
             this.adress=data.data[i].receiveCity+data.data[i].receiveAddress;
             this.adress=this.adress.substr(0,10)+"...";
             }
                }else{
                  alert(data.msg)
                }
              }
            )
  }
  //查看详细
  orderView(childNo){
    console.log(childNo);
    this.router.navigateByUrl("content/myGoods/invoiceDetailsInfo/"+childNo)
  }
}

