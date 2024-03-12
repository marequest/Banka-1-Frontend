import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';
import {adminGuard} from "./admin.guard";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

describe('adminGuard', () => {
  let httpMock: HttpClient;
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    httpMock = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });

  it('should return false if no JWT token is found in localStorage', async () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = await TestBed.runInInjectionContext(() => adminGuard(route, state));
    expect(result).toBeFalsy();
  });

  it('should return false on successful API call with non-admin response', async () => {
    spyOn(httpMock, 'get').and.returnValue(of({
      "isAdmin": false
    }));
    spyOn(localStorage, 'getItem').and.returnValue("token");
    const result = await TestBed.runInInjectionContext(() => adminGuard(route, state));
    expect(result).toBeFalsy();
  });

  it('should return true on successful API call with admin response', async () => {
    spyOn(httpMock, 'get').and.returnValue(of({
      "isAdmin": true
    }));
    spyOn(localStorage, 'getItem').and.returnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    const result = await TestBed.runInInjectionContext(() => adminGuard(route, state));
    expect(result).toBeTruthy();
  });

});
