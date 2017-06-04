import { RouterModule } from '@angular/router';
import { Certification } from './certification/certification.component';
import { CompanyCertification } from './certification/companyCertification.component';
import { Checking } from './certification/checking.component';

export const RegisterRoutes=[
  {
    path:'',
    component:Certification
  },{
    path:'companyCertification',//公司认证
    component:CompanyCertification
  },{
    path:'checking',//核查
    component:Checking
  }

];
