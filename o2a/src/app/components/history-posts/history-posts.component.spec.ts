import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

import { HistoryPostsComponent } from './history-posts.component';

describe('HistoryPostsComponent', () => {
  let component: HistoryPostsComponent;
  let fixture: ComponentFixture<HistoryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPostsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PostService, UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
