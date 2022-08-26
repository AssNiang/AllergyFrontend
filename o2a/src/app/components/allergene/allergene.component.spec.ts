import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergeneComponent } from './allergene.component';

describe('AllergeneComponent', () => {
  let component: AllergeneComponent;
  let fixture: ComponentFixture<AllergeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergeneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
