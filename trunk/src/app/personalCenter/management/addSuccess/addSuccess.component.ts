import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-AddSuccess',
  templateUrl: './addSuccess.component.html',
  styleUrls: ['./addSuccess.component.css']

})

export class AddSuccess {
  constructor(
    public router: Router
  ){

  }
  //跳到员工管理
  Management(){
    this.router.navigateByUrl("personalCenter/Management");

  }
  //跳到添加员工
  addEmploye(){
    this.router.navigateByUrl("personalCenter/AddEmployees");

  }


}
