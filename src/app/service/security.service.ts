import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Security {
  id: string;
  ticker: string;
  price: string;
  change: string;
  volume: string;
  initial_margin_cost: string;
}

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Security[]> {
    return this.http.get<Security[]>('/assets/securities.json');
  }
}
