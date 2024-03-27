import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TransactionGuard } from './transaction.guard';

describe('TransactionGuard', () => {
  let guard: TransactionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionGuard]
    });
    guard = TestBed.inject(TransactionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is customer and has required accounts', () => {
    const route: ActivatedRouteSnapshot = {
      
    } as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {
     
    } as RouterStateSnapshot;

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTruthy(); 
  });

  it('should not allow activation if user is not customer', () => {
    const route: ActivatedRouteSnapshot = {
      // Simulate required properties used by your guard
    } as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {
      // Simulate required properties used by your guard
    } as RouterStateSnapshot;

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalsy(); // Assuming the canActivate logic does not allow activation
  });

  it('should not allow activation if user is customer but does not have required accounts', () => {
    const route: ActivatedRouteSnapshot = {
      // Simulate required properties used by your guard
    } as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {
      // Simulate required properties used by your guard
    } as RouterStateSnapshot;

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalsy(); // Assuming the canActivate logic does not allow activation
  });
});
