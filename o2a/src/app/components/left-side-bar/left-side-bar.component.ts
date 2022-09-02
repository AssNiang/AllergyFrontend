import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  static typeUser : String = "unknown";
  lsbRef = LeftSideBarComponent;

  static user_id : String;

  constructor(private router : Router) { }

  ngOnInit(): void { }

}
