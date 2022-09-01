import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon2.jpg';
  public showPassword: boolean = false;
  // userInfos = {};
  //id = 0;

  constructor(private router: Router, private _userService: UserService) {}

  submit(login: NgForm) {
    try {
      this._userService.signInUser(login.value).subscribe((data) => {

        // this._userService.getUserById(data.id).subscribe(
        //   data => {console.log(data);}
        // );

        console.log(data.id);

        login.reset();

        /*
          - add verifications before switching (user found)
          - get the userId, pass it through the url
          - get the user type to initialize `LeftSideBarComponent.typeUser`
        */
        LeftSideBarComponent.typeUser = 'admin'; // just for test purposes
        this.router.navigate(['connected-user', data.id]);

      });
    } catch (error) {
      console.log(error);
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
}
