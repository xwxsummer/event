import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;

@Component({
  selector: 'app-zhuangcheSuccess',
  templateUrl: './zhuangcheSuccess.component.html',
  styleUrls: ['./zhuangcheSuccess.component.css']

})

export class ZhuangcheSuccess implements OnInit{
  market_title="我的货源";
  public type: any =0;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{

  }
  // 装车成功
  DetailsInfo() {
    console.log(this.activatedRoute.snapshot.params['id'])
    
    this.router.navigateByUrl("saoYiSao/DetailsInfo/"+this.activatedRoute.snapshot.params['id'] + "?type=" + this.type);
  }





}
