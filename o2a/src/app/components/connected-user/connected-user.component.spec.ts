import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConnectedUserComponent } from './connected-user.component';

describe('ConnectedUserComponent', () => {
  let component: ConnectedUserComponent;
  let fixture: ComponentFixture<ConnectedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedUserComponent ],
      imports:  [ HttpClientTestingModule ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
