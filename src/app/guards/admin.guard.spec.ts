import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {AdminGuard} from "./admin.guard";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { environment } from '../../../environment';

describe('adminGuard', () => {
  let httpMock: HttpTestingController;
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AdminGuard] 
    });

    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    const adminGuard = TestBed.inject(AdminGuard); 
    expect(adminGuard).toBeTruthy();
  });

  it('should return false if no JWT token is found in sessionStorage', async () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const adminGuard = TestBed.inject(AdminGuard); 
    const result = await adminGuard.canActivate(route, state).toPromise(); 
    expect(result).toBeFalse();
  });

  it('should return false on successful API call with non-admin response', async () => {
    const adminGuard = TestBed.inject(AdminGuard); 

    const req = httpMock.expectOne(`${environment.baseUrl}/user/getUser`); 
    expect(req.request.method).toBe('GET'); 

    req.flush({ isAdmin: false }); 
    const result = await adminGuard.canActivate(route, state).toPromise(); 
    expect(result).toBeFalse();
  });

  it('should return true on successful API call with admin response', async () => {
    const adminGuard = TestBed.inject(AdminGuard); 

    const req = httpMock.expectOne(`${environment.baseUrl}/user/getUser`); 
    expect(req.request.method).toBe('GET'); 

    req.flush({ isAdmin: true }); 

    const result = await adminGuard.canActivate(route, state).toPromise();
    expect(result).toBeTrue();
  });

});
