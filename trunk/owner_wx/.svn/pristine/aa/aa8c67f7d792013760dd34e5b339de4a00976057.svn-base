import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
//http
import { personalCenterService } from  '../../personalCenter.service';

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
  public id:string;//删除收/发货地址id


  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.message="确定要删除该地址？";
    this.showTrue=false;
    this.type=this.routeInfo.snapshot.queryParams["type"];//收发货
    //查询收/发货地址
    if(this.type=="1"){//发货
      this.isReceive="发";
    }else{
      this.isReceive="收";
    }
    this.service.addressFindList(this.type)
      .subscribe(
        data => {
        if(data.code==0){//成功
          this.data=data.data;
          console.log(data);
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

  back(){
    this.router.navigateByUrl("deliverGoods");
  }


}
