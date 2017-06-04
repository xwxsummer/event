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
    this.getAddress.def=0;//默认状态
    mui('.mui-switch')['switch']();
    if(this.routeInfo.snapshot.queryParams["type"]==5){
      this.getAddress.name=this.localStorage.getObject("addEmpoly").name;
      this.getAddress.phone=this.localStorage.getObject("addEmpoly").phone;
      this.getAddress.handlerId=this.localStorage.getObject("addEmpoly").staffId;
      }else{
      this.localStorage.set("type",this.routeInfo.snapshot.queryParams["type"]);//收发货

    }

  }
    //选择地址
  selectAddress(){
    this.router.navigateByUrl("deliverGoods/Map");

  }
  //添加联系人
  WatchContact(){
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

    this.getAddress.latitude="111";//收发货
    this.getAddress.longitude="111";//收发货
    this.getAddress.city="北京";//收发货
    this.getAddress.county="北京";//收发货
    this.getAddress.province="北京";//收发货



    //添加收/发货地址
    this.service.addAddress(this.getAddress);

    //管理收货信息
    this.router.navigateByUrl("personalCenter/ManageReceive?type="+this.localStorage.getObject("type"));
  }

}
