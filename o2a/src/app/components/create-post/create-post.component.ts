import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  profile : String = "../../../assets/images/blank-profile-picture.webp";
  user_id!: string;
  user!: User;

  constructor(private router: Router, private _userService:UserService) { }

  onSave(send : NgForm){
    /**
     * must save the post content to the db.
     */
    alert(`user n-${this.router.url.split("/")[2]} sent ${send.value.content}`); // just for test
    send.reset();
  }

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    //console.log(this.user_id);

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
      //console.log(this.user.email);
    });
  }

}
