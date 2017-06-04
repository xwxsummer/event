import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passCertifi',
  template : `<div class="clearfix">
        <div class="pull-left ea5529 m-l10"  style="height: 2.8rem;line-height: 2.8rem;"><img src="../assets/images/crown.png" style="width: 20px;vertical-align: middle;" alt=""/>身份认证后可获得更多特权</div>
        <div class="pull-right m-r10 ea5529" (click)="passCertification()" style="height: 2.8rem;line-height: 2.8rem;">跳过认证&nbsp;></div>
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
