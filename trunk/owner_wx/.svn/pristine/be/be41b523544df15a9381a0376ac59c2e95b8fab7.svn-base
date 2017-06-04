import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;
import { saoyisaoService } from '../saoyisao.service';
import { FormsModule } from '@angular/forms';

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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service : saoyisaoService
  ){ }
  ngOnInit(){
   console.log(this.activatedRoute.snapshot.params['id'])

   this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){
            this.data=data.data;
          }else{
            alert(data.msg)
          }
        }
    );
  }
  //获取皮重
   onKey1(values){
    let t=$("input[name=pizhong]").val();//判断input的值是否为数字
      if(isNaN(t)){
          mui.alert("只能输入数字");
          $("input[name=pizhong]").focus().val("");
      }
  }
  //获取毛重
  onKey2(values2){
     let m=$("input[name=maozhong]").val();//判断input的值是否为数字
      if(isNaN(m)){
          mui.alert("只能输入数字");
          $("input[name=maozhong]").focus().val("");
      }
      let p=$("input[name=pizhong]").val();
     
    if(!this.values||!values2||isNaN(m)){return}
    else if(m<p){
        mui.alert("毛重不能小于皮重")
        $("input[name=maozhong]").focus().val("");
        return
    }else{
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
    else if(!myForm.maozhong){
      mui.alert("毛重不能为空")
      return
    }
    this.service.updateConfirmLoadByChildNo(myForm,this.data).subscribe(
        data => {
          if(data.code==0){
            //this.router.navigateByUrl("saoYiSao/ZhuangcheSuccess/"+this.data.childNo); 
        }
        else{
           mui.alert(data.msg)
               }}
    )
  }
}
