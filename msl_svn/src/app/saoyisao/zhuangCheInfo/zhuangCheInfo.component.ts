import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;
import { saoyisaoService } from '../saoyisao.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-zhuangCheInfo',
  templateUrl: './zhuangCheInfo.component.html',
  styleUrls: ['./zhuangCheInfo.component.css']

})

export class ZhuangCheInfo implements OnInit{
  public values:number;
  public values2:number;
  public jingzhong: number;
  public price: number;
  public info:any;
  public data;
  public myForms: string[];
  public errorMessage: string;
  public submitlag: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service : saoyisaoService
  ){ }
  ngOnInit():void{
    this.submitlag=false;//默认可以点击
    this.titleService.setTitle('装车信息');
    console.log(this.activatedRoute.snapshot.params['id'])

    this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          if(data.code==0){
            this.data=data.data;
          }else{
            mui.alert(data.msg)
          }
        }
    );
  }
  //获取皮重
   onKey1(values){
    // let t=$("input[name=pizhong]").val();//判断input的值是否为数字
      if(isNaN(values)){
          mui.toast("只能输入数字");
          $("input[name=pizhong]").focus().val("");
      }
      let maozh=$("input[name=maozhong]").val(); 
      console.log(values);
      console.log(maozh)
      if(values!=""&&maozh!=""){
        console.log("添加皮重")
        this.jingzhong =this.values2-values;
        this.price = this.jingzhong*this.data.freightPrice;
     } 
   }
  //获取毛重
  onKey2(values2){
    // let m=$("input[name=maozhong]").val();//判断input的值是否为数字
      if(isNaN(values2)){
          mui.toast("只能输入数字");
          $("input[name=maozhong]").focus().val("");
          $("input[name=jingzhong]").val("");
          $("input[name=yunfei]").val("");
          return
      }
     let pizh=$("input[name=pizhong]").val();   
     if(values2&&pizh){
       console.log("添加毛重")
        this.jingzhong = values2-this.values;
        this.price = this.jingzhong*this.data.freightPrice;
     }
  }
//装车成功
  ZhuangcheSuccess(myForm) {
   
    if(!myForm.pizhong) {
       mui.alert("皮重不能为空");
       return
    }
     if(!myForm.maozhong) {
      mui.alert("毛重不能为空")
      return
    }
    if(myForm.jingzhong<0) {
       mui.toast("皮重不能大于毛重,请重新填写");
       $("input[name=pizhong]").val("");
       $("input[name=maozhong]").val("");
       $("input[name=jingzhong]").val("");
       $("input[name=yunfei]").val("");
       return
    }
    this.submitlag=true;//不可以点击
    this.service.updateConfirmLoadByChildNo(myForm,this.data).subscribe(
        data => {
        if(data.code==0){
            this.router.navigateByUrl("saoYiSao/ZhuangcheSuccess/"+this.data.childNo); 
        }
        else{
           mui.alert(data.msg)
               }
          this.submitlag=false;//可以点击
        }
               
    )
  }
}
