import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-exceptionSuccess',
  templateUrl: './exceptionSuccess.component.html',
  styleUrls: ['./exceptionSuccess.component.css']

})

export class ExceptionSuccess implements OnInit{
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{

  }
  DetailsInfos() {
     console.log(this.activatedRoute.snapshot.params['id'])
     this.router.navigateByUrl("confirmGoods/DetailsInfos/"+this.activatedRoute.snapshot.params['id']+"?num=3");
  }
}
