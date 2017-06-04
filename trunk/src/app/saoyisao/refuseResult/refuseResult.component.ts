import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;

@Component({
  selector: 'app-refuseResult',
  templateUrl: './refuseResult.component.html',
  styleUrls: ['./refuseResult.component.css']

})

export class RefuseResult implements OnInit{
  market_title="我的货源";
  constructor(
    public router: Router
  ){

  }
  ngOnInit(): void{

  }
  //拒绝装车
  //refuseZhuangche() {
  //  this.router.navigateByUrl("saoYiSao/PrepaidFreight");
  //}





}
