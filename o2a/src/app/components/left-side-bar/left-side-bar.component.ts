import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  //@Input() typeUtilisateur! : String;
  typeUtilisateur = "disconnected";

  constructor() { }

  ngOnInit(): void {
  }


}
