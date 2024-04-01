import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount, Transaction, Exchange } from '../model/model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private httpClient: HttpClient) { }

  // Get all bank accounts MOCKED
  getUsersBankAccountsMocked(userId: number): Observable<BankAccount[]> {
    return this.httpClient.get<BankAccount[]>('/assets/mocked_banking_data/bank-accs-mocked.json');
  }

  // Get all bank accounts REAL_DATA
  getUsersBankAccounts(userId: number): Observable<BankAccount[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/account/getCustomer/${userId}`;

    return this.httpClient.get<BankAccount[]>(url, options); 
  }

  //Get all transactions for bank account MOCKED
  getTransactionsForAccountMocked(accountNumber: string): Observable<Transaction[]> {
    const url = `/assets/mocked_banking_data/mocked_transactions/transactions${accountNumber}.json`;
    return this.httpClient.get<Transaction[]>(url);
  }

  //Get all transactions for bank account REAL_DATA
  getTransactionsForAccount(accountNumber: string): Observable<Transaction[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/transactions/getAll/${accountNumber}`;

    return this.httpClient.get<Transaction[]>(url, options); 
  }

  //Get all transactions for bank account MOCKED
  getExchangesForAccountMocked(accountNumber: string): Observable<Exchange[]> {
    const url = `/assets/mocked_banking_data/mocked_exchanges/exchanges${accountNumber}.json`;
    return this.httpClient.get<Exchange[]>(url);
  }

  //Get all transactions for bank account REAL_DATA
  getExchangesForAccount(accountNumber: string): Observable<Exchange[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/exchanges/getAll/${accountNumber}`;

    return this.httpClient.get<Exchange[]>(url, options); 
  }
}
