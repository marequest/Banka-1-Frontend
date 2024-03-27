import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const position = sessionStorage.getItem('userPosition');

    // If 'position' is equal to 'customer', allow access to the route
    if (position === 'customer') {
      return true;
    } else {
      //this.router.navigate(['/login']);
      return false;
    }
  }
}
