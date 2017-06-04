import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;
declare var $:any;

@Component({
  selector: 'app-successGoods',
  templateUrl: './successGoods.component.html',
  styleUrls: ['./successGoods.component.css']

})
export class SuccessGoods  implements OnInit{
  public index = [];
  public index1 = [];
  public type = 1; //默认好评是1，差评是0；
 
  public data;
  public AdditionalTip = [false,false,false,false,false,false];//所有描述
         old_AdditionalTip = this.AdditionalTip.slice();//之前被激活的描述，用于取消
         AdditionalTipArr = [];//用于传递好评的文本值

  public AdditionalTip1 = [false,false,false,false,false,false];//所有描述
         old_AdditionalTip1 = this.AdditionalTip1.slice();//之前被激活的描述，用于取消
        // AdditionalTipArr1 = [];//用于传递差评的文本值
  public result;
  public myDate:Date;
  public time: string;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,//页面传值
    public service:confirmGoodsService
  ){
     this.myDate = new Date();
  }
  //点击描述
AdditionalTip_click(info){
  this.AdditionalTip1 = [false,false,false,false,false,false];
  this.type = 1;
  console.log("好评的描述")
    switch(this.AdditionalTip[info]){
      case true:
        this.AdditionalTip[info] = false;
        break;
      case false:
        this.AdditionalTip[info]=true;
    }
  }
 //点击描述
AdditionalTip_click1(info){
  this.AdditionalTip = [false,false,false,false,false,false];
  this.type = 0;
  console.log("差评的描述")
    switch(this.AdditionalTip1[info]){
      case true:
        this.AdditionalTip1[info] = false;
        break;
      case false:
        this.AdditionalTip1[info]=true;   
    } 
  }
ngOnInit():void{
   this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
    .subscribe(data => {
      if(data.code==0){//成功
      console.log(data)
      this.data=data.data;
      }else{
      alert(data.msg)
          }
    })  
}
//查看明细
successGoods() {
     this.router.navigateByUrl("confirmGoods/DetailsPage/"+this.activatedRoute.snapshot.params['id']);
}
//提交评价
SubmitEvaluation(forms) {
   mui.alert(this.type)
		function getData(){
			//定义结果数组
			let resultArray = new Array();
			$(".special").each(function(){
				//定义结果对象
				let resultObject = {"labelId":"", "label":""};
				let specialIndex = $(this).index()+1;
				let specialHtml = $(this).html();
				let property;
				for(property in resultObject)
					if(property == "labelId")
						resultObject[property] = specialIndex;
					else if(property == "label")
						resultObject[property] = specialHtml;
				resultArray.push(resultObject);	
			});	
			return resultArray;
		}
// alert(JSON.stringify(getData()))
 this.result = JSON.stringify(getData())

  let year =  this.myDate.getFullYear();
      let month = this.myDate.getMonth()+1;
      let day = this.myDate.getDate();    
      let week = this.myDate.getDay();  
      let hour = this.myDate.getHours(); 
      let minutes = this.myDate.getMinutes(); 
      let seconds = this.myDate.getSeconds();
       this.time = year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;

//保存当前值用于取消
  this.old_AdditionalTip = this.AdditionalTip.slice();
  let label = Array.from(document.querySelectorAll('li.mui-table-view-cell.special') as NodeListOf<HTMLElement>).map(i=>i.innerText)
  //保存数据到localStorage，为下一页的数据显示提供条件
  let nun = "1";
  let num = "2";
  let parse = JSON.stringify(label);
  sessionStorage.setItem(nun,parse);
  let speak = JSON.stringify(forms);
  sessionStorage.setItem(num,speak);
  let times = JSON.stringify(this.time);
  sessionStorage.setItem("3",times)
   if(forms==""||this.result==[]){
      mui.alert("不能提交空评价")
      return
   }else{
  this.service.submitOwnerEvaluate(forms,this.result,this.data,this.type,this.time).subscribe(
    data => {
      if(data.code==0){
        mui.toast('评价成功',{ duration:'short', type:'div' })  
        this.router.navigateByUrl("confirmGoods/DetailInfos/"+this.activatedRoute.snapshot.params['id'])
      }else{
        alert(data.msg)
      }
   }
 )}
}
}
