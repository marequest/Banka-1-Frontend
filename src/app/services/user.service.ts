import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  getUser(jwt: string | null): Observable<{name: string, lastName: string}> {
    let url = `${this.apiUrl}/user/getUser`;

    //ToDo: Da li treba autorizacija
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    // });

    //ToDo: Da li treba metod PUT da bude, posto postoji body
    return this.httpClient.put<{name: string, lastName: string}>(url, jwt, {});
  }
}
