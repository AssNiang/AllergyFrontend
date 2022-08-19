import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LIST_USERS } from 'src/app/testingUsers';
import { User } from 'src/app/UserType';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = "../../../assets/images/register-icon2.jpg"
  public showPassword: boolean = false;
  // ===userInfos = {};
      // private aUser! : User;
      // private is_valid : Boolean = false;


  submit(register: NgForm){
    // console.log("Submitted", register.value)
    // this.userInfos = register.value;
        // for(this.aUser of LIST_USERS){
        //   this.is_valid = this.aUser.firstname == register.value.firstname &&
        //                   this.aUser.lastname == register.value.lastname;
        //   if(this.is_valid){
        //     alert("VALID !");
        //   }else {
        //     alert('NOT VALID !');
        //   }
        // }
    register.reset();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
