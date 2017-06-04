import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { confirmGoodsService } from '../confirmGoods.service';
declare var mui: any;
import {imgCompress} from "../../deliverGoods/Remarks/imgCompress";
import { FormsModule } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-exceptionHanding',
  templateUrl: './exceptionHanding.component.html',
  styleUrls: ['./exceptionHanding.component.css']

})

export class ExceptionHanding implements OnInit{
  public data;
  imgList = [];
  constructor(
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public service: confirmGoodsService
  ){

  }
  ngOnInit(): void{
      let imgList = this.imgList;
      $('input').change(function(event){
          imgCompress(event.target.files[0]).then(data=>imgList.push(data));
      })

      console.log(this.activatedRoute.snapshot.params['id'])

   this.service.getOrderDetailsByChildNo(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            data => {
          if(data.code==0){//成功
            this.data=data.data;
          }
        }
    );
  }
  
  ReceivedSuccess() {
    this.router.navigateByUrl("confirmGoods/ExceptionSuccess");
  }


}
