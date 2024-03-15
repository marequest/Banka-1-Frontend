import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

import { employeeGuard } from './employee.guard';

describe('employeeGuard', () => {
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(employeeGuard).toBeTruthy();
  });

  it("should return true with provided token", () => {
    spyOn(localStorage, 'getItem').and.returnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    const result = TestBed.runInInjectionContext(() => employeeGuard(route, state));
    expect(result).toBeTruthy();
  });
  it("should return false with invalid token", () => {
    spyOn(localStorage, 'getItem').and.returnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    const result = TestBed.runInInjectionContext(() => employeeGuard(route, state));
    expect(result).toBeFalsy();
  });
  it("should return false without token", () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = TestBed.runInInjectionContext(() => employeeGuard(route, state));
    expect(result).toBeFalsy();
  });
});
