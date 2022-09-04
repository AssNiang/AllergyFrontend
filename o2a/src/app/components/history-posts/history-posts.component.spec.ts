import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPostsComponent } from './history-posts.component';

describe('HistoryPostsComponent', () => {
  let component: HistoryPostsComponent;
  let fixture: ComponentFixture<HistoryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPostsComponent ]
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
