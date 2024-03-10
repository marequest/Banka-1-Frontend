import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) { }

  getUser(jwt: string | null): Observable<{ime: string, prezime: string}> {
    let url = `${this.apiUrl}/path/to/users`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });


    return this.httpClient.put<{ime: string, prezime: string}>(url, jwt, {headers});
  }
}
