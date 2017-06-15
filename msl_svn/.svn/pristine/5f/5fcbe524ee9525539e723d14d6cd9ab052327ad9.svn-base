import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var mui: any;
import { personalCenterService } from  '../personalCenter.service';

@Component({
  selector: 'app-myGoods',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers:[personalCenterService]

})

export class Management implements OnInit{
  public data;
  public message:string;//显示的信息
  public cengInfo:string;//c层传过来的值 ”1 确定  2取消
  public showTrue:boolean;//层显示？
  public node;//元素
  public type:string;//收发货
  public staffId:string;//联系人staffId
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
  }
  ngOnInit(): void{
    this.titleService.setTitle('联系人管理');
    this.message="确定要删除该联系人？";
    this.showTrue=false;
    this.service.Management()//获取联系人列表
        .subscribe(
            data => {
              if(data.code==0){//成功
            this.data=data.data;
           for(let i=0; i<this.data.length;i++){
                //this.data[i].phone=this.data[i].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
              if(this.data[i].headImg){
                this.data[i].headImg=this.data[i].domain+this.data[i].headImg;
                }else{
                this.data[i].headImg="../assets/images/myDriver.png";
                }
            }
          }
        }
    );

  }
  //添加联系人
  addEmployees() {
    this.router.navigateByUrl("personalCenter/AddEmployees");

  }
    //打电话
    call(phoneNumber){
        window.open('tel:'+phoneNumber);
    }
  //联系人信息
  employeInfo(name,phone,staffId,headImg,authed) {
    this.router.navigateByUrl("personalCenter/EmployeInfo?name="+name+"&phone="+phone+"&staffId="+staffId+"&headImg="+headImg+"&authed="+authed);

  }
  //删除联系人
  delit(staffId){
      this.staffId=staffId;
      this.showTrue=true;//弹出层显示
      this.node=mui(event.target)[0].parentNode.parentNode;
  }
 //弹出层事件
  cengShow(msg){
    this.showTrue=false;
    this.cengInfo=msg;
    if(this.cengInfo=="1"){
      this.service.deleteOwnerStaff(this.staffId)
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



}
