import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userResetPasswordGuard } from './user-reset-password.guard';

describe('userResetPasswordGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userResetPasswordGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
