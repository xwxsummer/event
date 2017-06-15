import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;


@Component({
    selector: 'app-bank',
    templateUrl: './detail.child.html',
    styleUrls: ['./detail.child.css']

})


export class DetailChild implements OnInit {


    constructor(public router:Router) {

    }

    ngOnInit():void {


    }

}
