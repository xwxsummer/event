import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
import { saoyisaoService } from '../saoyisao.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zhuangCheInfo',
  templateUrl: './zhuangCheInfo.component.html',
  styleUrls: ['./zhuangCheInfo.component.css']

})

export class ZhuangCheInfo implements OnInit{
  public values:number;
  public values2:number;
  public price: number;
  public info:any;
  public data;
  public myForms: string[];
  public errorMessage: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service : saoyisaoService
  ){ }
  ngOnInit(){
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
  //获取皮重
   onKey1(values){
    console.log(values)
  }
  //获取毛重
  onKey2(values2){
    let jingzhong = values2-this.values;
    this.price = jingzhong*this.data.freightPrice;
  }
//装车成功
  ZhuangcheSuccess(myForm) {
   
    if(!myForm) {return;}
    this.service.updateConfirmLoadByChildNo(myForm).subscribe()
     console.log(this.data.childNo+"装车成功")
    this.router.navigateByUrl("saoYiSao/ZhuangcheSuccess/"+this.data.childNo); 
  }
}
