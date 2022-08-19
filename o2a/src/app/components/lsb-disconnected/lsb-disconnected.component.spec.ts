import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsbDisconnectedComponent } from './lsb-disconnected.component';

describe('LsbDisconnectedComponent', () => {
  let component: LsbDisconnectedComponent;
  let fixture: ComponentFixture<LsbDisconnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsbDisconnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsbDisconnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
