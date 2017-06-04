import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//地址查询
import { getAddress } from  '../getAddress';
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

  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public localStorage: LocalStorage,
    public service : personalCenterService
  ){
    this.getAddress = new getAddress();
  }
  ngOnInit(): void{
      mui('.mui-switch')['switch']();
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
        //this.getAddress.province=this.routeInfo.snapshot.queryParams["province"];
        //this.getAddress.city=this.routeInfo.snapshot.queryParams["city"];
        //this.getAddress.county=this.routeInfo.snapshot.queryParams["county"];
        //this.getAddress.town=this.routeInfo.snapshot.queryParams["town"];
        //this.getAddress.longitude=this.routeInfo.snapshot.queryParams["longitude"];
        //this.getAddress.latitude=this.routeInfo.snapshot.queryParams["latitude"];
        //this.getAddress.address="";
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
    console.log(this.getAddress);
    // debugger
  }

  //添加联系人
  WatchContact(){
    //判断是否设为默认
    var isActive = document.getElementById("mySwitch").classList.contains("mui-active");
   if(isActive){
      this.getAddress.def=1;//默认状态
    }else{
      this.getAddress.def=0;
    }
    this.localStorage.setObject("getAddress",this.getAddress);
    this.router.navigateByUrl("personalCenter/WatchContact?info=1");//info=1编辑

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
    if(this.getAddress.address.length==0){
      mui.toast("请填写详细地址",{ duration:'short', type:'div' });

    }else{
      //修改收/发货地址
      this.service.putAddress(this.getAddress).subscribe(
          data => {
            if(data.code==0){//成功
              mui.toast("修改地址成功",{ duration:'short', type:'div' });
              //管理收货信息
              this.router.navigateByUrl("personalCenter/ManageReceive?type="+this.getAddress.type);
            }else{
              mui.toast(data.msg,{ duration:'short', type:'div' });
            }
          }
      );
    }

  }
map(){
  this.router.navigateByUrl("deliverGoods/Map?address=1");//编辑地址
}
}