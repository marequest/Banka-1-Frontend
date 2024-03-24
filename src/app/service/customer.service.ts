import { Injectable } from '@angular/core';
import { Customer } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private selectedCustomer: Customer | undefined;

  constructor() { }

  public setSelectedCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log('Selected customer: ', this.selectedCustomer);
  }

  public getSelectedCustomer(): Customer | undefined {
    return this.selectedCustomer;
  }
}
