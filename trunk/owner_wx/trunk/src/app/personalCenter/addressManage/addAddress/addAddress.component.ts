import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
//本地缓存
import { LocalStorage } from '../../../local_storage';
//地址查询
declare var mui: any;
import { getAddress } from  '../getAddress';

@Component({
  selector: 'app-addAddress',
  templateUrl: './addAddress.component.html',
  styleUrls: ['../editReceive/editReceive.component.css']

})

export class AddAddress implements OnInit{
  public getAddress:getAddress;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public service : personalCenterService
  ){
    this.getAddress = new getAddress();
  }
  ngOnInit(): void{
    this.getAddress.province="请选择地址";
    this.getAddress.def=0;//默认状态
    mui('.mui-switch')['switch']();
    if(this.routeInfo.snapshot.queryParams["type"]==5){
      this.getAddress=this.localStorage.getObject("getAddress");
      this.getAddress=this.localStorage.getObject("getAddress");
      this.getAddress.name=this.localStorage.getObject("addEmpoly").name;
      this.getAddress.phone=this.localStorage.getObject("addEmpoly").phone;
      this.getAddress.handlerId=this.localStorage.getObject("addEmpoly").staffId;
      }
    else if(this.routeInfo.snapshot.queryParams["type"]==6){
      this.getAddress=this.localStorage.getObject("getAddress");
      this.showMapReceiveInfo();
    }else if(this.routeInfo.snapshot.queryParams["type"]==7){//联系人没有认证
      this.getAddress=this.localStorage.getObject("getAddress");
      mui.alert("该用户尚未认证，通过认证后才可添加，建议用户关注马上来公众号进行认证后再次添加。","",["知道了"]);
     }
    else{
      this.localStorage.set("type",this.routeInfo.snapshot.queryParams["type"]);//收发货

    }

  }
  showMapReceiveInfo(){
    //如果有从地图选择的数据显示地图数据
    let mapReceiveInfo = JSON.parse(sessionStorage['mapReceiveInfo'] || '{}');
    this.getAddress.province = mapReceiveInfo['province'] || '';
    this.getAddress.city = mapReceiveInfo['city'] || '';
    this.getAddress.county = mapReceiveInfo['county'] || '';
    this.getAddress.town = mapReceiveInfo['town'] || '';
    this.getAddress.address = mapReceiveInfo['address'];
    if(mapReceiveInfo['latitude'])this.getAddress.latitude = mapReceiveInfo['latitude'];
    if(mapReceiveInfo['longitude'])this.getAddress.longitude = mapReceiveInfo['longitude'];
    console.log(this.getAddress);
    // debugger
  }
    //选择地址
  selectAddress(){
    this.localStorage.setObject("getAddress",this.getAddress);
    this.router.navigateByUrl("deliverGoods/Map?address=2");

  }
  //添加联系人
  WatchContact(){
    this.localStorage.setObject("getAddress",this.getAddress);
    this.router.navigateByUrl("personalCenter/WatchContact?info=2");// info=2添加

  }
  //表单提交
  submitForm() {
    //判断是否设为默认
    var isActive = document.getElementById("mySwitch").classList.contains("mui-active");
    console.log(isActive);
    if(isActive){
      this.getAddress.def=1;//默认状态
    }else{
      this.getAddress.def=0;
    }
    this.getAddress.type=this.localStorage.getObject("type");//收发货
    if(this.getAddress.address.length==0){
      mui.toast("请填写详细地址",{ duration:'short', type:'div' });

    }else{
      //添加收/发货地址
      this.service.addAddress(this.getAddress);
      //管理收货信息
      this.router.navigateByUrl("personalCenter/ManageReceive?type="+this.localStorage.getObject("type"));

    }
    }

}
