import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../model/model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private httpClient: HttpClient) { }

  getUsersBankAccountsMocked(userId: number): Observable<BankAccount[]> {
    return this.httpClient.get<BankAccount[]>('/assets/bank-accs-mocked.json');
  }

  getUsersBankAccounts(userId: number): Observable<BankAccount[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/account/getCustomer/${userId}`;

    return this.httpClient.get<BankAccount[]>(url, options);
  }
}
