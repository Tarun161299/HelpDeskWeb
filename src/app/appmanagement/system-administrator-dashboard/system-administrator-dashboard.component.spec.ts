import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorDashboardComponent } from './system-administrator-dashboard.component';

describe('SystemAdministratorDashboardComponent', () => {
  let component: SystemAdministratorDashboardComponent;
  let fixture: ComponentFixture<SystemAdministratorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemAdministratorDashboardComponent]
    });
    fixture = TestBed.createComponent(SystemAdministratorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
