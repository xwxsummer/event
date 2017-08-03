import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
Storage.prototype.put = function(key, value) {
this.setItem(key, JSON.stringify(value));
}

Storage.prototype.get= function(key) {
var value = this.getItem(key);
return value && JSON.parse(value);
}
