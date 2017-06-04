import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
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
  public staffId:string;//员工staffId
  constructor(
    public router: Router,
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.message="确定要删除该地址？";
    this.showTrue=false;
    this.service.Management()//获取员工列表
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data);
          }
        }
    );

  }

  //添加员工
  addEmployees() {
    this.router.navigateByUrl("personalCenter/AddEmployees");

  }
  //员工信息
  employeInfo() {
    this.router.navigateByUrl("personalCenter/EmployeInfo");

  }
  //删除员工
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
      console.log(this.staffId);
      this.service.deleteOwnerStaff(this.staffId)
          .subscribe(
              data => {
            if(data.code==0){//成功
              this.node.remove();
              mui.toast("删除成功",{ duration:'short', type:'div' });
            }else{
              mui.toast(data.msg,{ duration:'short', type:'div' });
            }
             console.log(data);
          });
    }
  }



}
