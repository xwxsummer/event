/**
 * by于婷
 *
 * ******/
import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { personalCenterService } from  '../../personalCenter.service';
@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css'],
  providers:[personalCenterService]
})

export class Blacklist implements OnInit{
  public data;
  public message:string;//显示的信息
  public cengInfo:string;//c层传过来的值 ”1 确定  2取消
  public showTrue:boolean;//层显示？
  public node;//元素
  public type:string;//收发货
  public id:string;//黑名单id
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('黑名单');
    this.message="确认要将该司机移除黑名单？";
    this.showTrue=false;
    this.service.blacklist()//查看黑名单
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            console.log(data);
          }

        });
  }

  //移除黑名单
  remove(id){
    this.id=id;
    this.showTrue=true;//弹出层显示
    this.node=mui(event.target)[0].parentNode;
  }
  //弹出层事件
  cengShow(msg){
    this.showTrue=false;
    this.cengInfo=msg;
    if(this.cengInfo=="1"){
      this.service.removeBlackList(this.id)
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

  //查询司机详情
  Driverdetails(blackId){
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+blackId);
  }

}
