/**
 * by于婷
 *
 * ******/
import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
//http
import { personalCenterService } from  '../../../personalCenter.service';
import { blackList } from  '../addBlackList';

@Component({
  selector: 'app-blacklist',
  templateUrl: './driverdetails.component.html',
  styleUrls: ['./driverdetails.component.css']
  // providers:[personalCenterService]
})

export class Driverdetails implements OnInit{
  public blackList:blackList;
  public isBlack:boolean;//黑名单
  public data;
  public starImg=[];//星数
  public haoping:number;//好评率
  public userId:string;
  constructor(
    public router: Router,
    public routeInfo:ActivatedRoute,//页面间传值
    public service : personalCenterService
  ){
    this.blackList=new blackList();
  }
  ngOnInit(): void{
    this.isBlack=true;
    this.userId=this.routeInfo.snapshot.queryParams["id"];//黑名单id
    this.blackList.blackId=this.routeInfo.snapshot.queryParams["id"];//黑名单id
    //查询司机详情
    this.service.carUserInfo(this.userId)
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
            this.blackList.name=this.data.name;
            this.blackList.phone=this.data.phone;
            this.haoping=(this.data.goodTime)/(this.data.evaluateCount);
            if(!this.haoping){
              this.haoping=100;
            }
            for(let i=0;i<this.data.star;i++){
              this.starImg.push("../../../../../assets/images/xing.png");
            }
            console.log(data);
          }
        }
    );
  }
  //移除黑名单
  removeBlackList(){
    console.log("成功移除黑名单");
    this.isBlack=false;
    this.service.removeBlackList(this.userId)
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log("成功移除黑名单");
            }
        }
    );
  }
  //添加黑名单
  addBlackList(){
    this.isBlack=true;
    console.log("成功添加黑名单");
    this.service.addBlackList(this.blackList)
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log("成功添加黑名单");
          }
        }
    );
  }

  See(){
    this.router.navigateByUrl("personalCenter/See");
  }

}
