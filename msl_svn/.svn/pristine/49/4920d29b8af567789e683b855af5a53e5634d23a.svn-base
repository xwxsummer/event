import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { saoyisaoService } from '../saoyisao.service';
declare var mui: any;

@Component({
  selector: 'app-refuseResult',
  templateUrl: './refuseResult.component.html',
  styleUrls: ['./refuseResult.component.css']

})

export class RefuseResult implements OnInit{
  public data: any;
  public imgListNew = [] ;
  constructor(
    public router: Router,
    public service: saoyisaoService,
    public titleService: Title,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('拒绝原因');
    this.service.getCancelReasonByChildNo(this.activatedRoute.snapshot.params['id'])
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
      //window.history.go(-1);
      this.router.navigateByUrl("saoYiSao/DetalisInfo/"+this.activatedRoute.snapshot.params['id']);
    }
    //返回主页
    goHome(){
       this.router.navigateByUrl("market/MarketInfo?info=marketInfo");
    }
}
