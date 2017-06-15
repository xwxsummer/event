import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passCertifi',
  template : `<div class="clearfix b-b">
        <div class="pull-left ea5529 height_2 p_l17"  style=""><img src="../assets/images/crown.png" style="width: 20px;vertical-align: middle;margin-bottom: 3px;" alt=""/>身份认证后可获得更多特权</div>
        <div class="pull-right m-r10 ea5529 height_2 p_r17" (click)="passCertification()">跳过认证&nbsp;></div>
    </div>`,
  styles: ['.completed { background: lightblue; }']
})

export class PassCertification {
  constructor(
    public router: Router
  ){

  }
  //跳过认证
  passCertification() {
    this.router.navigateByUrl("market");

  }

}
