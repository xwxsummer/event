import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css']

})


export class Bank implements OnInit {


    constructor(public router:Router) {

    }

    ngOnInit():void {


    }

}