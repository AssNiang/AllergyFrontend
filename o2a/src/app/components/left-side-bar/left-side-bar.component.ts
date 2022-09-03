import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],
})
export class LeftSideBarComponent implements OnInit {
  static typeUser: String = 'unknown';
  lsbRef = LeftSideBarComponent;

  static user_id: String;
  //  temp!: string[];


  constructor(private router: Router, private _userService: UserService) {}

  disconnect() {
    try {
      this._userService.logoutUser().subscribe((data) => {
        console.log(data);
      });
      AppComponent.typeUser = LeftSideBarComponent.typeUser = "unknown";
      this.router.navigate(['']);

    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    // this.temp = this.router.url.split('/');
    // alert(this.temp[1]);
  }
}
