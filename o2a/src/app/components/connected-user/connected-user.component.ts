import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connected-user',
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css']
})
export class ConnectedUserComponent implements OnInit {

  user_id! : String;
  page_url! : String;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.page_url = this.router.url;
    this.user_id = this.page_url.split('/')[2];

  }

}
