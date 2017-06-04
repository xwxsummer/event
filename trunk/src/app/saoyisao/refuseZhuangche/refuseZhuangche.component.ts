
import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;
import { RefuseZhuangcheService } from  './refuseZhuangche.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";

@Component({
  selector: 'app-refuseZhuangche',
  templateUrl: './refuseZhuangche.component.html',
  styleUrls: ['./refuseZhuangche.component.css'],
  providers:[ RefuseZhuangcheService ]

})
export class RefuseZhuangche {

  receivelist = [];
  sendlist = [];
  imgList = [];
  remarkText = '';
  public transportationInfo:Object;
  public orderNo:any;
  AdditionalTip = [false,false,false,false,false,false];//所有描述
  old_AdditionalTip = this.AdditionalTip.slice();//之前被激活的描述，用于取消
  AdditionalTipArr = [];//用于传递的文本值

  constructor(
      public router: Router,
      public service : RefuseZhuangcheService
  ){}

  ngOnInit() {
    let imgList = this.imgList;
      $('input').change(function(event){
          imgCompress(event.target.files[0]).then(data=>imgList.push(data));
      })
  }

//点击描述
AdditionalTip_click(info){
    switch(this.AdditionalTip[info]){
      case true:
        this.AdditionalTip[info] = false;
        break;
      case false:
        //如果被激活的大于三个不操作
        if( this.AdditionalTip.filter(i=>i === true).length >= 3 )break;
        this.AdditionalTip[info]=true;
    }
  }
 //点击确定
AdditionalTip_confirm(){
    this.AdditionalTipArr = Array.from(document.querySelectorAll('li.mui-table-view-cell.special') as NodeListOf<HTMLElement>).map(i=>i.innerText)
    //保存当前值用于取消
    this.old_AdditionalTip = this.AdditionalTip.slice();
}

//提交拒绝原因
  onSubmit(myForm){
    console.log(myForm);
    console.log(this.receivelist)
    console.log(this.sendlist)
     console.log(this.AdditionalTipArr.join('|'))
    console.log('提交拒绝原因');
    this.service.submitOrderInfo(myForm,this.sendlist,this.receivelist,this.AdditionalTipArr.join('|'))
      .then(data => this.orderNo = data)
      .then(orderNo=>this.router.navigateByUrl("saoYiSao/RefuseSuccess/"+orderNo));
  }

}
