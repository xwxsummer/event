import { BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule,JsonpModule ,Http} from '@angular/http';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { AppRoutes} from './app.routes';
import { AppComponent } from './app.component';
import { Register } from './register/register.component';

//本地缓存
import { LocalStorage } from './local_storage';

@NgModule({
  declarations: [
    AppComponent,Register
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes)

  ],
  providers: [LocalStorage,
    {provide: LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
