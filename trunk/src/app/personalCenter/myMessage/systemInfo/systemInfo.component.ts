import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-systemInfo',
  templateUrl: './systemInfo.component.html',
  styleUrls: ['./systemInfo.component.css']

})

export class SystemInfo implements OnInit{
  market_title="我的货源";
  constructor(
    public router: Router
  ){

  }
  ngOnInit(): void{

  }





}
