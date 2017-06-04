import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;
@Component({
  selector: 'app-passCertifi',
  template : `

  修改头像
  `,
  styles: ['.completed { background: lightblue; }']
})

export class ChangeheadImg implements OnInit{
  constructor(
    public router: Router
  ){

  }
  ngOnInit(): void{

    //let node=mui(event.target)[0].parentNode;
    //console.log(node);
    //




  }

  //跳过认证
  passCertification() {
    this.router.navigateByUrl("market");

  }
  //跳过认证
  //hehe() {
  //  let node=mui(event.target)[0].parentNode;
  //  console.log(node);
  //}

}

