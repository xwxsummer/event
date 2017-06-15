import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-refuseSuccess',
  templateUrl: './refuseSuccess.component.html',
  styleUrls: ['./refuseSuccess.component.css']

})

export class RefuseSuccess implements OnInit{
  market_title="我的货源";
  public type: any = 1;
  constructor(
    public router: Router,
    public titleService: Title,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('拒绝装货');
  }
  //拒绝装车
  DetailsInfo() {
     this.router.navigateByUrl("saoYiSao/DetailsInfo/"+this.activatedRoute.snapshot.params['id'] + "?type=" + this.type);
 
  }





}
