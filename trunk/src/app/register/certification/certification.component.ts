import { Component } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-certification',
  template : `
    <app-passCertifi></app-passCertifi>
    <div class="pL_10 pR_10">
      <div class="clearfix">
    <img src="../assets/images/line_certification.png" style="width: 40%;" alt=""/><div style="width: 20%;display: inline-block;" class="text_center clo_ccc">选择角色</div><img src="../assets/images/line_certification.png" style="width: 40%;" alt=""/>
    </div>
    <div class="certification_box back_fff text_center fonNav col_333 m_top50" (click)="Certification(1,1)"><img src="../assets/images/personal_shipper.png" class="pR_20 w40 verti_middle" alt=""/>个人货主</div>
      <div class="certification_box back_fff text_center fonNav col_333 m_top35" (click)="Certification(1,2)"><img src="../assets/images/company_shipper.png" class="pR_20 w40 verti_middle" alt=""/>企业货主</div>
      </div>
      <div class="w100 text_center posi_abslotu bot40"><span id="contactService"><a href="tel:10086#mp.weixin.qq.com">联系客服</a></span></div>
    `,
  styles: ['.bot40 {bottom:40px;}']

})

export class Certification {
  constructor(
    public router: Router
  ){

  }
  //认证页面
  Certification(certifi,type ){//certi=1  代表认证界面   info=1 个人认证 info=2 公司认证
    this.router.navigateByUrl("certification/companyCertification?certifi="+certifi+"&type="+type);

  }

}