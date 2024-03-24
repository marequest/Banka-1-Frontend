import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer, User } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customers: Customer[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      jmbg: "1234567890123",
      phoneNumber: "+1234567890",
      gender: "male",
      address: "123 Main Street"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      jmbg: "9876543210987",
      phoneNumber: "+1987654321",
      gender: "female",
      address: "456 Elm Street"
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      jmbg: "5555555555555",
      phoneNumber: "+1555555555",
      gender: "female",
      address: "789 Oak Avenue"
    }
  ];

  constructor(
    private customerService: CustomerService, 
    private router:Router,
    ) { }
  
  public position:string='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';

  search(){}

  togglePopupAddUser(){}

  viewCustomer(customer: Customer) {
    this.customerService.setSelectedCustomer(customer);
    // this.router.navigate(['/customer/view']);
  }

}
