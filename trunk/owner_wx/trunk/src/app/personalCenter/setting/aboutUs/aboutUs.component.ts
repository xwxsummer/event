import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']

})

export class AboutUs implements OnInit{
  constructor(
    public router: Router,
    public titleService: Title
  ){

  }
  ngOnInit(): void {
    this.titleService.setTitle('关于我们');
  }

}
