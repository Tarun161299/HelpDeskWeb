import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAlComponent } from './footer-al.component';

describe('FooterAlComponent', () => {
  let component: FooterAlComponent;
  let fixture: ComponentFixture<FooterAlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterAlComponent]
    });
    fixture = TestBed.createComponent(FooterAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
