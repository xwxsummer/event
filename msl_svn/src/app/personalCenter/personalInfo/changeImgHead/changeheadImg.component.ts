import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
//本地缓存
import { LocalStorage } from '../../../local_storage';
//http
import { personalCenterService } from  '../../personalCenter.service';
import {imgCompress} from "../../../deliverGoods/Remarks/imgCompress";
declare var $: any;
declare var mui: any;
export class imgData{
  constructor(
      public data:string,
      public type:string
  ){}
}
@Component({
  selector: 'app-passCertifi',
  template : `
 <label class="img posi_abslotu fenshenFont text_center fonSml" id="businessUpload" for="businessFile">
      <div class="text_center">点击头像修改</div>
      <div class="">
           <img src="{{headImg}}" alt="" class="headImg m0_auto" id="headImg"/>
      </div>
      <input type="file" id="businessChoose" accept="image/*" multiple>
      <ul class="img-list posi_abslotu w100">
        <li *ngFor="let img of businessImgList; let i = index" [ngStyle]="{'background-image':'url(' + img.data + ')'}"></li>
      </ul>
      <input type="file" id="businessFile" value=""/>
  </label>
  <div class="w100 posi_abslotu">
      <div style="width: 70%; margin: 3rem auto 1rem" id="bindFinish">
            <div class="bindFinish fff text_center height_3" (click)="sureChange();$event.stopPropagation();">确&nbsp;&nbsp;&nbsp;认</div>
      </div>
  </div>

  `,
  styles: [`.bot40 {bottom:40px;}
  input[type='file']{
  width: 40%;
    }
    .loading{
        display: block;
        margin:0 auto;
        width:20px;
        height:20px;
    }
    .headImg{
          display: block;
          width: 12rem;
          height: 12rem;
          margin-top: 2rem;
          border-radius: 50%;

    }
    .completed { background: lightblue; }
    .fenshenFont{
      padding-top: 1rem;
      top: 0px;
      left: 0px;
      border-radius: 5px;
    }
    .img{
        margin: 0 auto;
        display: block;
        width: 100%;
        min-height: 10rem;
        margin-left:0rem;
        margin-top: 0.6rem;
        border-radius: 50%;
    }
    .img span{
      line-height: 3rem;
      text-align: center;
      display: block;
    }
    input[type=file]{
      visibility: hidden;
    }

    #positiveChoose,#reverseChoose,#handChoose,#businessChoose{
      display: none;
    }
    canvas{
      width: 100%;
      border: 1px solid #000000;
    }
    #positiveUpload,#reverseUpload,#handUpload,#businessUpload{
      display: block;
      text-align: center;
      border-radius: 5px;
    }
    .img-list{
      height: 0%;
      top: 0px;

    }
    .img-list li{
      position: absolute;
      width: 0;
      height: 0%;
      background: #fff no-repeat center;
      background-size: cover;
      border-radius: 5px;
      color: #333;
      padding-top: 2rem;
    }
      .bindFinish{
      margin-top:150%;
      z-index:1000;
      }
  `]
})

export class ChangeheadImg implements OnInit{
  public businessImgList: any[] = [];//营业照
  public headImg: string;//头像

  constructor(
    public router: Router,
    public routeInfo: ActivatedRoute,//页面传值
    public localStorage: LocalStorage,
    public titleService: Title,
    public service : personalCenterService
  ){

  }

  ngOnInit(): void{//this.routeInfo.snapshot.queryParams["info"]

      this.titleService.setTitle('个人头像');
      this.headImg=this.routeInfo.snapshot.queryParams["headImg"];
    $("#bindFinish").hide();
    //$("#loading").hide();
    this.upLoadImg("businessFile","#businessUpload",this.businessImgList,"myTouxiang");

  }
//上传图片
    upLoadImg(positiveFile,positiveUpload,imgList,imgPhoto){
        //$("#loading").hide();
        let self=this;
        //console.log(self.localStorage.getObject("data").userId);
        var filechooser = document.getElementById(positiveFile);
        $(positiveUpload)
            .on("touchstart", function() {
                $(this).addClass("touch");
            })
            .on("touchend", function() {
                $(this).removeClass("touch");
            });
        let service = this.service;
        let localStorage = this.localStorage;

        filechooser.onchange = function() {
            //$("#loading").show();
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                imgCompress(file).then(function(result) {
                    var fixFileName;
                    fixFileName="owner_"+localStorage.getObject("data").userId;
                    if(imgList.length>0){
                        imgList[0]=new imgData(<string>result,file.type);

                        service.upBase64ImageHead(<string>result,fixFileName).then(data=>{
                            sessionStorage[imgPhoto]=data.json().data.domain;
                            if(data.json().code==0){
                                $("#bindFinish").show();
                                //$("#loading").hide();
                                $("#headImg").attr("src",data.json().data.domain+data.json().data.pathList[0]);
                                sessionStorage[imgPhoto]=data.json().data.pathList[0];
                            }
                        });
                    }else{
                        imgList.push(new imgData(<string>result,file.type));
                        service.upBase64ImageHead(<string>result,fixFileName).then(data=>{
                            if(data.json().code==0){
                                $("#bindFinish").show();
                                //$("#loading").hide();
                                $("#headImg").attr("src",data.json().data.domain+data.json().data.pathList[0]);
                                sessionStorage[imgPhoto]=data.json().data.pathList[0];
                            }
                        });
                    }
                });
            })
        };
    }

  //修改头像
  sureChange() {
    this.service.changePersonalCenterInfo(sessionStorage["myTouxiang"])
        .subscribe(
            data => {
          if(data.code==0){
              this.localStorage.set("myTouxiang",sessionStorage["myTouxiang"]);//存头像
            this.router.navigateByUrl("personalCenter/PersonalInfo");
          }
        }
    );
  }

}

