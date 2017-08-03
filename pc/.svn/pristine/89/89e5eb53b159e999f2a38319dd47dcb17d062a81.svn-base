import {QrcodeComponent} from './login/qrcode/qrcode.component';
import {PromptComponent} from './login/prompt/prompt.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "app/login/register/register.component";
export const AppRoutes = [

  {
    path:'',
    redirectTo:"login",
    pathMatch:'full'
  },
  { path:'',//登录
    component:LoginComponent
  },
  { path:'login',//登录
    component:LoginComponent
  },
  { path:'register',//找回秘密
    component:RegisterComponent
  },
  { path:'prompt',//成功找回密码
    component:PromptComponent
  },
  { path:'qrcode',//扫码
    component:QrcodeComponent
  },
   { path:'content',//项目内容
    loadChildren:'./content/content.module#ContentModule'
  }
];
