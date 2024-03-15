
import {CanActivateFn, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, Observable, of} from "rxjs";
import {JwtService} from "../jwt.service";
import {environment} from "../../../enviroment";
import {User} from "../model";
import {map} from "rxjs/operators";

export interface IsAdminApiResponse {
  isAdmin: boolean
}


export const adminGuard: (route: any, state: any) => Promise<boolean | Observable<boolean | UrlTree>> = async (route, state) => {
  const http = inject(HttpClient);
  const jwtService = inject(JwtService);
  const token = localStorage.getItem("jwt");
  if(!token || !jwtService.isTokenFormatValid(token)) return false;


  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
  });

  console.log(http.get<User>(`${environment.baseUrl}/user/getUser`, { headers }).pipe(
    map(user => {

      if (user.position.toLowerCase() === 'admin') {
        return true;
     

      } else {
        return false;
      }
    }),
    catchError((error) => {
      console.log(error);
      return of(false);
    })
  ));

  return true;



};

