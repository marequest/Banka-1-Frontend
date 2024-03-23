import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private httpClient: HttpClient) { }

  getUsersBankAccountsMocked(userId: number): Observable<BankAccount[]> {
    return this.httpClient.get<BankAccount[]>('/assets/bank-accs-mocked.json');
  }

  getUsersBankAccounts(userId: number): Observable<BankAccount[]> {
    return this.httpClient.get<BankAccount[]>('/assets/bank-accs-mocked.json'); //TODO change this with actual api
  }
}
