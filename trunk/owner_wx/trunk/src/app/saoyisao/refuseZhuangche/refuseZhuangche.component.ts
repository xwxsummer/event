
import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
declare var $:any;
import { saoyisaoService } from  '../saoyisao.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";

@Component({
  selector: 'app-refuseZhuangche',
  templateUrl: './refuseZhuangche.component.html',
  styleUrls: ['./refuseZhuangche.component.css'],
  providers:[ saoyisaoService ]

})
export class RefuseZhuangche {
  public imgList = [];
  public pushImg = [];
  public transportationInfo:Object;
  AdditionalTip = [false,false,false,false,false,false];//所有描述
  old_AdditionalTip = this.AdditionalTip.slice();//之前被激活的描述，用于取消
  AdditionalTipArr = [];//用于传递的文本值

  constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public service : saoyisaoService
  ){}

  ngOnInit() {
    let imgList = this.imgList;
      
      $('.addImg').change(function(event){
        imgCompress(event.target.files[0]).then(data=>imgList.push(data));
      })
     
     let filechooser = document.getElementById("file");
      $("#upload")
            .on("touchstart", function() {
                $(this).addClass("touch")
            })
            .on("touchend", function() {
                $(this).removeClass("touch")
            });
     filechooser.onchange = function() {
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            if (imgList.length >6) {
                mui.alert("最多同时只可上传6张图片")
                // imgList=imgList.pop()
                // console.log(imgList)
                return;
            }
     }
  }
removeImage(index){
      //console.log(index);
      this.imgList.splice(index,1);
      //this.imgOutput.emit(this.imgList);
      //console.log(this.imgList)
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
    this.old_AdditionalTip = this.AdditionalTip.slice();  
  }
//提交拒绝原因
  onSubmit(myForm){
    
    let childNo = this.activatedRoute.snapshot.params['id'];
    //获取拒绝原因
    this.AdditionalTipArr = Array.from(document.querySelectorAll('li.mui-table-view-cell.special') as NodeListOf<HTMLElement>).map(e=>e.innerText);
    //添加有话说到数组中
    //this.AdditionalTipArr.push(myForm.speaks);
  
    if(this.AdditionalTipArr[0]==''){
      mui.alert("拒绝装车原因和有话说不能都为空")
      return;
    }
    //上传图片
 for(let i=0;i<this.imgList.length;i++) {
      this.service.upBase64Image(this.imgList[i]).subscribe(
        data=>{
        this.pushImg.push(data.data.pathList[0]);
      })
    }
    let remark
    if(myForm.speaks!=""){
       remark = JSON.stringify(this.AdditionalTipArr.join(',')).replace(/"/g,"")+","+myForm.speaks;
    }else{
       remark = JSON.stringify(this.AdditionalTipArr.join(',')).replace(/"/g,"")
    }
      console.log(remark)
       this.service.refuseLoad(this.pushImg,remark,childNo)
        .subscribe(data => {
          if(data.code==0){//success
             this.router.navigateByUrl("saoYiSao/RefuseSuccess/"+this.activatedRoute.snapshot.params['id']);
       }   
          else{
             mui.alert(data.msg)
            }
        })
      }

}