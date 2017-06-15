import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-certification',
  template : `
    <app-passCertifi></app-passCertifi>
    <div class="pL_10 pR_10">
      <div class="clearfix height_3">
    <img src="../assets/images/line_certification.png" style="width: 40%;" alt=""/><div style="width: 20%;display: inline-block;" class="text_center clo_ccc">选择角色</div><img src="../assets/images/line_certification.png" style="width: 40%;" alt=""/>
    </div>
    <div class="certification_box back_fff text_center fonNav col_333 m_top50" (click)="Certification(1,1)"><img src="../assets/images/personal_shipper.png" class="pR_20 w40 verti_middle" alt=""/>个人货主</div>
      <div class="certification_box back_fff text_center fonNav col_333 m_top35" (click)="Certification(1,2)"><img src="../assets/images/company_shipper.png" class="pR_20 w40 verti_middle" alt=""/>企业货主</div>
      </div>
      <div class="w100 text_center posi_abslotu bot40"><span id="contactService"><span (click)="call()">联系客服</span></span></div>
    `,
  styles: ['.bot40 {bottom:40px;}']

})

export class Certification implements OnInit{
  constructor(
    public router: Router,
    public titleService: Title
  ){

  }
  ngOnInit(): void{
    this.titleService.setTitle('货主认证');


  }
  //认证页面
  Certification(certifi,type ){//certi=1  代表认证界面   info=1 个人认证 info=2 公司认证
    this.router.navigateByUrl("certification/companyCertification?certifi="+certifi+"&type="+type);

  }
  //打电话
  call(){
    window.open('tel:10086');
  }
}
