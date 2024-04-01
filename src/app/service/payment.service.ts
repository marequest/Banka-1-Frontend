import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { CreatePaymentRequest } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private apiUrl = environment.baseUrl+"/payment"; // Set your API endpoint here
  
  constructor(private http: HttpClient) { }

  public createPayment(payment: CreatePaymentRequest) {
    return this.http.post<number>(`${this.apiUrl}/newPayment`, payment);
  }
}
