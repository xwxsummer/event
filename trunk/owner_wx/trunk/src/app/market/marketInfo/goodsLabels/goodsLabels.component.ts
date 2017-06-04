import { Component,Input } from "@angular/core";

@Component({
    selector: 'app-goodsLabels',
    templateUrl: './goodsLabels.component.html',
    styleUrls: ['./goodsLabels.component.css'],
})
export class goodsLabels{
  @Input() labels:any;
    //labelArr =[];
  // public labelArr:string[];
    // public labelArr = [1,2,3];
	constructor(){}

	ngOnInit(){
      //this.labelArr = this.labels.split('|') || [];
        //debugger
      //console.log(this.labelArr);
  }




}
