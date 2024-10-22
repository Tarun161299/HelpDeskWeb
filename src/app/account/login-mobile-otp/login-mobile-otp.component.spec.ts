import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMobileOTPComponent } from './login-mobile-otp.component';

describe('LoginMobileOTPComponent', () => {
  let component: LoginMobileOTPComponent;
  let fixture: ComponentFixture<LoginMobileOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMobileOTPComponent]
    });
    fixture = TestBed.createComponent(LoginMobileOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
