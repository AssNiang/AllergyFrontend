import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  static typeUser : String = "unknown";
  public lsbRef = LeftSideBarComponent;

  constructor() {}

  ngOnInit(): void {
  }

}
