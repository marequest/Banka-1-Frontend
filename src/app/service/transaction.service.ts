import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from "@angular/common/http";
<<<<<<< HEAD
import {BankAccount, TransactionBasics, TransactionDto, User} from '../model/model';
=======
import { TransactionBasics, TransactionDetails, User } from '../model/model';
>>>>>>> 77ba7c65169e2ff389740e0bec820fa0b0dc4c76
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { environmentMarket } from '../../../environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transationBasics: TransactionBasics | undefined;
  private transactionDetails: TransactionDetails|undefined;
  private user: User|undefined;

  constructor( private http: HttpClient, private router: Router) { }

  private apiUrl = environment.baseUrl;
  // private apiUrl = environmentMarket.baseUrl;



  public setTransactionBasics(transationBasics: TransactionBasics): void {
    this.transationBasics = transationBasics;
    console.log('Transaction basics: ', this.transationBasics);
  }
  public setTranscationUser(transactionUser:User):void{
    this.user=transactionUser;
    console.log("Transaction user: ", this.user)
  }

  public setTransactionDetails(transactionDetails: TransactionDetails): void {
    this.transactionDetails = transactionDetails;
    console.log('Transaction details: ', this.transactionDetails);
  }

  public getTransactionDetails():TransactionDetails|undefined{
    return this.transactionDetails
  }

  public getTransactionBasics(): TransactionBasics | undefined {
    return this.transationBasics;
  }

  public getTransactionUser(): User | undefined {
    console.log(this.user);
    return this.user;
  }

  createTransaction(transactionBasics: TransactionBasics): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/transaction/createTransaction`, transactionBasics, { headers });
  }

<<<<<<< HEAD
  getCardTransactions(cardNum: string | undefined): Observable<TransactionDto[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    const options = {headers: headers};

    let url = environment.baseUrl + `/transaction/getCardTransactions/${cardNum}`;

    return this.http.get<TransactionDto[]>(url, options);
  }
=======
  printTransaction(transactionDetails:TransactionDetails):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/transaction/printTransaction`, transactionDetails, { headers });
  }

  getAccountTransactions(accountNumber: string): Observable<TransactionDetails[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.get<TransactionDetails[]>(`${this.apiUrl}/transaction/getAccountTransactions/${accountNumber}`, { headers });
  }



>>>>>>> 77ba7c65169e2ff389740e0bec820fa0b0dc4c76


}
