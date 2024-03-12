import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserSecurity {
  name: string;
  email: string;
  jmbg: string;
  position: string;
  phone: string;
  activity: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { 

  }

  getUsers(): Observable<UserSecurity[]> {
    return this.http.get<UserSecurity[]>("/assets/securities.json");
  }
}
