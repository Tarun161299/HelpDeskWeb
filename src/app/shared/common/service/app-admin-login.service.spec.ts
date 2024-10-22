import { TestBed } from '@angular/core/testing';

import { AppAdminLoginService } from './app-admin-login.service';

describe('AppAdminLoginService', () => {
  let service: AppAdminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAdminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
