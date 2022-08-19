import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsbConnectedSpecialistComponent } from './lsb-connected-specialist.component';

describe('LsbConnectedSpecialistComponent', () => {
  let component: LsbConnectedSpecialistComponent;
  let fixture: ComponentFixture<LsbConnectedSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsbConnectedSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsbConnectedSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
