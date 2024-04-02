import { Injectable } from '@angular/core';
import { UrlTree, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from "../service/jwt.service";
import { environment } from "../../../environment";
import { User } from "../model/model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  canActivate(route: any, state: any): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem("jwt");
    if (!token || !this.jwtService.isTokenFormatValid(token)) {
      return of(this.router.parseUrl('/login'));
    }

    const position = sessionStorage.getItem('role');  
    if (position === 'admin') {
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    // });

    // return this.http.get<User>(`${environment.baseUrl}/user/getUser`, { headers }).pipe(
    //   map((user: User) => {
    //     if(user.position==null)return this.router.parseUrl('/welcome');
    //     if (user.position.toLowerCase() === 'admin') {
    //       return true;
    //     } else {
    //       return this.router.parseUrl('/welcome');        
    //     }
    //   }),
    //   catchError((error: any) => {
    //     console.error("Error occurred:", error);
    //     return of(this.router.parseUrl('/error'));
    //   })
    // );
  }

  //   userIsAdmin(): Observable<boolean> {
  //   const token = sessionStorage.getItem("jwt");
  //   if (!token || !this.jwtService.isTokenFormatValid(token)) {
  //     return of(false);
  //   }
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
  //   });

  //   return this.http.get<User>(`${environment.baseUrl}/user/getUser`, { headers }).pipe(
  //     map((user: User) => {
  //       if(user.position == null) {
  //         return false;
  //       }
        
  //       return user.position.toLowerCase() === 'admin';
  //     }),
  //     catchError((error: any) => {
  //       console.error("Error occurred:", error);
  //       return of(false); 
  //     })
  //   );
  // }
}




