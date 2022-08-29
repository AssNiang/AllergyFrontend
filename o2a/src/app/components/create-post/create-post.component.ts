import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private router: Router) { }

  onSave(send : NgForm){
    /**
     * must save the post content to the db.
     */
    alert(`user n-${this.router.url.split("/")[2]} sent ${send.value.content}`); // just for test
    send.reset();
  }

  ngOnInit(): void {
  }

}
