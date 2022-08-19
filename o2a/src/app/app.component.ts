import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'o2a';
  tu! : String;

  getUserType(tu: String){
    this.tu = tu;
  }
}
