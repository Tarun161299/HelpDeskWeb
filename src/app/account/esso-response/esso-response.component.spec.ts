import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESSOResponseComponent } from './esso-response.component';

describe('ESSOResponseComponent', () => {
  let component: ESSOResponseComponent;
  let fixture: ComponentFixture<ESSOResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ESSOResponseComponent]
    });
    fixture = TestBed.createComponent(ESSOResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
