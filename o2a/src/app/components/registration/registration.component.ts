import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon2.jpg';
  public showPassword: boolean = false;
  // userInfos = {};

  constructor(private router: Router, private _userService: UserService) {}

  submit(register: NgForm) {

    try {
      this._userService.signUpUser(register.value).subscribe((data) => {
        console.log(data);

        register.reset();
        /*
          - add verifications before switching (validators)
          - save infos in the db
        */
        this.router.navigate(['login']);
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
