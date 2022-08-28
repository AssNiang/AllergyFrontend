import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = "../../../assets/images/register-icon2.jpg"
  public showPassword: boolean = false;
  // userInfos = {};

  constructor(private router : Router) { }

  submit(register: NgForm){
    // console.log("Submitted", register.value)
    // this.userInfos = register.value;
    register.reset();

    /*
      - add verifications before switching (validators)
      - save infos in the db
    */
    this.router.navigate(['login']);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  ngOnInit(): void {
  }

}
