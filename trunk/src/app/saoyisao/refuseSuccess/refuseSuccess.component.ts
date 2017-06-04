import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-refuseSuccess',
  templateUrl: './refuseSuccess.component.html',
  styleUrls: ['./refuseSuccess.component.css']

})

export class RefuseSuccess implements OnInit{
  market_title="我的货源";
  constructor(
    public router: Router
  ){

  }
  ngOnInit(): void{

  }
  //拒绝装车
  DetailsInfo() {
    this.router.navigateByUrl("saoYiSao/DetailsInfo");
  }





}
