import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LIST_USERS } from 'src/app/testingUsers';
import { User } from 'src/app/UserType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerIcon: string = "../../../assets/images/register-icon2.jpg"
  public showPassword: boolean = false;
  // userInfos = {};

  private listUsers : User[] = LIST_USERS;
  private theUser! : User;
  private is_valid: Boolean = false;
  @Output() typeUtilisateur = new EventEmitter<String>();
  //public static typeUtilisateur : String = "disconnected";

  submit(login: NgForm){
    // console.log("Submitted", login.value)
    // this.userInfos = login.value;

    this.listUsers.forEach(element => {
      this.is_valid = element.username == login.value.username && element.password == login.value.password;
      if(this.is_valid){
        this.theUser = element;
        this.typeUtilisateur.emit(element.type);
      }
    });

    login.reset();

    //LoginComponent.typeUtilisateur = this.theUser.type;
    //alert("Hello "+this.theUser.firstname);
  }

  //public getTypeUtilisateur() : String { return this.theUser.type ;}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor() { }

  ngOnInit(): void {
  }


}
