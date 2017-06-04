import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-evaluationDetails',
  templateUrl: './evaluationDetails.component.html',
  styleUrls: ['./evaluationDetails.component.css']

})

export class EvaluationDetails implements OnInit{
    public arr = JSON.parse(sessionStorage.getItem("1"));
    public speak = sessionStorage.getItem("2").replace(/"/g, " ")
    public times = sessionStorage.getItem("3")
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ){
  }
  ngOnInit(): void{
  }
 
}
