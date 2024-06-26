import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount, Exchange, Recipient, Payment, NewLimitDto } from '../model/model';
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

  //Get all payments for bank account MOCKED
  getPaymentsForAccountMocked(accountNumber: string): Observable<Payment[]> {
    const url = `/assets/mocked_banking_data/mocked_transactions/transactions${accountNumber}.json`;
    return this.httpClient.get<Payment[]>(url);
  }

  //Get all payments for bank account REAL_DATA
  getPaymentsForAccount(accountNumber: string): Observable<Payment[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    const options = { headers: headers };
    let url = environment.baseUrl + `/payment/getAll/${accountNumber}`;

    console.log("getPaymentsForAccount log:");
    console.log(sessionStorage.getItem('jwt'))
    console.log(options);
    console.log(url);

    return this.httpClient.get<Payment[]>(url, options); 
  }

  //Get all exchanges for bank account MOCKED
  getExchangesForAccountMocked(accountNumber: string): Observable<Exchange[]> {
    const url = `/assets/mocked_banking_data/mocked_exchanges/exchanges${accountNumber}.json`;
    return this.httpClient.get<Exchange[]>(url);
  }

  //Get all exchanges for bank account REAL_DATA
  getExchangesForAccount(accountNumber: string): Observable<Exchange[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/transfer/getAll/${accountNumber}`;

    return this.httpClient.get<Exchange[]>(url, options); 
  }

  //Get all recipients for user MOCKED
  getAllRecipientsMocked(): Observable<Recipient[]> {
    const url = `/assets/mocked_banking_data/recipients-mocked.json`;
    return this.httpClient.get<Recipient[]>(url);
  }

  getAllRecipients(): Observable<Recipient[]> {
    

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.httpClient.get<Recipient[]>(environment.baseUrl + '/recipients/getAll',{
      headers: headers
    });

  }

  //Add recipient 
  addRecipient(fistName: string, lastName: string, bankAccountNumber: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.httpClient.post(environment.baseUrl + '/recipients/add', {
      firstName: fistName,
      lastName: lastName,
      bankAccountNumber: bankAccountNumber
    },{
      headers: headers
    });
  }

  editRecipient(recipient: Recipient): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.httpClient.put(environment.baseUrl + '/recipients/edit', recipient,{
      headers: headers
    });
  }

  deleteRecipient(recipient: Recipient): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.httpClient.delete(environment.baseUrl + '/recipients/remove/'+recipient.id,{
      headers: headers
    });
  }



  addNewLimit(newLimitDto : NewLimitDto): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/employee/limits/newLimit`;

    return this.httpClient.put(url, {
      userId: newLimitDto.userId,
      approvalRequired: newLimitDto.approvalRequired,
      limit: newLimitDto.limit
    },{
      headers: headers
    });
  }

  resetLimit(userId: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/employee/limits/reset/${userId}`;

    return this.httpClient.put(url,null,{
      headers: headers
    }
    );
  }

  changeBankeAccountName(newName: string, bankAccountNumber: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    
    console.log(headers);

    const options = { headers: headers };
    let url = environment.baseUrl + `/account`;

    return this.httpClient.put(url, {
      bankAccountNumber: bankAccountNumber,
      newName: newName
    },{
      headers: headers
    });
  }
}
