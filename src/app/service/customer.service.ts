import { Injectable } from '@angular/core';
import { CreateCustomerRequest, Customer } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Use this when you select a customer from the list and want to display his details
  private selectedCustomer: Customer | undefined;
  
  private customerForCreation: CreateCustomerRequest | undefined;

  constructor() { }

  public setSelectedCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log('Selected customer: ', this.selectedCustomer);
  }

  public getSelectedCustomer(): Customer | undefined {
    return this.selectedCustomer;
  }

  public setCustomerForCreation(customer: CreateCustomerRequest): void {
    this.customerForCreation = customer;
  }

  public getCustomerForCreation(): CreateCustomerRequest | undefined {
    return this.customerForCreation;
  }
}
