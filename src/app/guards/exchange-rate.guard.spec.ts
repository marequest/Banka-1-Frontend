import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ExchangeRateGuard } from './exchange-rate.guard'; 

describe('ExchangeRateGuard', () => {
  let guard: ExchangeRateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeRateGuard]
    });
    guard = TestBed.inject(ExchangeRateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is customer', () => {
    const route: ActivatedRouteSnapshot = {
      // Simulate required properties used by your guard
    } as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {
      // Simulate required properties used by your guard
    } as RouterStateSnapshot;

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTruthy(); // Assuming the canActivate logic allows activation
  });

  // You can add more test cases here based on your guard's logic
});
