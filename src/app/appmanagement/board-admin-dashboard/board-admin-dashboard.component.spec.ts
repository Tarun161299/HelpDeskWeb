import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAdminDashboardComponent } from './board-admin-dashboard.component';

describe('BoardAdminDashboardComponent', () => {
  let component: BoardAdminDashboardComponent;
  let fixture: ComponentFixture<BoardAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(BoardAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
