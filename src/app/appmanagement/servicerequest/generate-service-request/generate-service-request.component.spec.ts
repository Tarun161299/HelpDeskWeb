import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateServiceRequestComponent } from './generate-service-request.component';

describe('GenerateServiceRequestComponent', () => {
  let component: GenerateServiceRequestComponent;
  let fixture: ComponentFixture<GenerateServiceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateServiceRequestComponent]
    });
    fixture = TestBed.createComponent(GenerateServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
