import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { saoyisaoService } from '../saoyisao.service';
import { Title } from '@angular/platform-browser';
declare var mui: any;
declare var $: any;

@Component({
  selector: 'app-zhuangcheSuccess',
  templateUrl: './zhuangcheSuccess.component.html',
  styleUrls: ['./zhuangcheSuccess.component.css']

})

export class ZhuangcheSuccess implements OnInit{
  market_title="我的货源";
  public type: any =0;
  public timer=10;
  public data;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public service: saoyisaoService
  ){

  }
  ngOnInit(): void{
     this.titleService.setTitle('装车成功');
     var thisSelf =  this;
     function sevrices(){
       console.log("sevruces");
        console.log(thisSelf.activatedRoute.snapshot.params['id'])
          thisSelf.service.getStatusByChildNo(thisSelf.activatedRoute.snapshot.params['id'])
            .subscribe(
              data => {
                console.log(data.data);
                thisSelf.data = data.data;
                //货主确认装车成功
                if(data.data==51){
                  thisSelf.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+thisSelf.activatedRoute.snapshot.params['id'] );
                    //thisSelf.router.navigateByUrl("saoYiSao/DetailsInfo/"+thisSelf.activatedRoute.snapshot.params['id'] + "?type=0");   
                  }
                //支付中的状态
                if(data.data==231){
                  thisSelf.router.navigateByUrl("goodsReceipt/ReceiptDetails/"+thisSelf.activatedRoute.snapshot.params['id'] );
                  //thisSelf.router.navigateByUrl("saoYiSao/DetailsInfo/"+thisSelf.activatedRoute.snapshot.params['id'] + "?type=0"); 
                    mui.alert("确认装车失败");  
                }
              }
            );
         }
    var myspan=document.getElementById("myspan");
    var content=document.getElementById("content");
    function flag(){
      console.log(thisSelf.timer)
      thisSelf.timer = thisSelf.timer-1;
      switch(thisSelf.timer)
        {
        case 9:
            sevrices();
            break;
        case 6:
            sevrices();
            break;
          case 3:
            sevrices();
            break;
          case 0:
            sevrices();
            if(thisSelf.data==121){
              content.innerHTML="请联系客服处理问题";
            }
            clearInterval(setIn);
            break;
        }
      var nowTimer=thisSelf.timer+"";
      myspan.innerHTML=nowTimer;
      }
    var setIn = setInterval(flag,1000);
  
  }
//   装车成功
//   DetailsInfo() {
//     console.log(this.activatedRoute.snapshot.params['id'])
    
//     this.router.navigateByUrl("saoYiSao/DetailsInfo/"+this.activatedRoute.snapshot.params['id'] + "?type=" + this.type);
//   }
// 
}
