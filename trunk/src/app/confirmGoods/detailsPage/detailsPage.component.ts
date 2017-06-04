import { Component,OnInit } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
declare var mui: any;

@Component({
  selector: 'app-detailsPage',
  templateUrl: './detailsPage.component.html',
  styleUrls: ['./detailsPage.component.css']

})

export class DetailsPage implements OnInit{

  constructor(
    public router: Router
  ){ }

ngOnInit() {
    
}



}
