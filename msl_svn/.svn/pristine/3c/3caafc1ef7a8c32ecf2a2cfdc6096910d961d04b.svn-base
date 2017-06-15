import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;

@Component({
  selector: 'app-detailsPage',
  templateUrl: './detailsPage.component.html',
  styleUrls: ['./detailsPage.component.css']

})

export class DetailsPage implements OnInit{
   public data:any;
   constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public service: confirmGoodsService
  ){ }

ngOnInit() {
     console.log(this.activatedRoute.snapshot.params['id'])
     this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            console.log(data)
            this.data=data.data;
          }
        }
    );
  }
}
