import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerIcon: string = "../../../assets/images/register-icon2.jpg"
  public showPassword: boolean = false;
  // userInfos = {};
  id = 3;

  constructor(private router : Router) { }

  submit(login: NgForm){
    // console.log("Submitted", login.value)
    // this.userInfos = login.value;
    login.reset();

    /*
      - add verifications before switching (user found)
      - get the userId, pass it through the url
      - get the user type to initialize `LeftSideBarComponent.typeUser`
    */
    LeftSideBarComponent.typeUser = "admin"; // just for test purposes
    this.router.navigate(['connected-user', this.id]);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  ngOnInit(): void {
  }

}
