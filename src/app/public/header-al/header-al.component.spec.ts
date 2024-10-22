import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlComponent } from './header-al.component';

describe('HeaderAlComponent', () => {
  let component: HeaderAlComponent;
  let fixture: ComponentFixture<HeaderAlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAlComponent]
    });
    fixture = TestBed.createComponent(HeaderAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
