/**
 * by于婷
 *
 * ******/

import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { authInfoDTO } from '../../../register/certification/fragment/authInfoDTO';//注册 认证
//http
import { personalCenterService } from  '../../personalCenter.service';
import { Title } from '@angular/platform-browser';
import { upLoadImg } from "../../../fragment/upDataImg";//上传图片
//验证
import { ValidateMessage } from '../../../fragment/validateMessage';

declare var $: any;
declare var mui: any;
@Component({
  selector: 'app-updateAuthMessage',
  templateUrl: '../../../register/certification/companyCertification.component.html',
  styleUrls: ['../../../register/certification/companyCertification.component.css'],
  providers:[ personalCenterService ]


})

export class UpdateAuthMessage implements OnInit{
  public certifi:string;//判断从哪个界面跳过来
  public changePositiveImg;//正面照../assets/images/bac_certification.png
  public changeReverseImg;//反面照../assets/images/bac_certification.png
  public changeHandImg;//手拿../assets/images/bac_certification.png
  public changeBusinessImg;//营业照../assets/images/bac_certification.png
  public authInfoDTO;//../assets/images/bac_certification.png
  public positiveImgList: any[] = [];//正面照
  public reverseImgList: any[] = [];//反面照
  public handImgList: any[] = [];//手持身份
  public businessImgList: any[] = [];//营业照
  public upLoadImg: upLoadImg;
  public ValidateMessage;//验证验证码
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.authInfoDTO = new authInfoDTO();
    this.upLoadImg = new upLoadImg(this.service);
    this.ValidateMessage = new ValidateMessage();
  }

  ngOnInit(): void{
    this.titleService.setTitle('查看认证信息');
    this.certifi=this.routeInfo.snapshot.queryParams["certifi"];
    //this.certifi==1 认证    this.certifi==2 个人信息
    if(this.certifi=="2"){//this.certifi==1 个人信息
      this.service.getAuthMessage()
        .subscribe(
          data => {
          if(data.code==0){   //请求成功
            this.authInfoDTO=data.data;
            this.changePositiveImg=data.data.cardFrontImg;//正面照
            this.changeReverseImg=data.data.cardBackImg;//反面照
            this.changeHandImg=data.data.faceCardImg;//手拿照
            this.changeBusinessImg=data.data.businessImg;//营业照
            if(this.authInfoDTO.type==1){//个人
              $("#changePositive").hide();//正面照
              $("#changeReverse").hide();//反面照
              $("#changeHand").hide();//手拿照
              $("#businessPhoto").hide();//营业照
              $("#bindFinish").hide();//提交
              $('#personalName').attr("disabled",true);//姓名不可以编辑
              $('#cardNo').attr("disabled",true);//姓名不可以编辑
             }


          }
        }
      );
    }
    this.upLoadImg.UpLoadImg("positiveFile","#positiveUpload",this.positiveImgList,"cardFrontImg");
    this.upLoadImg.UpLoadImg("reverseFile","#reverseUpload",this.reverseImgList,"cardBackImg");
    this.upLoadImg.UpLoadImg("handFile","#handUpload",this.handImgList,"faceCardImg");
    this.upLoadImg.UpLoadImg("businessFile","#businessUpload",this.businessImgList,"businessImg");


  }
  //点击值为空
  ValueNone(info){
    if(this.authInfoDTO.type==1){

    }else{
      this.authInfoDTO[info]="";
    }
  }
  //发送请求
  resubmitFrom(){
    this.service.updateAuthMessage(this.authInfoDTO)
        .subscribe(
            data => {
          if(data.code==0){
            this.router.navigateByUrl("certification/checking?checking=2");//跳到审核界面
          }else{
            mui.toast(data.msg,{ duration:'short', type:'div' });

          }
        }
    );
  }
  submitForm():void {
    //跳到审核页面
    if(this.authInfoDTO.type==2){
      if(this.ValidateMessage.validateName(this.authInfoDTO.name)==1){//验证姓名
        if(this.authInfoDTO.title){
          //验证身份证
          if(this.ValidateMessage.validateCardNo(this.authInfoDTO.cardNo)==1){
            if(this.authInfoDTO.groupCode){//请输入公司统一社会信用代码
              if(this.authInfoDTO.company){//请输入公司名称
                if(this.authInfoDTO.address){//请输入公司地址
                  if(sessionStorage["cardFrontImg"]){//身份证正面照改变
                    this.authInfoDTO.cardFrontImg=sessionStorage["cardFrontImg"];
                    if(sessionStorage["cardBackImg"]){
                      this.authInfoDTO.cardBackImg=sessionStorage["cardBackImg"];
                      if(sessionStorage["faceCardImg"]){
                        this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }else{
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }
                    }else{
                      if(sessionStorage["faceCardImg"]){
                        this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }else{
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }
                    }
                  }else{//身份证正面照不改变
                    if(sessionStorage["cardBackImg"]){
                      this.authInfoDTO.cardBackImg=sessionStorage["cardBackImg"];
                      if(sessionStorage["faceCardImg"]){
                        this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }else{
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }
                    }else{
                      if(sessionStorage["faceCardImg"]){
                        this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }else{
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.resubmitFrom();
                        }else{
                          this.resubmitFrom();
                        }
                      }
                    }
                  }
                }
                else{
                  mui.toast("请输入公司地址",{ duration:'short', type:'div' });
                }
              }else{
                mui.toast("请输入公司名称",{ duration:'short', type:'div' });
              }
            }else{
              mui.toast("请输入公司统一社会信用代码",{ duration:'short', type:'div' });
            }
          }
        }else{
          mui.toast("请输入公司职位",{ duration:'short', type:'div' });
        }
      }

    }

    //跳到审核页面
    this.service.updateAuthMessage(this.authInfoDTO);

  }



}
