import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['']

})

export class AppComponent {
  ngOnInit(): void {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    });
}

}


//export class AppComponent  {
//  //name: string;
//  name="123";
//  constructor(public title: Title) { }
//  myClick() {
//
//    this.title.setTitle(this.name);
//    console.log(this. name);
//
//  }
//
//}
