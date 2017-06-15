import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//地址查询
import { getAddress } from  '../getAddress';
//验证姓名
import { ValidateMessage } from  '../../../fragment/validateMessage';

//本地缓存
import { LocalStorage } from '../../../local_storage';
//http
import { personalCenterService } from  '../../personalCenter.service';
declare var mui: any;


@Component({
  selector: 'app-editReceive',
  templateUrl: './editReceive.component.html',
  styleUrls: ['./editReceive.component.css']

})

export class EditReceive implements OnInit{
  public getAddress:getAddress;
  public ValidateMessage;
  public submitlag:boolean;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public service : personalCenterService
  ){
    this.getAddress = new getAddress();
    this.ValidateMessage = new ValidateMessage();
  }
  ngOnInit(): void{
      mui('.mui-switch')['switch']();
    this.submitlag=false;
    //根据ID查询地址
    if(this.routeInfo.snapshot.queryParams["id"]){
      this.service.getAddress(this.routeInfo.snapshot.queryParams["id"])
          .subscribe(
              data => {
            if(data.code==0){//成功
              this.localStorage.setObject("addressDate",data.data);
              this.getAddress=data.data;
              this.showMapReceiveInfo();
              console.log(data);
              if(this.getAddress.def==1){//默认收货地址
                document.getElementById("mySwitch").className="mui-switch mui-switch-mini mui-active";
              }
            }else{
              mui.toast(data.msg);
            }
          }
      );
    }else{
      this.getAddress=this.localStorage.getObject("addressDate");
      if(this.getAddress.def==1){//默认收货地址
        document.getElementById("mySwitch").className="mui-switch mui-switch-mini mui-active";
      }
      //从编辑跳过来
      if(this.routeInfo.snapshot.queryParams["type"]=="6"){
      }else if(this.routeInfo.snapshot.queryParams["type"]==5){
        this.getAddress=this.localStorage.getObject("getAddress");
        this.getAddress.name=this.localStorage.getObject("addEmpoly").name;
        this.getAddress.phone=this.localStorage.getObject("addEmpoly").phone;
        this.getAddress.handlerId=this.localStorage.getObject("addEmpoly").staffId;
      }
    }
    this.showMapReceiveInfo();
  }

  showMapReceiveInfo(){
    //如果有从地图选择的数据显示地图数据
    let mapReceiveInfo = JSON.parse(sessionStorage['mapReceiveInfo'] || '{}');
    this.getAddress.province = mapReceiveInfo['province'] || '';
    this.getAddress.city = mapReceiveInfo['city'] || '';
    this.getAddress.county = mapReceiveInfo['county'] || '';
    this.getAddress.town = mapReceiveInfo['town'];
    this.getAddress.address = mapReceiveInfo['address'];
    if(mapReceiveInfo['latitude'])this.getAddress.latitude = mapReceiveInfo['latitude'];
    if(mapReceiveInfo['longitude'])this.getAddress.longitude = mapReceiveInfo['longitude'];

  }

  //表单提交
  submitForm(address) {
    this.getAddress.address = this.getAddress.address.split(' ')[0] + ' ' + address;
    //判断是否设为默认
    var isActive = document.getElementById("mySwitch").classList.contains("mui-active");
    if(isActive){
      this.getAddress.def=1;//默认状态
    }else{
      this.getAddress.def=0;
    }
    if(this.ValidateMessage.validateMobile(this.getAddress.phone)==1){
      if(this.ValidateMessage.validateName(this.getAddress.name)==1){
        if(this.getAddress.company){
          if(this.getAddress.city){
            if(this.getAddress.address){
              //修改收/发货地址
              this.submitlag=true;
              this.service.putAddress(this.getAddress).subscribe(
                      data => {
                        this.submitlag=false;
                    if(data.code==0){//成功
                      mui.toast("修改地址成功",{ duration:'short', type:'div' });
                      //管理收货信息
                      this.router.navigateByUrl("personalCenter/ManageReceive?type="+this.getAddress.type);
                    }else{
                      mui.toast(data.msg,{ duration:'short', type:'div' });
                    }
                  }
              );
            }else{
              mui.toast("请填写详细地址",{ duration:'short', type:'div' });
            }
          }else{
            mui.toast("请选择地址",{ duration:'short', type:'div' });
          }
        }else{
          mui.toast("请填写公司名称",{ duration:'short', type:'div' });
        }

      }
    }


  }
map(){
  this.router.navigateByUrl("deliverGoods/Map?address=1");//编辑地址
}
}