import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'assets/testLogin.json'; // Set your API endpoint here

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password }).pipe(
      map((response: any) => {
        // Assuming the response contains the JWT token
        return response.token;
      })
    );
    // const url = 'assets/testLogin.json';
    //
    // return this.http.get(url).pipe(
    //   map((response: any) => {
    //     console.log(response);
    //     return response.token;
    //   })
    // );
  }

}
