import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service'; 
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExchangeRateGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt !== null && jwt.length > 0) {
      return this.userService.getUser(jwt).pipe(
        map(response => {
          const isCustomer = response.position.toString().toLowerCase() === "customer";
          if (isCustomer) {
            return true; 
          } else {
            this.router.navigate(['/welcome']); 
            return false; 
          }
        })
      );
    } else {
      this.router.navigate(['/login']); 
      return new Observable<boolean>(observer => {
        observer.next(false); 
        observer.complete();
      });
    }
  }
}