import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestdetailsComponent } from './service-requestdetails.component';

describe('ServiceRequestdetailsComponent', () => {
  let component: ServiceRequestdetailsComponent;
  let fixture: ComponentFixture<ServiceRequestdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRequestdetailsComponent]
    });
    fixture = TestBed.createComponent(ServiceRequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
