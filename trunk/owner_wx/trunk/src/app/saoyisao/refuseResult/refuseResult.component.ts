import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { saoyisaoService } from '../saoyisao.service';

@Component({
  selector: 'app-refuseResult',
  templateUrl: './refuseResult.component.html',
  styleUrls: ['./refuseResult.component.css']

})

export class RefuseResult implements OnInit{
  public data: any;
  public refuse: string;
  public imgListNew = [] ;
  constructor(
    public router: Router,
    public service: saoyisaoService,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{
     this.service.getCancelReasonByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data=>{
            if(data.code==0){//成功
               for(let i=0;i<data.data.imageList.length;i++){
                 console.log(data.data.domain+data.data.imageList[i])
                 this.imgListNew.push(data.data.domain+data.data.imageList[i]);
                 this.refuse= data.data.remark;       
              }
            }
            else{
              mui.alert(data.msg)
             }})  
   }
}
