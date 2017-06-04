import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-receivedSuccess',
  templateUrl: './receivedSuccess.component.html',
  styleUrls: ['./receivedSuccess.component.css']

})

export class ReceivedSuccess implements OnInit{
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void{

  }
 DetailsInfo() {
    console.log(this.activatedRoute.snapshot.params['id'])
   this.router.navigateByUrl("confirmGoods/SuccessGoods");
  }
}
