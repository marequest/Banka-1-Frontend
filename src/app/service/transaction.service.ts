import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from "@angular/common/http";
import { TransactionBasics, User } from '../model/model';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { environmentMarket } from '../../../environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transationBasics: TransactionBasics | undefined;
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



}
