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
          thisSelf.service.getStatusByChildNo(thisSelf.activatedRoute.snapshot.params['id'])
            .subscribe(
              data => {
                // console.log(thisSelf.activatedRoute.snapshot.params['id'])
                // console.log("datadadada")
              if(data.code==0){
                console.log(data.data)
              if(data.data==121){
                thisSelf.router.navigateByUrl("saoYiSao/DetailsInfo/"+thisSelf.activatedRoute.snapshot.params['id'] + "?type=0");   
              }
               }
              else{
                  mui.alert(data.msg)
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
            clearInterval(setIn);
            content.innerHTML="确认装车支付失败";
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
