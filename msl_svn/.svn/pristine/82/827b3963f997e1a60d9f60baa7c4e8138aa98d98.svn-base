import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var mui: any;


@Component({
  selector: 'app-exceptionSuccess',
  templateUrl: './exceptionSuccess.component.html',
  styleUrls: ['./exceptionSuccess.component.css']

})

export class ExceptionSuccess implements OnInit{
  constructor(
    public router: Router,
    public titleService: Title,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('提交成功');
  }
  DetailsInfos() {
     console.log(this.activatedRoute.snapshot.params['id'])
     this.router.navigateByUrl("confirmGoods/DetailsInfos/"+this.activatedRoute.snapshot.params['id']+"?num=3");
  }
}
