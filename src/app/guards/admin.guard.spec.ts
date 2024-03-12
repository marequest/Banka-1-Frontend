import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import {adminGuard} from "./admin.guard";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

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
    spyOn(httpMock, 'get').and.returnValue(of(false));
    spyOn(localStorage, 'getItem').and.returnValue("token");
    const result = await TestBed.runInInjectionContext(() => adminGuard(route, state));
    expect(result).toBeFalsy();
  });

  it('should return true on successful API call with admin response', async () => {
    spyOn(httpMock, 'get').and.returnValue(of(true));
    spyOn(localStorage, 'getItem').and.returnValue("token");
    const result = await TestBed.runInInjectionContext(() => adminGuard(route, state));
    expect(result).toBeTruthy();
  });

});
