import { Injectable } from '@angular/core';
import { CreateBankAccountRequest, CreateCustomerRequest, Customer } from '../model/model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Use this when you select a customer from the list and want to display his details
  private selectedCustomer: Customer | undefined;
  
  // Used when creating a new customer and bank account at the same time
  private customerForCreation: CreateCustomerRequest | undefined;

  // Used when editing a customer
  private customerForEdit: CreateCustomerRequest | undefined;


  private apiUrl = environment.baseUrl + '/customer';


  constructor(
    private http: HttpClient,
  ) { }

  public createCustomerAndBankAccount(customer: CreateCustomerRequest, bankAcc: CreateBankAccountRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/createNewCustomer`, {
      customer: customer,
      account: bankAcc
    }, { headers }); 
  }

  public getAllCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.get<Customer[]>(`${this.apiUrl}/getAll`, { headers });
  }

  public editCustomer(customer: CreateCustomerRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.put<any>(`${this.apiUrl}/edit`, customer, { headers });
  }


  public setSelectedCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log('Selected customer: ', this.selectedCustomer);
  }

  public getSelectedCustomer(): Customer | undefined {
    return this.selectedCustomer;
  }

  public setCustomerForCreation(customer: CreateCustomerRequest|undefined): void {
    this.customerForCreation = customer;
  }

  public getCustomerForCreation(): CreateCustomerRequest | undefined {
    return this.customerForCreation;
  }

  public setCustomerForEdit(customer: CreateCustomerRequest|undefined): void {
    this.customerForEdit = customer;
  }

  public getCustomerForEdit(): CreateCustomerRequest | undefined {
    return this.customerForEdit;
  }
}
