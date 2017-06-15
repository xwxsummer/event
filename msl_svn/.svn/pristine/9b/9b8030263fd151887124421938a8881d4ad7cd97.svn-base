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
  public noneIfno:number;//暂无该信息
  constructor(
    public router: Router,
    public titleService: Title,
    public service : personalCenterService
  ){
  }
  ngOnInit(): void{
    this.titleService.setTitle('黑名单');
    this.message="确认要将该司机移除黑名单？";
    this.noneIfno=1;
    this.showTrue=false;
    this.service.blacklist()//查看黑名单
        .subscribe(data=>{
          if(data.code==0){//成功
            this.data=data.data;
            if(this.data.length==0){
              this.noneIfno=2;
            }
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].headImg){
                this.data[i].headImg=this.data[i].domain+this.data[i].headImg;
              }else{
                this.data[i].headImg="../assets/images/myDriver.png";
              }
            }
          }

        });
    //货物单号
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
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
    this.router.navigateByUrl("personalCenter/Driverdetails?id="+blackId+"&type=1");
  }

}
