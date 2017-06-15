import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterRoutes } from './register.routes';
import { Certification } from './certification/certification.component';

import { CompanyCertification } from './certification/companyCertification.component';
import { Checking } from './certification/checking.component';
import { ContactCustomer } from './certification/fragment/contactCustomer';
import { PassCertification } from './certification/fragment/passCertification';

//RegiterService 请求
import { RegiterService } from  './Register.service';
@NgModule({
  imports: [
    RouterModule.forChild(RegisterRoutes),CommonModule,FormsModule
  ],
  exports: [],
  declarations: [
    Certification,CompanyCertification,Checking,ContactCustomer,PassCertification
  ],
  providers: [ RegiterService ]
})
export class RegisterModule { }
