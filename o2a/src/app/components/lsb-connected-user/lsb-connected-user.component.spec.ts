import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsbConnectedUserComponent } from './lsb-connected-user.component';

describe('LsbConnectedUserComponent', () => {
  let component: LsbConnectedUserComponent;
  let fixture: ComponentFixture<LsbConnectedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsbConnectedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsbConnectedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
