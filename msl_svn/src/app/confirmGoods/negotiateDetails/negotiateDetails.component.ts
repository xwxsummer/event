﻿import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;

@Component({
  selector: 'app-negotiateDetails',
  templateUrl: './negotiateDetails.component.html',
  styleUrls: ['./negotiateDetails.component.css']
})

export class NegotiateDetails implements OnInit{
  public data: any;
  public imgListNew = [] ;
  constructor(
    public router: Router,
    public service: confirmGoodsService,
    public titleService: Title,
    public activatedRoute: ActivatedRoute
  ){
  }
  ngOnInit(): void{
    this.titleService.setTitle('协商详情');
    this.service.exception1(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data=>{
            if(data.code==0){//成功
               this.data=data.data;
               console.log(data.data);
              
               if(data.data.imageList!=null){     
                  for(let i=0;i<data.data.imageList.length;i++){
                     console.log(data.data.domain+data.data.imageList[i])
                     this.imgListNew.push(data.data.domain+data.data.imageList[i]);          
                 }
               }    
            }
            else{
              mui.alert(data.msg)
             }})  
   }
   //返回上一页
    goBack(){
      window.history.go(-1);
     // this.router.navigateByUrl("confirmGoods/DetalisInfos/"+this.activatedRoute.snapshot.params['id']+"?num=3");
    }
    //返回主页
    goHome(){
       this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
}
