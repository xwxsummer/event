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
              console.log(this.getAddress);
              this.getAddress=data.data;
              if(this.getAddress.def==1){//默认收货地址
                document.getElementById("mySwitch").className="mui-switch mui-switch-mini mui-active";
              }
              console.log(this.getAddress);
              console.log(data);
            }
          }
      );
    }else{
      this.getAddress=this.localStorage.getObject("getAddress");
      this.getAddress.name=this.localStorage.getObject("addEmpoly").name;
      this.getAddress.phone=this.localStorage.getObject("addEmpoly").phone;
      this.getAddress.handlerId=this.localStorage.getObject("addEmpoly").staffId;
      console.log(this.getAddress);
    }

  }
  //添加联系人
  WatchContact(){
    //判断是否设为默认
    var isActive = document.getElementById("mySwitch").classList.contains("mui-active");
    console.log(isActive);
    if(isActive){
      this.getAddress.def=1;//默认状态
    }else{
      this.getAddress.def=0;
    }
    this.localStorage.setObject("getAddress",this.getAddress) ;
    console.log(this.getAddress);
    this.router.navigateByUrl("personalCenter/WatchContact?info=1");//info=1编辑

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
    //修改收/发货地址
    this.service.putAddress(this.getAddress);

   //管理收货信息
    //this.router.navigateByUrl("personalCenter/ManageReceive");
  }

}
