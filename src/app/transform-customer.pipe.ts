import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './model/model';

@Pipe({
  name: 'transformCustomer',
  standalone: true,
})
export class TransformCustomerPipe implements PipeTransform {
  transform(customers: Customer[]): any[] {
    return customers.map((cust: Customer) => {
      const customer = {
        name: cust.firstName + ' ' + cust.lastName,
        email: cust.email,
        jmbg: cust.jmbg,
        phoneNumber: cust.phoneNumber,
        gender: cust.gender,
        address: cust.address,
      };

      return customer;
    });
  }
}
