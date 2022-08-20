import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = "../../../assets/images/register-icon2.jpg"
  public showPassword: boolean = false;
  // userInfos = {};


  submit(register: NgForm){
    // console.log("Submitted", register.value)
    // this.userInfos = register.value;
    register.reset();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
