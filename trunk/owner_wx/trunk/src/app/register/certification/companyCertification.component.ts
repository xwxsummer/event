/**
 * by于婷
 *
 * ******/
import { Output, EventEmitter, Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { authInfoDTO } from './fragment/authInfoDTO';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RegiterService } from  '../Register.service';
import { upLoadImg } from "../../fragment/upDataImg";
import { ValidateMessage } from  '../../fragment/validateMessage';
declare var mui: any;
declare var $: any;
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
  public ValidateMessage;
  public authInfoDTO:authInfoDTO;
  public upLoadImg: upLoadImg;
  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : RegiterService
  ){
    this.authInfoDTO = new authInfoDTO();
    this.authInfoDTO.status=0;
    this.upLoadImg = new upLoadImg(this.service);
    this.ValidateMessage = new ValidateMessage();
  }


  ngOnInit(): void{
    this.titleService.setTitle('认证');
    this.certifi=this.routeInfo.snapshot.queryParams["certifi"];
    //this.certifi==1 认证    this.certifi==2 个人信息
    if(this.certifi=="1"){//this.certifi==1 认证
      this.type =(this.routeInfo.snapshot.queryParams["type"]);
      if(this.type=="1"){
        this.authInfoDTO.type=1;//个人
        console.log(this.authInfoDTO.type)
      }else if(this.type=="2"){
        this.authInfoDTO.type=2;//企业认证
        console.log(this.authInfoDTO.type)
        }
    }
    this.upLoadImg.UpLoadImg("positiveFile","#positiveUpload",this.positiveImgList,"cardFrontImg");
    this.upLoadImg.UpLoadImg("reverseFile","#reverseUpload",this.reverseImgList,"cardBackImg");
    this.upLoadImg.UpLoadImg("handFile","#handUpload",this.handImgList,"faceCardImg");
    this.upLoadImg.UpLoadImg("businessFile","#businessUpload",this.businessImgList,"businessImg");
    if(this.authInfoDTO.type==1){
      $("#businessPhoto").hide();
    }

  }
  //点击值为空
  ValueNone(info){
    this.authInfoDTO[info]="";
  }
  submitForm():void {
    //跳到审核页面
    if(this.authInfoDTO.type==1){//个人
      //验证姓名
      if(this.ValidateMessage.validateName(this.authInfoDTO.name)==1){
        //验证身份证
        if(this.ValidateMessage.validateCardNo(this.authInfoDTO.cardNo)==1){
          //验证正面照
          console.log(sessionStorage["cardFrontImg"]);
          if(sessionStorage["cardFrontImg"]){
            this.authInfoDTO.cardFrontImg=sessionStorage["cardFrontImg"];
            //验证反面照
            if(sessionStorage["cardBackImg"]){
              this.authInfoDTO.cardBackImg=sessionStorage["cardBackImg"];
              //验证手持身份证照
              if(sessionStorage["faceCardImg"]){
                this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                console.log(this.authInfoDTO);
                this.service.conpanyCertifi(this.authInfoDTO)
                      .subscribe(
                          data => {
                        if(data.code==0){
                          this.router.navigateByUrl("certification/checking?checking=1");//跳到审核界面
                        }else if(data.code==4132){
                          this.router.navigateByUrl("certification/checking?checking=1");//跳到审核界面
                        }else{
                          mui.toast(data.msg,{ duration:'short', type:'div' });
                          console.log("hehjeh")
                        }

                      }
                  );
              }else{
                mui.toast("请添加手持身份证照",{ duration:'short', type:'div' });

              }

            }else{
              mui.toast("请添加身份证反面照",{ duration:'short', type:'div' });

            }

          }else{
            mui.toast("请添加身份证正面照",{ duration:'short', type:'div' });

          }

        }
      }
    }else if(this.authInfoDTO.type==2){
      if(this.ValidateMessage.validateName(this.authInfoDTO.name)==1){//验证姓名
        if(this.authInfoDTO.title){
          //验证身份证
          if(this.ValidateMessage.validateCardNo(this.authInfoDTO.cardNo)==1){
            if(this.authInfoDTO.groupCode){//请输入公司统一社会信用代码
              if(this.authInfoDTO.company){//请输入公司名称
                if(this.authInfoDTO.address){//请输入公司地址
                // 验证正面照
                  if(sessionStorage["cardFrontImg"]){
                    this.authInfoDTO.cardFrontImg=sessionStorage["cardFrontImg"];
                    //验证反面照
                    if(sessionStorage["cardBackImg"]){
                      this.authInfoDTO.cardBackImg=sessionStorage["cardBackImg"];
                      //验证手持身份证照
                      if(sessionStorage["faceCardImg"]){
                        this.authInfoDTO.faceCardImg=sessionStorage["faceCardImg"];
                        //验证手持身份证照
                        if(sessionStorage["businessImg"]){
                          this.authInfoDTO.businessImg=sessionStorage["businessImg"];
                          this.service.conpanyCertifi(this.authInfoDTO)
                              .subscribe(
                                  data => {
                                if(data.code==0){
                                  this.router.navigateByUrl("certification/checking?checking=1");//跳到审核界面
                                }else{
                                  mui.toast(data.msg,{ duration:'short', type:'div' });

                                }
                              }
                          );
                        }else{
                          mui.toast("请添加营业照",{ duration:'short', type:'div' });
                        }
                      }else{
                        mui.toast("请添加手持身份证照",{ duration:'short', type:'div' });
                      }
                    }else{
                      mui.toast("请添加身份证反面照",{ duration:'short', type:'div' });
                    }

                  }else{
                    mui.toast("请添加身份证正面照",{ duration:'short', type:'div' });

                  }
                }else{
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
  }

}
