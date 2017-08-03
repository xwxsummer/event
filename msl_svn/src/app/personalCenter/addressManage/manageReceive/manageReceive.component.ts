import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';
import { Title }from '@angular/platform-browser';
declare var mui: any;

@Component({
  selector: 'app-manageReceive',
  templateUrl: './manageReceive.component.html',
  styleUrls: ['./manageReceive.component.css']

})

export class ManageReceive implements OnInit{
  public data;
  public isReceive:string;//收货人或者发货人
  public message:string;//显示的信息
  public cengInfo:string;//c层传过来的值 ”1 确定  2取消
  public showTrue:boolean;//层显示？
  public node;//元素
  public type:string;//收发货
  public from:string;//跳转过来的页面URL
  public id:string;//删除收/发货地址id


  constructor(
    public router: Router,
    public titleService: Title,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.message="确定要删除该地址？";

    this.showTrue=false;
    this.type=this.routeInfo.snapshot.queryParams["type"];//收发货
    this.from=decodeURIComponent(this.routeInfo.snapshot.queryParams["from"] || sessionStorage['from'] || '');//跳转过来的页面URL
    sessionStorage['from'] = this.from;
    //查询收/发货地址
    if(this.type=="1"){//发货
      this.isReceive="发";
      this.titleService.setTitle('发货地址管理');
      delete sessionStorage['sendAddress'];
    }else{
      this.isReceive="收";
      this.titleService.setTitle('收货地址管理');
      delete sessionStorage['receiveAddress'];
    }
    this.service.addressFindList(this.type)
      .subscribe(
        data => {
        if(data.code==0){//成功
          this.data=data.data;
          console.log(data);
        }else{
          mui.toast(data.msg,{ duration:'short', type:'div' });
        }
      }
    );

  }
  // 删除收/发货地址
  deleteAddress(id){
    this.id=id+"";
    this.showTrue=true;//弹出层显示
    this.node=mui(event.target)[0].parentNode.parentNode.parentNode;
  }
   //弹出层事件
   cengShow(msg){
    this.showTrue=false;
    this.cengInfo=msg;
    if(this.cengInfo=="1"){
      this.service.deleteAddress(this.id)
      .subscribe(
        data => {
        if(data.code==0){//成功
          this.node.remove();
          mui.toast("删除成功",{ duration:'short', type:'div' });
        }else{
            mui.toast(data.msg,{ duration:'short', type:'div' });
        }
      });
    }
  }
 //编辑地址
  EditReceive(index,id){
    id=id+"";
    sessionStorage['mapReceiveInfo'] = JSON.stringify(this.data[index]);
    this.router.navigateByUrl("personalCenter/EditReceive?id="+id+"&edit=1");
    console.log(this.data[index],id);
  }

 //添加地址
  addAddress(){
    this.router.navigateByUrl("personalCenter/AddAddress?type="+this.type);

  }

  //设置默认收/发货地址
  checkTrue(id){
    id=id+"";
    this.service.addressSetDefault(id,this.type);
  }

  setAddress(index:number){
    if(this.isReceive==="发"){
      sessionStorage['sendAddress'] = JSON.stringify(this.data[index]);
    }else{
      sessionStorage['receiveAddress'] = JSON.stringify(this.data[index]);
    }
    if(this.from){
      this.router.navigateByUrl(this.from);
      delete sessionStorage['from']
    }
  }
  goBack(){
    if(sessionStorage['from']){
      this.router.navigateByUrl(sessionStorage['from']);
      delete sessionStorage['from']
    }else {
      window.history.go(-1);
    }
    //this.router.navigateByUrl("personalCenter/AddressManage");
  }
  home(){
    sessionStorage.removeItem('deliverGoodsInfo');
    this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
  }

}
