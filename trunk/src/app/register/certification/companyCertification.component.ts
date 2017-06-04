/**
 * by于婷
 *
 * ******/
import { Output, EventEmitter, Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { authInfoDTO } from './fragment/authInfoDTO';
import { CommonModule } from '@angular/common';
import { RegiterService } from  '../Register.service';
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
declare var mui: any;
declare var $: any;
//../assets/images/bac_certification.png
export class imgData{
  constructor(
      public data:string,
      public type:string
  ){}
}
@Component({
  selector: 'app-companyCertification',
  templateUrl: './companyCertification.component.html',
  styleUrls: ['./companyCertification.component.css']

})

export class CompanyCertification implements OnInit{
  public certifi:string;//判断从哪个界面跳过来
  public type :string;//type=1个人认证 type=2企业认证
  public positiveImgList: any[] = [];//正面照
  public reverseImgList: any[] = [];//反面照
  public handImgList: any[] = [];//手持身份
  public businessImgList: any[] = [];//营业照
  public authInfoDTO:authInfoDTO;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : RegiterService
  ){
    this.authInfoDTO = new authInfoDTO();
    this.authInfoDTO.businessImg="1111111";
    this.authInfoDTO.cardBackImg="1111111";
    this.authInfoDTO.cardFrontImg="1111111";
    this.authInfoDTO.faceCardImg="1111111";
    this.authInfoDTO.status=0;
  }
  //上传图片

  upLoadImg(positiveFile,positiveUpload,imgList){
    var filechooser = document.getElementById(positiveFile);
    $(positiveUpload)
        .on("touchstart", function() {
          $(this).addClass("touch")
        })
        .on("touchend", function() {
          $(this).removeClass("touch")
        });
    var imgList = imgList;
    console.log(imgList);
    console.log(111111111111);
    filechooser.onchange = function() {
      if (!(<HTMLInputElement>this).files.length) return;
      var files = Array.from((<HTMLInputElement>this).files);
      if (files.length > 1) {
        alert("最多同时只可上传6张图片");
        return;
      }
      files.forEach(function(file, i) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
        imgCompress(file).then(function(result) {
          if(imgList.length>0){
            imgList[0]=new imgData(<string>result,file.type);
            console.log(imgList);
          }else{
            imgList.push(new imgData(<string>result,file.type));
            console.log(imgList);
            console.log(22222222222);
          }
        });

      })
    };

  }

  ngOnInit(): void{
    this.certifi=this.routeInfo.snapshot.queryParams["certifi"];
    //this.certifi==1 认证    this.certifi==2 个人信息
    if(this.certifi=="1"){//this.certifi==1 认证
      this.type =(this.routeInfo.snapshot.queryParams["type"]);
      if(this.type=="1"){
        this.authInfoDTO.type=1;//个人
      }else{
        this.authInfoDTO.type=2;//企业认证
        this.authInfoDTO.businessImg="1111111";

      }

    }
    this.upLoadImg("positiveFile","#positiveUpload",this.positiveImgList);
    this.upLoadImg("reverseFile","#reverseUpload",this.reverseImgList);
    this.upLoadImg("handFile","#handUpload",this.handImgList);
    if(this.certifi=="2"){
      this.upLoadImg("businessFile","#businessUpload",this.businessImgList);
    }

  }

  submitForm():void {
    //跳到审核页面
    this.service.conpanyCertifi(this.authInfoDTO);

  }

}
